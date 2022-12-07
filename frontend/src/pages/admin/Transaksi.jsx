import * as React from 'react';
import { useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Form from 'react-bootstrap/Form';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import './Transaksi.css'
import { Container, Typography } from '@mui/material';
import { useSelector, useDispatch } from "react-redux"
import Image from 'react-bootstrap/Image'
import Menu from '@mui/material/Menu';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import moment from "moment/moment";
import { getAllTransactions } from '../../store/features/TransactionSlice';
import { useState } from 'react';

// function createData(index, idPengguna, idProduk, totalPembayaran, statusBayar, metodePembayaran, statusTransaksi, tanggalPembayaran) {
//   return { index, idPengguna, idProduk, totalPembayaran, statusBayar, metodePembayaran, statusTransaksi, tanggalPembayaran };
// }

// const rows = [
//   createData('01', 'USER0001', 'PLNP100000', 30000, 'Terbayar', 'Gopay', 'Dibuat', '17/11/2022'),
//   createData('02', 'USER0002', 'RGPD', 11000, 'Terbayar', 'Gopay', 'Dibuat', '01/11/2022'),
//   createData('03', 'USER0003', 'TRIP10000', 10000, 'Tidak Terbayar', 'Ovo', 'Diperbarui', '02/11/2022'),
// ];

const Transaksi = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllTransactions())
  }, [dispatch])

  const [success, setSuccess] = useState("SUCCESS")
  const [pending, setPending] = useState("PENDING")

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#396EB0",
      color: "#EBF1F7",
    },
  }));

  const transactions = useSelector((state) => state.TransactionSlice.data)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const closeMenu = () => {
    setModalShow(true)
    setAnchorEl(null);
  }

  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
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
        <TableContainer component={Paper} style={{ paddingTop: "30px" }}>
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
                <StyledTableCell style={{ borderRadius: "0 10px 0 0" }} colSpan={2} align="left">Tanggal Pembayaran</StyledTableCell>
                {/* <StyledTableCell style={{ borderRadius: "0 10px 0 0" }} align="left">&nbsp;</StyledTableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions?.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="left">{row.user_email}</TableCell>
                  <TableCell align="left">{row.product_code}</TableCell>
                  <TableCell style={{ color: "#396EB0" }} align="left">{row.total_price}</TableCell>
                  <TableCell align="center">
                    <div className={`${success ? "paid" : pending ? "pending" : "cancel"}`}>
                      {row.xendit_status}
                    </div>
                  </TableCell>
                  <TableCell align="left">{row.xendit_payment_channel}</TableCell>
                  <TableCell align="center">
                    <div className={`${success ? "paid" : pending ? "pending" : "cancel"}`}>
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
                      onClick={handleClick}
                      className='image'
                    />
                  </TableCell>
                </TableRow>
              ))}
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={closeMenu}>Edit</MenuItem>
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
                    <Form.Select style={{ width: "130px" }} aria-label="Default select example">
                      <option>Pilih Disini</option>
                      <option value="1">Success</option>
                      <option value="2">Pending</option>
                      <option value="3">Cancel</option>
                    </Form.Select>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button style={{ backgroundColor: "#396EB0", border: "0" }} variant="primary">Simpan</Button>
                  <Button style={{ border: "0" }} variant="danger" onClick={() => setModalShow(false)}>Close</Button>
                </Modal.Footer>
              </Modal>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  )
}

export default Transaksi