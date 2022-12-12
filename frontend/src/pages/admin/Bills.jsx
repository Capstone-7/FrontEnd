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

import BillsModal from "./BillsModal";
import "../../assets/styles/ProdukBaru.css";
import BillsEditModal from "./BillsEditModal";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "number", label: "#", alignRight: false },
  { id: "name", label: "Kode Produk", alignRight: false },
  { id: "role", label: "Deskripsi", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "status", label: "Nominal", alignRight: false },
  { id: "status", label: "Kategori", alignRight: false },
  { id: "status", label: "Harga (Rp)", alignRight: false },
  { id: "status", label: "", alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
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

export default function UserPage() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [token, setToken] = useState(Cookies.get("token"));
  const [user, setUser] = useState([]);
  const [currentID, setCurrentID] = useState("");
  const [product, setProduct] = useState([]);

  const [load, setLoad] = useState();

  const limiter = 50;

  const handleOpenMenu = (event, id) => {
    setOpen(event.currentTarget);
    setCurrentID(id);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  // const handleMenu = () => {
  //   setOpen(false)
  // }

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

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - user.length) : 0;

  const filteredUsers = applySortFilter(
    user,
    getComparator(order, orderBy),
    filterName
  );

  const handleDelete = (e) => {
    AxiosInstance.delete(`product/${currentID}`, {
      headers: { Authorization: `Bearer ` + token },
    }).then((res) => res);
    const userIndex = user.findIndex((usr) => usr._id === currentID);
    const updateUser = [
      ...user.slice(0, userIndex),
      ...user.slice(userIndex + 1),
    ];
    setUser(updateUser);
    setOpen(false);
  };

  const isNotFound = !filteredUsers.length && !!filterName;

  useEffect(() => {
    AxiosInstance.get("product/by_type/bills", {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      setUser(res?.data?.data);
    });
  }, []);

  const handleOpen = () => setOpen(!true);

  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Container
        sx={{
          width: 1400,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h3">Manajemen Produk</Typography>
        </Stack>
        <Typography variant="h4" className="ms-3">
          Bills
        </Typography>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />
          <MenuItem className="produkBaruBtn" onClick={handleOpen}>
            <BillsModal id={currentID} />
          </MenuItem>

          <TableContainer sx={{ width: 1150, height: 500 }}>
            <Table>
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
                {filteredUsers.map((row) => {
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
                  const selectedUser = selected.indexOf(_id) !== -1;
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
                          onChange={(event) => handleClick(event, code)}
                        />
                      </TableCell>
                      <TableCell id="user-data" align="left"></TableCell>
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
                          color={
                            status === "not_verified" ? "error" : "success"
                          }
                        >
                          {status}
                        </Label>
                      </TableCell>
                      <TableCell align="left">{nominal}</TableCell>
                      <TableCell align="left">{category}</TableCell>
                      <TableCell align="left">{price}</TableCell>
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
            </Table>
          </TableContainer>
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        // onClick={handleCloseMenu}
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
        <BillsEditModal id={currentID} />

        <MenuItem sx={{ color: "error.main" }} onClick={(e) => handleDelete(e)}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
