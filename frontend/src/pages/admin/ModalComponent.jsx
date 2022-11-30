import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import Iconify from '../../components/Admin-Component/iconify/Iconify';
import Form from 'react-bootstrap/Form';


import './modalUser.css'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const ModalComponent = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <>
    <div>
    <MenuItem onClick={handleOpen}><Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />Edit</MenuItem>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="modalUser"
    >
      <Box sx={{
        width: 851,
        height: 550,
      }} className="boxModal">
        <Typography id="modal-modal-title" variant="h6" component="h2" className="PrimaryModal">
          <div className='d-flex justify-content-start align-items-center ModalChild'>
            <h3 className="EditModal ms-3 mt-2">Edit <span className="PrimaryModal__Data ms-2"> Data Pengguna</span></h3>
            <h3 className='mt-3 ms-auto'>X</h3>
          </div>
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nama</Form.Label>
            <Form.Control type="text" placeholder="Masukan Nama" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Masukan Email" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Tanggal Registrasi</Form.Label>
            <Form.Control type="date" placeholder="Masukan Email" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Status</Form.Label>
            <Form.Check 
              type="switch"
              id="custom-switch"
              label="Verified"
            />
          </Form.Group>
          <div className="d-flex justify-content-center align-items-center mt-5">
            <button type="button" class="btn TombolReset">Reset</button>
            <button type="button" class="btn TombolSimpan ms-5">Simpan</button>
          </div>
        </Form>
        </Typography>
      </Box>
    </Modal>
  </div>
  </>
  )
}

export default ModalComponent;