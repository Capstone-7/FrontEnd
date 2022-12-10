import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import Iconify from "../../components/Admin-Component/iconify/Iconify";
import Form from "react-bootstrap/Form";

import AxiosInstance from "../../configs/axios/AxiosInstance";

import "./modalUser.css";

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

const DailyModal = ({ id }) => {
  const [open, setOpen] = React.useState(false);
  const [isChecked, setChecked] = useState();
  const [product, setproduct] = useState({});

  const token = Cookies.get("token");

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    AxiosInstance.get(`product/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      setproduct(res.data.data);
    });
  }, []);

  useEffect(() => {
    setChecked(product.status === "verified" ? true : false);
  }, [product]);

  const UpdateStatus = (prop) => {
    const {
      code,
      description,
      nominal,
      price,
      type,
      category,
      status,
      icon_rul,
    } = prop;
    AxiosInstance.put(
      `product/${id}`,
      {
        code: code,
        description: description,
        nominal: nominal,
        price: price,
        type: type,
        category: category,
        status: isChecked ? "active" : "not active",
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  };

  return (
    <>
      <div>
        <MenuItem onClick={handleOpen}>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="modalUser"
        >
          <Box
            sx={{
              width: 851,
              height: 700,
            }}
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
                {/* <h3 onClick={() => console.log(user.status)}>Test</h3> */}
              </div>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 1 }}>
              <Form>
                <Form.Group className="mb-1" controlId="formBasicEmail">
                  <Form.Label>Gambar</Form.Label>
                  <Form.Control type="text" placeholder="Masukan Tautan" />
                </Form.Group>

                <Form.Group className="mb-1" controlId="formBasicPassword">
                  <Form.Label>Kode Produk</Form.Label>
                  <Form.Control type="text" placeholder="TELKOMP5000" />
                </Form.Group>
                <Form.Group className="mb-1" controlId="formBasicPassword">
                  <Form.Label>Deskripsi</Form.Label>
                  <Form.Control type="text" placeholder="Telkomsel" />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Status</Form.Label>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label={isChecked ? "Active" : "Not Active"}
                    checked={isChecked}
                    onClick={() => setChecked(!isChecked)}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicPassword">
                  <Form.Label>Nominal</Form.Label>
                  <Form.Control type="text" placeholder="5000" />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicPassword">
                  <Form.Label>Deskripsi</Form.Label>
                  <Form.Select
                    style={{ width: "130px" }}
                    aria-label="Default select example"
                  >
                    <option>Pilih Disini</option>
                    <option value="1">Success</option>
                    <option value="2">Pending</option>
                    <option value="3">Cancel</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-1" controlId="formBasicPassword">
                  <Form.Label>Harga (Rp)</Form.Label>
                  <Form.Control type="text" placeholder="5000" />
                </Form.Group>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <button type="button" class="btn TombolReset">
                    Ulangi
                  </button>
                  <button
                    type="button"
                    class="btn TombolSimpan ms-3"
                    onClick={() => UpdateStatus(product)}
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
