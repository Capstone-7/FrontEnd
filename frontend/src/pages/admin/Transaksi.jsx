import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import Iconify from '../../components/Admin-Component/iconify/Iconify';
import Form from 'react-bootstrap/Form';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { tableCellClasses } from '@mui/material/TableCell';
import './Transaksi.css'
import { Container, Stack, Typography } from '@mui/material';

// function createData(index, idPengguna, idProduk, totalPembayaran, statusBayar, metodePembayaran, statusTransaksi, tanggalPembayaran) {
//   return { index, idPengguna, idProduk, totalPembayaran, statusBayar, metodePembayaran, statusTransaksi, tanggalPembayaran };
// }

// const rows = [
//   createData('01', 'USER0001', 'PLNP100000', 30000, 'Terbayar', 'Gopay', 'Dibuat', '17/11/2022'),
//   createData('02', 'USER0002', 'RGPD', 11000, 'Terbayar', 'Gopay', 'Dibuat', '01/11/2022'),
//   createData('03', 'USER0003', 'TRIP10000', 10000, 'Tidak Terbayar', 'Ovo', 'Diperbarui', '02/11/2022'),
// ];

const rows = [
  { id: 1, emailPengguna: 'USER0001', kodeProduk: 'PLNP100000', totalPembayaran: 30000, statusBayar: 'Terbayar', metodePembayaran: 'Gopay', statusTransaksi: 'Dibuat', tanggalPembayaran: '17/11/2022' },
  { id: 2, emailPengguna: 'USER0002', kodeProduk: 'RGPD', totalPembayaran: 11000, statusBayar: 'Terbayar', metodePembayaran: 'Gopay', statusTransaksi: 'Dibuat', tanggalPembayaran: '01/11/2022' },
  { id: 3, emailPengguna: 'USER0003', kodeProduk: 'TRIP10000', totalPembayaran: 10000, statusBayar: 'Tidak Terbayar', metodePembayaran: 'Ovo', statusTransaksi: 'Diperbarui', tanggalPembayaran: '02/11/2022' },
];

const columns = [
  {
    field: 'id',
    headerName: '#',
    headerClassName: 'borderHeaders',
    width: 10
  },
  {
    field: 'emailPengguna',
    headerName: 'Email Pengguna',
    headerClassName: 'blueBackground',
    width: 100
  },
  {
    field: 'kodeProduk',
    headerName: 'Kode Produk',
    headerClassName: 'blueBackground',
    width: 110
  },
  {
    field: 'totalPembayaran',
    type: 'number',
    headerName: 'Total Pembayaran',
    headerClassName: 'blueBackground',
    width: 80
  },
  {
    field: 'statusBayar',
    headerName: 'Status Pembayaran',
    headerClassName: 'blueBackground',
    width: 120
  },
  {
    field: 'metodePembayaran',
    headerName: 'Metode Pembayaran',
    headerClassName: 'blueBackground',
    width: 90
  },
  {
    field: 'statusTransaksi',
    headerName: 'Status',
    headerClassName: 'blueBackground',
    width: 100
  },
  {
    field: 'tanggalPembayaran',
    headerName: 'Tanggal Pembayaran',
    headerClassName: 'borderHeadersRight',
    width: 260
  },
  // {
  //   field: 'age',
  //   headerName: 'Age',
  //   type: 'number',
  //   width: 90,
  // },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
];

const ODD_OPACITY = 0.1;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: "#EBF1F7",
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
          theme.palette.action.selectedOpacity +
          theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
}));


const Transaksi = () => {
  // const StyledTableCell = styled(TableCell)(({ theme }) => ({
  //   [`&.${tableCellClasses.head}`]: {
  //     backgroundColor: "#396EB0",
  //     color: "#EBF1F7",
  //   },
  // }));
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
        {/* <div className='' style={{ height: 400, width: '100%', paddingTop: "30px" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            
          />
        </div> */}
        <Box
          className="datatable"
        >
          {/* <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          /> */}
          <StripedDataGrid
            sx={{
              height: 300,
              width: '100%',
              '& .blueBackground': {
                backgroundColor: '#396EB0',
                color: "#EBF1F7",
              },
              '& .borderHeaders': {
                backgroundColor: '#396EB0',
                color: "#EBF1F7",
                borderRadius: "20px 0 0 0"
              },
              '& .borderHeadersRight': {
                backgroundColor: '#396EB0',
                color: "#EBF1F7",
                borderRadius: "0 20px 0 0"
              },
              '.MuiDataGrid-columnSeparator': {
                display: 'none',
              },
              '.MuiDataGrid-checkboxSelection': {
                display: 'none',
              },

            }}
            rows={rows}
            columns={columns}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            }
          />
        </Box>
        {/* <TableContainer component={Paper} style={{ paddingTop: "30px" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" className="evenodd">
            <TableHead className="theadcell">
              <TableRow className="theadcell">
                <StyledTableCell style={{ borderRadius: "10px 0 0 0" }}>#</StyledTableCell>
                <StyledTableCell align="right">ID Pengguna</StyledTableCell>
                <StyledTableCell align="right">ID Produk</StyledTableCell>
                <StyledTableCell align="right">Total Pembayaran</StyledTableCell>
                <StyledTableCell align="right">Status Pembayaran</StyledTableCell>
                <StyledTableCell align="right">Metode Pembayaran</StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
                <StyledTableCell style={{ borderRadius: "0 10px 0 0" }} align="right">Tanggal Pembayaran</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}

                >
                  <TableCell component="th" scope="row">
                    {row.index}
                  </TableCell>
                  <TableCell align="right">{row.idPengguna}</TableCell>
                  <TableCell align="right">{row.idProduk}</TableCell>
                  <TableCell align="right">{row.totalPembayaran}</TableCell>
                  <TableCell align="right">{row.statusBayar}</TableCell>
                  <TableCell align="right">{row.metodePembayaran}</TableCell>
                  <TableCell align="right">{row.statusTransaksi}</TableCell>
                  <TableCell align="right">{row.tanggalPembayaran}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> */}
      </Container>

    </>
  )
}

export default Transaksi