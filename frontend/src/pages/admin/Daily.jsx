import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { sentenceCase } from "change-case";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

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
import Label from "../../components/Admin-Component/label/Label";
import Iconify from "../../components/Admin-Component/iconify/Iconify";
import Scrollbar from "../../components/Admin-Component/scrollbar/Scrollbar";

// sections
import { UserListHead, UserListToolbar } from "../../section/user";
// mock
import AxiosInstance from "../../configs/axios/AxiosInstance";

import "./DailyModal";
import DailyModal from "./DailyModal";
import Cookies from "js-cookie";

// pagination
import PropTypes from 'prop-types';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useTheme } from '@mui/material/styles';
import TableFooter from '@mui/material/TableFooter';

import ProdukBaruModal from "./ProdukBaruModal";
import styles from "../../assets/styles/Products.module.css"
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "number", label: "#", alignRight: false },
  { id: "name", label: "Kode Produk", alignRight: false },
  { id: "role", label: "Deskripsi", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "nominal", label: "Nominal", alignRight: false },
  { id: "kategori", label: "Kategori", alignRight: false },
  { id: "harga", label: "Harga (Rp)", alignRight: false },
  { id: "kosong", label: "", alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (orderBy === "name") {
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
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
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
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default function UserPage() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [token, setToken] = useState(Cookies.get("token"));
  const [currentID, setCurrentID] = useState("");
  const [product, setProduct] = useState([]);

  const [update, setUpdate] = useState(false);

  const handleOpenMenu = (event, id) => {
    // console.log(id)
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
      const newSelecteds = product.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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
    product,
    getComparator(order, orderBy),
    filterName
  );
  // console.log(product)


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredProducts.length) : 0;

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
    AxiosInstance.delete(`product/${currentID}`, {
      headers: { Authorization: `Bearer ` + token },
    }).then((res) => res);
    const productIndex = product.findIndex((usr) => usr._id === currentID);
    const updateProduct = [
      ...product.slice(0, productIndex),
      ...product.slice(productIndex + 1),
    ];
    setProduct(updateProduct);
    setOpen(false);
  };

  useEffect(() => {
    AxiosInstance.get("product/by_type/daily", {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      console.log(res)
      setProduct(res?.data?.data);
      console.log(product)
    });
  }, []);

  // console.log(product)

  const handleOpen = () => setOpen(!true);

  return (
    <>
      <Helmet>
        <title> Produk | Daily </title>
      </Helmet>

      <Container
        className={styles.container}
      >
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

        <Card>
          <Typography variant="h4" className="ms-3">
            Daily
          </Typography>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <MenuItem className="produkBaruBtn" onClick={handleOpen}>
            <ProdukBaruModal id={currentID} />
          </MenuItem>

          <TableContainer className={styles.tableContainer}>
            <Table className={styles.evenodd}>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={product.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody id="body-table">
                {(rowsPerPage > 0
                  ? filteredProducts?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                          onChange={(event) => handleClick(event, code)}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row" width="20">
                        {(page * rowsPerPage) + (index + 1)}
                      </TableCell>
                      {/* <TableCell align="left">{_id}</TableCell> */}
                      <TableCell component="th" scope="row" padding="none">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          {/* <Avatar alt={name} src={urlFoto} /> */}
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
                          color={
                            status === "not_verified" ? "error" : "success"
                          }
                        >
                          {status}
                        </Label>
                      </TableCell>
                      <TableCell align="left">{nominal}</TableCell>
                      <TableCell align="left">{category}</TableCell>
                      <TableCell align="left">{price.toLocaleString(['id'])}</TableCell>
                      <TableCell align="right" width="50">
                        <IconButton
                          size="large"
                          color="inherit"
                          onClick={(e) => handleOpenMenu(e, _id)}
                        >
                          <Iconify icon={"eva:more-vertical-fill"} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>

              {isNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <Paper
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        <Typography variant="h6" paragraph>
                          Not found
                        </Typography>

                        <Typography variant="body2">
                          No results found for &nbsp;
                          <strong>&quot;{filterName}&quot;</strong>.
                          <br /> Try checking for typos or using complete words.
                        </Typography>
                      </Paper>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={7}
                    count={filteredProducts.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        'aria-label': 'rows per page',
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
        <DailyModal id={currentID} setUpdate={setUpdate} update={update} />

        <MenuItem sx={{ color: "error.main" }} onClick={(e) => handleDelete(e)}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
