import * as React from "react";
import { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Form from "react-bootstrap/Form";
import { sentenceCase } from "change-case";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
// import { ToastContainer, toast } from 'react-toastify';
import { Container, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Image from "react-bootstrap/Image";
// import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
import Menu from "@mui/material/Menu";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import moment from "moment/moment";
import Iconify from "../../components/Admin-Component/iconify/Iconify";
import { Helmet } from "react-helmet-async";
import { filter } from "lodash";

// pagination
import PropTypes from "prop-types";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useTheme } from "@mui/material/styles";
import TableFooter from "@mui/material/TableFooter";

import Swal from "sweetalert2";

// sections
import { UserListHead, UserListToolbar } from "../../section/user";

// components
import Label from "../../components/Admin-Component/label/Label";
import Scrollbar from "../../components/Admin-Component/scrollbar/Scrollbar";

// @mui
import { Card, Stack, Avatar, Popover, Checkbox } from "@mui/material";

import {
  changesTransactionStatus,
  getAllTransactions,
} from "../../store/features/TransactionSlice";
import TransactionSearchBar from "../../components/SearchBar/TransactionSearchBar";
import "../../assets/styles/Transaction.css";
import TransactionListHead from "../../section/user/TransactionListHead";

const TABLE_HEAD = [
  { id: "number", label: "#", alignRight: false },
  { id: "user_email", label: "Email Pengguna", alignRight: false },
  { id: "product_code", label: "Kode Produk", alignRight: false },
  { id: "total_price", label: "Total Pembayaran", alignRight: false },
  { id: "xendit_status", label: "Status Pembayaran", alignRight: false },
  {
    id: "xendit_payment_channel",
    label: "Metode Pembayaran",
    alignRight: false,
  },
  { id: "status", label: "Status", alignRight: false },
  { id: "created", label: "Tanggal Pembayaran", alignRight: false },
  { id: "kosong", label: "", alignRight: false },
];

function descendingComparator(a, b, orderBy) {
  if (orderBy === "user_email") {
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
      (_user) =>
        _user.user_email.toLowerCase().indexOf(query.toLowerCase()) !== -1
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

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const Transaction = () => {
  // initialData
  const [data, setData] = useState({
    id: "",
    status: "",
  });

  // filter and selected transactions
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");

  // Menu
  const [anchorEl, setAnchorEl] = React.useState(null);

  // Modal
  const [modalShow, setModalShow] = React.useState(false);

  // changes state
  const [update, setUpdate] = useState(false);

  // call API using dispatch and use global state with using selector
  const dispatch = useDispatch();
  const transactions = useSelector(
    (state) => state?.TransactionSlice?.transaction
  );

  useEffect(() => {
    dispatch(getAllTransactions());
  }, [dispatch, update]);

  // Pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = transactions.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClickSelect = (event, name) => {
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

  const filteredTransactions = applySortFilter(
    transactions,
    getComparator(order, orderBy),
    filterName
  );

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - transactions?.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // not found
  const isNotFound = !filteredTransactions.length && !!filterName;

  // Menu Logic
  const open = Boolean(anchorEl);

  const handleClick = (id, status, event) => {
    setAnchorEl(event.currentTarget);
    setData({
      id,
      status,
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const closeMenu = () => {
    setModalShow(true);
    setAnchorEl(null);
  };

  // onChange and Submit to initialData
  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.status !== "") {
      dispatch(
        changesTransactionStatus({
          status: data.status,
          id: data.id,
        })
      );
      Swal.fire("Berhasil!", "berhasil mengubah status!", "success");
      setModalShow(false);
      setTimeout(() => {
        setUpdate(!update);
      }, 100);
    } else {
      alert("masukkan gagal");
    }
  };

  return (
    <>
      <Helmet>
        <title>Transaksi</title>
      </Helmet>

      <Container className="container">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h3" gutterBottom>
            Manage Transaksi
          </Typography>
        </Stack>

        <Card className="box">
          <Typography
            sx={{ padding: "20px 0px 0px 25px" }}
            variant="h5"
            gutterBottom
          >
            Data Transaksi
          </Typography>
          <TransactionSearchBar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <TableContainer className="tableContainer">
            <Table className="evenodd">
              <TransactionListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={transactions.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody id="body-table">
                {(rowsPerPage > 0
                  ? filteredTransactions?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : filteredTransactions
                )?.map((row, index) => {
                  const selectedTransactions = selected.indexOf(row.id) !== -1;
                  return (
                    <TableRow
                      hover
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      tabIndex={-1}
                      role="checkbox"
                      selected={selectedTransactions}
                    >
                      <TableCell padding="checkbox"></TableCell>
                      <TableCell component="th" scope="row" width="20">
                        {page * rowsPerPage + (index + 1)}
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography variant="subtitle2" noWrap>
                            {row.user_email}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">{row.product_code}</TableCell>
                      <TableCell style={{ color: "#396EB0" }} align="right">
                        {row.total_price.toLocaleString(["id"])}
                      </TableCell>
                      <TableCell align="center">
                        <Label
                          color={
                            row.xendit_status === "EXPIRED"
                              ? "error"
                              : row.xendit_status === "PENDING"
                              ? "warning"
                              : "success"
                          }
                        >
                          {sentenceCase(row.xendit_status)}
                        </Label>
                      </TableCell>
                      <TableCell align="left">
                        {row.xendit_payment_channel}
                      </TableCell>
                      <TableCell align="center">
                        <Label
                          color={
                            row.status === "SUCCESS"
                              ? "success"
                              : row.status === "PENDING"
                              ? "warning"
                              : "error"
                          }
                        >
                          {sentenceCase(row.status)}
                        </Label>
                      </TableCell>
                      <TableCell style={{ color: "#396EB0" }} align="left">
                        {moment(row.created).subtract(10, "days").calendar()}
                      </TableCell>
                      <TableCell align="right" width="50">
                        <IconButton
                          size="large"
                          color="inherit"
                          onClick={(event) =>
                            handleClick(row.id, row.status, event)
                          }
                        >
                          <Iconify icon={"eva:more-horizontal-fill"} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={10} />
                  </TableRow>
                )}
              </TableBody>

              {isNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={10} sx={{ py: 3 }}>
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
                    colSpan={10}
                    count={filteredTransactions.length}
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

      <Menu
        style={{ marginRight: "20px" }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={closeMenu}>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>
      </Menu>
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={modalShow}
        backdrop="static"
        keyboard={false}
        className="modal"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Ubah <span style={{ color: "#396EB0" }}>Status Transaksi</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <h6>Status</h6>
            <Form.Select
              onChange={onChange}
              name="status"
              value={data.status}
              style={{ width: "130px" }}
              aria-label="Default select example"
            >
              <option selected disabled>
                Pilih Disini
              </option>
              <option value="SUCCESS">Success</option>
              <option value="PENDING">Pending</option>
              <option value="CANCEL">Cancel</option>
            </Form.Select>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleSubmit}
            style={{ backgroundColor: "#396EB0", border: "0" }}
            variant="primary"
          >
            Simpan
          </Button>
          <Button
            style={{ border: "0" }}
            variant="danger"
            onClick={() => setModalShow(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Transaction;
