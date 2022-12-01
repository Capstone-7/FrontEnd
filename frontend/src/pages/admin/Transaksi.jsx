import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import Iconify from '../../components/Admin-Component/iconify/Iconify';
import Form from 'react-bootstrap/Form';


import './Transaksi.css'

import { Container, Stack, Typography } from '@mui/material';

const Transaksi = () => {
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
        </Container>
    </>
  )
}

export default Transaksi