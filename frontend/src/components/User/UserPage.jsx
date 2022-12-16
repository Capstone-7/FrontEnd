import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { sentenceCase } from "change-case";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Image from "react-bootstrap/Image";
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
import PropTypes from "prop-types";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useTheme } from "@mui/material/styles";
import TableFooter from "@mui/material/TableFooter";
// components
import Label from "../Admin-Component/label/Label";
import Iconify from "../Admin-Component/iconify/Iconify";
import Scrollbar from "../Admin-Component/scrollbar/Scrollbar";
// sections
import { UserListHead, UserListToolbar } from "../../section/user";
// mock
import AxiosInstance from "../../configs/axios/AxiosInstance";

import "./ModalComponent";
import ModalComponent from "./ModalComponent";
import Cookies from "js-cookie";
import styles from "../../assets/styles/UserPage.module.css";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "number", label: "#", alignRight: false },
  // { id: "idPengguna", label: "ID PENGGUNA", alignRight: false },
  { id: "name", label: "Nama", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "role", label: "Tanggal Registrasi", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
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

export default function UserPage() {
  const [open, setOpen] = useState(false);

  // custom pagination actions
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");


  const [update, setUpdate] = useState(false);

  const [token, setToken] = useState(Cookies.get("token"));
  const [user, setUser] = useState([]);
  const [currentID, setCurrentID] = useState("");

  const [load, setLoad] = useState();

  const limiter = 50;

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
      const newSelecteds = user.map((n) => n.name);
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

  const filteredUsers = applySortFilter(
    user,
    getComparator(order, orderBy),
    filterName
  );
  // console.log(filteredUsers)

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredUsers.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (e) => {
    AxiosInstance.delete(`user/${currentID}`, {
      headers: { Authorization: `Bearer ` + token },
    }).then((res) => console.log(res));
    const userIndex = user.findIndex((usr) => usr._id === currentID);
    console.log(userIndex);
    const updateUser = [
      ...user.slice(0, userIndex),
      ...user.slice(userIndex + 1),
    ];
    setUser(updateUser);
    setOpen(false);
  };
  // console.log(currentID);

  const isNotFound = !filteredUsers.length && !!filterName;

  useEffect(() => {
    AxiosInstance.get("user/all", {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      setUser(res.data.data);
    });
  }, [update]);

  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Container
        className={styles.container}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
        >
          <Typography variant="h3" gutterBottom>
            Manajemen Pengguna
          </Typography>
        </Stack>

        <Card className={styles.box}>
          <Typography sx={{ padding: "20px 0px 0px 25px" }} variant="h5" gutterBottom>
            Data Pengguna
          </Typography>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <TableContainer className={styles.tableContainer} >
            <Table className={styles.evenodd}>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={user.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody id="body-table">
                {/* {filteredUsers.map((row, index) */}
                {(rowsPerPage > 0
                  ? filteredUsers?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                  : filteredUsers
                )?.map((row, index) => {
                  const { name, _id, created, status, email } = row;
                  const selectedUser = selected.indexOf(name) !== -1;
                  return (
                    <TableRow
                      hover
                      key={_id}
                      tabIndex={-1}
                      role="checkbox"
                      selected={selectedUser}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedUser}
                          onChange={(event) => handleClick(event, name)}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row" width="20">
                        {page * rowsPerPage + (index + 1)}
                      </TableCell>
                      <TableCell component="th" scope="row" width="70">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography variant="subtitle2" noWrap>
                            {name}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="left" width="100">
                        {email}
                      </TableCell>
                      <TableCell align="left" style={{ color: "#396EB0" }} width="50">
                        {new Date(created).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="left" width="50">
                        <Label
                          color={
                            status === "not_verified" ? "error" : "success"
                          }
                        >
                          {sentenceCase(status)}
                        </Label>
                      </TableCell>
                      <TableCell align="right" width="50">
                        <IconButton
                          size="large"
                          color="#396EB0"
                          width="54"
                          onClick={(e) => handleOpenMenu(e, _id)}
                        >
                          <Image
                            src={require("../../assets/icons/titiktiga.png")}
                            alt="titiktiga"
                            onClick={(event) => handleClick(row.id, event)}
                            className="image"
                          />
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
                    <TableCell align="center" colSpan={7} sx={{ py: 3 }}>
                      <Paper
                        sx={{
                          textAlign: "center",
                          backgroundColor: "#ebf1f7"
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
                    colSpan={9}
                    count={filteredUsers.length}
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


        <ModalComponent id={currentID} setUpdate={setUpdate} update={update} />

        <MenuItem sx={{ color: "error.main" }} onClick={(e) => handleDelete(e)}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
