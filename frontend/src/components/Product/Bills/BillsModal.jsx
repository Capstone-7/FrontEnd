import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import Iconify from "../../Admin-Component/iconify/Iconify";
import Form from "react-bootstrap/Form";
import swal from "sweetalert";

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

const BillsModal = ({ id, setUpdate, update }) => {
  const [opens, setOpens] = React.useState(false);
  const [isChecked, setChecked] = useState();

  const [formData, setFormData] = useState({
    gambar: "",
    kodeProduk: "",
    deskripsi: "",
    status: "Not Active",
    nominal: "",
    kategori: "",
    harga: "",
    type: "bills",
    detail: "Detail Here",
    period: 0,
  });

  const {
    gambar,
    kodeProduk,
    deskripsi,
    status,
    nominal,
    kategori,
    harga,
    type,
    detail,
    period,
  } = formData;

  const token = Cookies.get("token");

  const handleOpen = () => setOpens(!opens);

  useEffect(() => {
    setChecked(formData.status === "active" ? true : false);
  }, []);

  const handleChangeFormData = (label, newValue) => {
    setFormData({
      ...formData,
      [label]: newValue,
    });
  };

  const handleSimpan = async (e) => {
    e.preventDefault();
    try {
      const response = await AxiosInstance.post("/product", {
        icon_url: formData.gambar,
        code: formData.kodeProduk,
        description: formData.deskripsi,
        status: formData.status,
        nominal: formData.nominal,
        category: formData.kategori,
        type: formData.type,
        details: formData.detail,
        active_period: formData.period,
        price: formData.harga,
      });
      setFormData({
        gambar: "",
        kodeProduk: "",
        deskripsi: "",
        status: "Not Active",
        nominal: "",
        kategori: "",
        harga: "",
        type: "bills",
        detail: "Detail Here",
        period: 0,
      });
      setChecked(false);
      setUpdate(!update);
      return response;
    } catch (err) {}
  };

  const resetData = () => {
    setFormData({
      gambar: "",
      kodeProduk: "",
      deskripsi: "",
      status: "Not Active",
      nominal: "",
      kategori: "",
      harga: "",
      type: "bills",
      detail: "Detail Here",
      period: 0,
    });
    setChecked(false);
  };

  return (
    <>
      <div>
        <MenuItem onClick={handleOpen} className="text-white">
          + Produk Baru
        </MenuItem>
        <Modal
          open={opens}
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
                  Tambah Produk
                  <span className="PrimaryModal__Data ms-2">Bills</span>
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
                  <Form.Control
                    type="text"
                    placeholder="Masukan Tautan"
                    value={gambar}
                    onChange={(e) =>
                      handleChangeFormData("gambar", e.currentTarget.value)
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-1" controlId="formBasicPassword">
                  <Form.Label>Kode Produk</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan Kode Produk"
                    value={kodeProduk}
                    onChange={(e) =>
                      handleChangeFormData("kodeProduk", e.currentTarget.value)
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-1" controlId="formBasicPassword">
                  <Form.Label>Deskripsi</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Tambahkan Nama Produk"
                    value={deskripsi}
                    onChange={(e) =>
                      handleChangeFormData("deskripsi", e.currentTarget.value)
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Status</Form.Label>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label={isChecked ? "Active" : "Not Active"}
                    checked={isChecked}
                    value={status}
                    onClick={() => setChecked(!isChecked)}
                    onChange={(e) =>
                      handleChangeFormData(
                        "status",
                        e.target.checked ? "Active" : "Not Active"
                      )
                    }
                  />
                </Form.Group>
                <Form.Group className="" controlId="formBasicPassword">
                  <Form.Label>Nominal</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan Nominal Produk yang akan ditambahkan"
                    value={nominal}
                    onChange={(e) =>
                      handleChangeFormData("nominal", e.currentTarget.value)
                    }
                  />
                </Form.Group>
                <Form.Group className="" controlId="formBasicPassword">
                  <Form.Label>Kategori</Form.Label>
                  <Form.Select
                    style={{ width: "130px" }}
                    aria-label="Default select example"
                    value={kategori}
                    onChange={(e) =>
                      handleChangeFormData("kategori", e.currentTarget.value)
                    }
                  >
                    <option value="" selected disabled>
                      Pilih Disini
                    </option>
                    <option value="token">Token</option>
                    <option value="Tagihan Air">Tagihan Air</option>
                    <option value="Pendidikan">Pendidikan</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-1" controlId="formBasicPassword">
                  <Form.Label>Harga (Rp)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Tambah Harga Produknya"
                    value={harga}
                    onChange={(e) =>
                      handleChangeFormData(
                        "harga",
                        Number(e.currentTarget.value)
                      )
                    }
                  />
                </Form.Group>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <button
                    type="button"
                    class="btn TombolReset"
                    onClick={resetData}
                  >
                    Ulangi
                  </button>
                  <button
                    type="button"
                    class="btn TombolSimpan ms-3"
                    onClick={handleSimpan}
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

export default BillsModal;
