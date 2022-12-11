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

const ModalComponent = ({ id }) => {
  const [open, setOpen] = React.useState(false);
  const [isChecked, setChecked] = useState();
  const [user, setUser] = useState({});

  const token = Cookies.get("token");

  const handleOpen = () => setOpen(!open);

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
  }, [user]);

  const UpdateStatus = (prop) => {
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
              height: 550,
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
