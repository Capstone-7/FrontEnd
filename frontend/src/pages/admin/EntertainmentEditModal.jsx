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

const EntertainmentEditModal = ({ id }) => {
    const [open, setOpen] = React.useState(false);
    // const [anchorEl, setAnchorEl] = React.useState(null);
    const [isChecked, setChecked] = useState();
    const [product, setproduct] = useState({
        gambar: "",
        kodeProduk: "",
        deskripsi: "",
        status: "Not Active",
        nominals: "",
        kategori: "",
        details: "New Details",
        harga: "",
    });

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

    const handleChangeFormData = (e) => {
        setproduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    };

    const UpdateState = async (data, e) => {
        e.preventDefault();
        try {
            const response = await AxiosInstance.put(`/product/${data}`, {
                icon_url: product.gambar,
                code: product.kodeProduk,
                description: product.deskripsi,
                status: product.status,
                nominal: product.nominals,
                category: product.kategori,
                type: product.type,
                details: product.details,
                active_period: product.period,
                price: Number(product.harga),
            });
            setproduct({
                gambar: "",
                kodeProduk: "",
                deskripsi: "",
                status: "Not Active",
                nominals: "",
                kategori: "",
                details: "New",
                harga: "",
            });
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
                            </div>
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                            <Form>
                                <Form.Group className="mb-1" controlId="formBasicEmail">
                                    <Form.Label>Gambar</Form.Label>
                                    <Form.Control onChange={handleChangeFormData} name="gambar" value={product?.gambar} type="text" placeholder={product?.icon_url} />
                                </Form.Group>

                                <Form.Group className="mb-1" controlId="formBasicPassword">
                                    <Form.Label>Kode Produk</Form.Label>
                                    <Form.Control onChange={handleChangeFormData} name="kodeProduk" value={product?.kodeProduk} type="text" placeholder={product?.code} />
                                </Form.Group>
                                <Form.Group className="mb-1" controlId="formBasicPassword">
                                    <Form.Label>Deskripsi</Form.Label>
                                    <Form.Control onChange={handleChangeFormData} name="deskripsi" value={product?.deskripsi} type="text" placeholder={product?.description} />
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
                                    <Form.Control onChange={handleChangeFormData} name="nominals" value={product?.nominals} type="text" placeholder={product?.nominal} />
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="formBasicPassword">
                                    <Form.Label>Kategori</Form.Label>
                                    <Form.Select
                                        onChange={handleChangeFormData}
                                        name="kategori"
                                        style={{ width: "130px" }}
                                        aria-label="Default select example"
                                        value={product?.kategori}
                                    // onSelect={product?.category}
                                    >
                                        <option disabled value="">Pilih Disini</option>
                                        <option value="Token">Token</option>
                                        <option value="Tagihan Air">Tagihan Air</option>
                                        <option value="Internet & Tv">Internet & Tv</option>
                                        <option value="Internet & Tv">Internet & Tv</option>
                                        <option value="Pendidikan">Pendidikan</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-1" controlId="formBasicPassword">
                                    <Form.Label>Harga (Rp)</Form.Label>
                                    <Form.Control onChange={handleChangeFormData} name="harga" value={product?.harga} type="text" placeholder={product?.price} />
                                </Form.Group>
                                <div className="d-flex justify-content-center align-items-center mt-4">
                                    <button type="button" class="btn TombolReset">
                                        Ulangi
                                    </button>
                                    <button
                                        type="button"
                                        class="btn TombolSimpan ms-3"
                                        onClick={(e) => UpdateState(id, e)}
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

export default EntertainmentEditModal;
