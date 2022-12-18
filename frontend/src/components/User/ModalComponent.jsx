import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import Iconify from "../../components/Admin-Component/iconify/Iconify";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from 'react-toastify';

import AxiosInstance from "../../configs/axios/AxiosInstance";

import "../../assets/styles/modalUser.css";

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

const ModalComponent = ({ id, setUpdate, update, setOpen, open }) => {
  const [opens, setOpens] = React.useState(false);
  const [isChecked, setChecked] = useState();
  const [user, setUser] = useState({});

  const token = Cookies.get("token");

  const handleOpen = () => {
    setOpens(!opens);
  }


  useEffect(() => {
    AxiosInstance.get(`user/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      setUser(res.data.data);
    });
  }, []);

  useEffect(() => {
    setChecked(user.status === "verified" ? true : false);
  }, []);

  const animateToast = () => {
    toast.success('Edit Berhasil', {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  }

  const UpdateStatus = (prop) => {
    // console.log(e)
    const { email, name } = prop;
    AxiosInstance.put(
      `user/${id}`,
      {
        email: email,
        name: name,
        status: isChecked ? "verified" : "not_verified",
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    // handleOpen()
    setOpen(!open)
    animateToast()
    setTimeout(() => {
      setUpdate(!update)
    }, 100);
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
            sx={{
              width: 600,
              height: 300,
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
                <h3 className="EditModal ms-3 mt-2">
                  Edit
                  <span className="PrimaryModal__Data ms-2">Data Pengguna</span>
                </h3>
                <h3 className="mt-3 ms-auto" onClick={handleOpen}>
                  X
                </h3>
              </div>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Status</Form.Label>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label={isChecked ? "Verified" : "Not Verified"}
                    checked={isChecked}
                    onClick={() => setChecked(!isChecked)}
                  />
                </Form.Group>
                <div className="d-flex justify-content-center align-items-center mt-5">
                  <button
                    type="button"
                    class="btn TombolSimpan"
                    onClick={() => UpdateStatus(user)}
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

export default ModalComponent;
