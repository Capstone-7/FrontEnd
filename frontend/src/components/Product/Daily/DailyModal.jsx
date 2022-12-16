import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import Iconify from "../../Admin-Component/iconify/Iconify";
import Form from "react-bootstrap/Form";
// import styles from "../../assets/styles/ProductsModal.module.css"
import AxiosInstance from "../../../configs/axios/AxiosInstance";

import "../../../assets/styles/modalUser.css";

import Cookies from "js-cookie";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DailyModal = ({ id, setUpdate, update, setOpen }) => {
  const [opens, setOpens] = React.useState(false);
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const [isChecked, setChecked] = useState();
  const [product, setproduct] = useState({});

  const token = Cookies.get("token");

  const handleOpen = () => setOpens(!opens);

  useEffect(() => {
    AxiosInstance.get(`product/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      console.log(res)
      setproduct(res.data.data);
      setChecked(res.data.data.status === 'active' ? true : false)
    });
  }, []);

  const handleChangeFormData = (e) => {
    setproduct({
      ...product,
      [e.target.name]: e.target.value,
    });
    // console.log(e.target.value)
  };

  const handleChangePriceData = (e) => {
    setproduct({
      ...product,
      [e.target.name]: Number(e.target.value),
    });
  };

  const UpdateStatus = async (data, e) => {
    e.preventDefault();
    try {
      const response = await AxiosInstance.put(`/product/${data}`, product);
      setUpdate(!update)
      setOpen(false)
      // setAnchorEl(null);
      return response;
    } catch (err) { }
  };

  return (
    <>
      <div>
        <MenuItem onClick={handleOpen}>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <Modal
          open={opens}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="modalUser"
        >
          <Box
            className="boxModal"
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              className="PrimaryModal"
            >
              <div className="d-flex justify-content-start align-items-center ModalChild">
                <h3 className="EditModal ms-3">
                  Ubah Data
                  <span className="PrimaryModal__Data ms-2">Daily</span>
                </h3>
                <h3 className="mt-3 ms-auto" onClick={handleOpen}>
                  X
                </h3>
              </div>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 1 }}>
              <Form>
                <Form.Group className="mb-1" controlId="formBasicEmail">
                  <Form.Label>Gambar</Form.Label>
                  <Form.Control onChange={handleChangeFormData}
                    name="icon_url"
                    value={product?.icon_url}
                    type="text" />
                </Form.Group>

                <Form.Group className="mb-1" controlId="formBasicPassword">
                  <Form.Label>Kode Produk</Form.Label>
                  <Form.Control onChange={handleChangeFormData} name="code" value={product?.code} type="text" />
                </Form.Group>
                <Form.Group className="mb-1" controlId="formBasicPassword">
                  <Form.Label>Deskripsi</Form.Label>
                  <Form.Control onChange={handleChangeFormData} name="description" value={product?.description} type="text" />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Status</Form.Label>
                  <Form.Check
                    onChange={handleChangeFormData}
                    name="status"
                    type="switch"
                    id="custom-switch"
                    label={isChecked ? "Active" : "Not Active"}
                    value={isChecked ? "Not Active" : "Active"}
                    checked={isChecked}
                    onClick={() => setChecked(!isChecked)}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicPassword">
                  <Form.Label>Nominal</Form.Label>
                  <Form.Control onChange={handleChangeFormData} name="nominal" value={product?.nominal} type="text" />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicPassword">
                  <Form.Label>Kategori</Form.Label>
                  <Form.Select
                    onChange={handleChangeFormData}
                    name="category"
                    style={{ width: "130px" }}
                    aria-label="Default select example"
                    value={product?.category}
                  // onSelect={product?.category}
                  >
                    <option disabled value="">Pilih Disini</option>
                    <option value="pulsa">Pulsa</option>
                    <option value="data">Paket Data</option>
                    <option value="voucher">Voucher</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-1" controlId="formBasicPassword">
                  <Form.Label>Harga (Rp)</Form.Label>
                  <Form.Control onChange={handleChangePriceData} name="price" value={product?.price} type="number" />
                </Form.Group>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <button type="button" class="btn TombolReset">
                    Ulangi
                  </button>
                  <button
                    type="button"
                    class="btn TombolSimpan ms-3"
                    onClick={(e) => UpdateStatus(id, e)}
                  >
                    Simpan
                  </button>
                </div>
              </Form>
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default DailyModal;
