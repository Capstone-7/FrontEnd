import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { sentenceCase } from "change-case";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import Swal from "sweetalert2";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from "@mui/material";

// components
import Label from "../../Admin-Component/label/Label";
import Iconify from "../../Admin-Component/iconify/Iconify";
import Scrollbar from "../../Admin-Component/scrollbar/Scrollbar";

// sections
import { UserListHead, UserListToolbar } from "../../../section/user";
// mock
import AxiosInstance from "../../../configs/axios/AxiosInstance";

import "../Daily/DailyModal";
import DailyModal from "../Daily/DailyModal";
import Cookies from "js-cookie";

// pagination
import PropTypes from "prop-types";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useTheme } from "@mui/material/styles";
import TableFooter from "@mui/material/TableFooter";

import styles from "../../../assets/styles/Products.module.css";
import ProdukBaruModal from "./ProdukBaruModal";
import ProductSearchBar from "../../SearchBar/ProductSearchBar";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "number", label: "#", alignRight: false },
  { id: "code", label: "Kode Produk", alignRight: false },
  { id: "role", label: "Deskripsi", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "nominal", label: "Nominal", alignRight: false },
  { id: "kategori", label: "Kategori", alignRight: false },
  { id: "harga", label: "Harga (Rp)", alignRight: false },
  { id: "kosong", label: "", alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (orderBy === "code") {
    if (b[orderBy].toLowerCase() < a[orderBy].toLowerCase()) {
      return -1;
    }
    if (b[orderBy].toLowerCase() > a[orderBy].toLowerCase()) {
      return 1;
    }
  } else {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.code.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default function Daily() {
  const [open, setOpen] = useState(false);

  // pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");

  const [arrayId, setArrayId] = useState([]);

  const [token, setToken] = useState(Cookies.get("token"));
  const [currentID, setCurrentID] = useState("");

  const [products, setProducts] = useState([]);

  const [update, setUpdate] = useState(false);

  const handleOpenMenu = (event, id) => {
    setOpen(event.currentTarget);
    setCurrentID(id);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = products.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    setArrayId(id);
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const filteredProducts = applySortFilter(
    products,
    getComparator(order, orderBy),
    filterName
  );

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredProducts.length)
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // not found
  const isNotFound = !filteredProducts.length && !!filterName;

  const handleDelete = (e) => {
    Swal.fire({
      title: "Yakin ingin hapus data ini ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Batal!",
      confirmButtonText: "Ya, Hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        AxiosInstance.delete(`product/${currentID}`, {
          headers: { Authorization: `Bearer ` + token },
        }).then((res) => res);
        const productIndex = products.findIndex((usr) => usr._id === currentID);
        const updateProduct = [
          ...products.slice(0, productIndex),
          ...products.slice(productIndex + 1),
        ];
        setProducts(updateProduct);
        setOpen(false);
        Swal.fire("Dihapus!", "File Anda telah dihapus.", "success");
      }
    });
  };

  useEffect(() => {
    AxiosInstance.get("product/by_type/daily", {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      setProducts(res?.data?.data);
    });
  }, [update]);

  const handleOpen = () => setOpen(!true);

  return (
    <>
      <Helmet>
        <title> Produk | Daily </title>
      </Helmet>

      <Container className={styles.container}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h3" gutterBottom>
            Manajemen Produk
          </Typography>
        </Stack>

        <Card className={styles.box}>
          <Typography
            sx={{ padding: "20px 0px 0px 25px" }}
            variant="h5"
            gutterBottom
          >
            Daily
          </Typography>
          <ProductSearchBar
            id={arrayId}
            selected={selected}
            setUpdate={setUpdate}
            update={update}
            setSelected={setSelected}
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <MenuItem className="produkBaruBtn" onClick={handleOpen}>
            <ProdukBaruModal
              id={currentID}
              setUpdate={setUpdate}
              update={update}
            />
          </MenuItem>
          <TableContainer className={styles.tableContainer}>
            <Table className={styles.evenodd}>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={products.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody id="body-table">
                {(rowsPerPage > 0
                  ? filteredProducts?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : filteredProducts
                )?.map((row, index) => {
                  const {
                    code,
                    description,
                    status,
                    nominal,
                    category,
                    price,
                    _id,
                    icon_url,
                  } = row;
                  const selectedProduct = selected.indexOf(_id) !== -1;
                  return (
                    <TableRow
                      hover
                      key={_id}
                      tabIndex={-1}
                      role="checkbox"
                      selected={selectedProduct}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedProduct}
                          onChange={(event) => handleClick(event, _id)}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row" width="20">
                        {page * rowsPerPage + (index + 1)}
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography variant="subtitle2" noWrap>
                            {code.toUpperCase()}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">
                        <div className="d-flex flex-row align-items-center">
                          <img
                            src={icon_url}
                            alt="Produk"
                            width="60"
                            className="pb-2"
                            style={{ paddingInline: "auto" }}
                          />
                          <div className="me-0">{description}</div>
                        </div>
                      </TableCell>
                      <TableCell align="left">
                        <Label
                          color={status === "Not Active" ? "error" : "success"}
                        >
                          {status}
                        </Label>
                      </TableCell>
                      <TableCell style={{ color: "#396EB0" }} align="left">
                        {nominal}
                      </TableCell>
                      <TableCell align="left">{category}</TableCell>
                      <TableCell style={{ color: "#396EB0" }} align="right">
                        {price.toLocaleString(["id"])}
                      </TableCell>
                      <TableCell align="right" width="50">
                        <IconButton
                          size="large"
                          color="inherit"
                          onClick={(e) => handleOpenMenu(e, _id)}
                        >
                          <Iconify icon={"eva:more-horizontal-fill"} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={9} />
                  </TableRow>
                )}
              </TableBody>

              {isNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={9} sx={{ py: 3 }}>
                      <Paper
                        sx={{
                          textAlign: "center",
                          backgroundColor: "#ebf1f7",
                        }}
                      >
                        <Typography variant="h6" paragraph>
                          Tidak ditemukan
                        </Typography>

                        <Typography variant="body2">
                          Tidak ada hasil yang ditemukan untuk &nbsp;
                          <strong>&quot;{filterName}&quot;</strong>.
                          <br /> Coba periksa kesalahan ketik atau gunakan kata
                          lengkap.
                        </Typography>
                      </Paper>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={9}
                    count={filteredProducts.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <DailyModal
          id={currentID}
          setUpdate={setUpdate}
          update={update}
          setOpen={setOpen}
        />

        <MenuItem sx={{ color: "error.main" }} onClick={(e) => handleDelete(e)}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
