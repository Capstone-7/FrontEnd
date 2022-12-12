import * as React from 'react';
import { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Form from 'react-bootstrap/Form';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import TableFooter from '@mui/material/TableFooter';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import './Transaksi.css'
import { ToastContainer, toast } from 'react-toastify';
import { Container, Typography } from '@mui/material';
import { useSelector, useDispatch } from "react-redux"
import Image from 'react-bootstrap/Image'
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
import Menu from '@mui/material/Menu';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import moment from "moment/moment";
import Iconify from "../../components/Admin-Component/iconify/Iconify";
import { changesTransactionStatus, getAllTransactions } from '../../store/features/TransactionSlice';

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

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const Transaksi = () => {
  // initialData
  const [data, setData] = useState({
    id: "",
    status: "",
  })


  // call API using dispatch and use global state with using selector
  const dispatch = useDispatch()
  const transactions = useSelector((state) => state?.TransactionSlice?.data)

  // Pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - transactions?.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Menu
  const [anchorEl, setAnchorEl] = React.useState(null);

  // Modal
  const [modalShow, setModalShow] = React.useState(false);

  useEffect(() => {
    dispatch(getAllTransactions())
  }, [dispatch, transactions])

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#396EB0",
      color: "#EBF1F7",
    },
  }));

  // Menu Logic
  const open = Boolean(anchorEl);

  const handleClick = (id, event) => {
    setAnchorEl(event.currentTarget);
    setData({
      id
    })
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const closeMenu = () => {
    setModalShow(true)
    setAnchorEl(null);
  }

  // onChange and Submit to initialData
  const onChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (data.status !== "") {
      dispatch(changesTransactionStatus({
        status: data.status,
        id: data.id
      }))
      setModalShow(false)
      console.log("ok")
      toast.success('Edit Berhasil', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      alert("masukkan gagal")
    }
  }


  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Manage Transaksi
        </Typography>
      </Container>

      <Container className="ModalTransaksi">
        <Typography id="modal-modal-title" variant="h6" component="h2" className="PrimaryModal pt-3">
          <div className='d-flex justify-content-start align-items-center ModalChild'>
            <span className="PrimaryModal__Data ms-2"> Data Transaksi</span>
            <div className="wrapper d-flex flex-row ms-auto">
              <div className="WrapperTransactions">
                <h3 className='AllTransactions'>Semua Transaksi</h3>
              </div>
              <div className="WrapperSearch ms-3">
                <h3 className='SearchText'>Search Here</h3>
              </div>
            </div>
          </div>
        </Typography>
        <TableContainer component={Paper} style={{ paddingTop: "30px", backgroundColor: "#EBF1F7" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" className="evenodd">
            <TableHead className="theadcell">
              <TableRow className="theadcell">
                <StyledTableCell style={{ borderRadius: "10px 0 0 0" }}>#</StyledTableCell>
                <StyledTableCell align="left">Email Pengguna</StyledTableCell>
                <StyledTableCell align="left">Kode Produk</StyledTableCell>
                <StyledTableCell align="left">Total Pembayaran</StyledTableCell>
                <StyledTableCell align="left">Status Pembayaran</StyledTableCell>
                <StyledTableCell align="left">Metode Pembayaran</StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
                <StyledTableCell align="left">Tanggal Pembayaran</StyledTableCell>
                <StyledTableCell style={{ borderRadius: "0 10px 0 0" }} align="left">&nbsp;*&nbsp;</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? transactions?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : transactions
              )?.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >

                  {/* // 1 - 1 + limit */}
                  <TableCell component="th" scope="row">
                    {(page * rowsPerPage) + (index + 1)}
                  </TableCell>
                  <TableCell align="left">{row.user_email}</TableCell>
                  <TableCell align="left">{row.product_code}</TableCell>
                  <TableCell style={{ color: "#396EB0" }} align="right">{row.total_price}</TableCell>
                  <TableCell align="center">
                    <div className={`${row.xendit_status === 'PAID' ? 'success' : 'cancel'}`}>
                      {row.xendit_status}
                    </div>
                  </TableCell>
                  <TableCell align="left">{row.xendit_payment_channel}</TableCell>
                  <TableCell align="center">
                    <div className={`${row.status === "SUCCESS" ? 'success' : row.status === "PENDING" ? 'pending' : 'cancel'}`}>
                      {row.status}
                    </div>
                  </TableCell>
                  <TableCell style={{ color: "#396EB0" }} align="left">{moment(row.created).subtract(10, "days").calendar()}</TableCell>
                  <TableCell
                    align="left"
                  >
                    <Image
                      src={require("../../assets/icons/titiktiga.png")}
                      alt="titiktiga"
                      onClick={(event) => handleClick(row.id, event)}
                      className='image'
                    />
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
              <Menu
                style={{ marginRight: "20px" }}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem

                  onClick={closeMenu}>
                  <Iconify
                    icon={"eva:edit-fill"}
                    sx={{ mr: 2 }} />
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
                    <Form.Select onChange={onChange} name="status" value={data.status} style={{ width: "130px" }} aria-label="Default select example">
                      <option selected disabled>Pilih Disini</option>
                      <option value="SUCCESS">Success</option>
                      <option value="PENDING">Pending</option>
                      <option value="CANCEL">Cancel</option>
                    </Form.Select>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={handleSubmit} style={{ backgroundColor: "#396EB0", border: "0" }} variant="primary">Simpan</Button>
                  <Button style={{ border: "0" }} variant="danger" onClick={() => setModalShow(false)}>Close</Button>
                </Modal.Footer>
              </Modal>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={9}
                  count={transactions?.length}
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
      </Container>
    </>
  )
}

export default Transaksi