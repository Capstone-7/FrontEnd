import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate, redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import styles from "../../assets/styles/Login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEye } from "@fortawesome/free-solid-svg-icons";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { login } from "../../store/features/UserSlice";
import { useSelector, useDispatch } from "react-redux";
import { Auth } from "../../utils/Auth";
import Modal from "react-bootstrap/Modal";

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const useItems = useSelector((state) => state.adminToken);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validate = await dispatch(
      login({
        email: data.email,
        password: data.password,
      })
    );

    if (validate.payload !== undefined) {
      Auth.storeUserInfoToCookie(validate.payload);
      navigate("/admin");
    } else {
      handleShow();
    }
  };

  return (
    <>
      <Container fluid className={styles.blocklogin}>
        <Row
          style={{
            height: "100vh",
            alignItems: "center",
            justifyContent: "right",
            paddingRight: "4em",
          }}
        >
          <Col lg={4} sm={4}>
            <div>
              <div className={styles.ketlogin}>
                <h2>Admin Login</h2>
                <div>Selamat Datang Kembali. Silahkan masuk ke akun anda.</div>
              </div>
              <div>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label className={styles.email}>Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text
                        style={{ backgroundColor: "#ffffff", borderRight: "0" }}
                      >
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                      <Form.Control
                        name="email"
                        type="email"
                        onChange={onChange}
                        value={data.email}
                        placeholder="Masukkan email"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className={styles.password}>
                      Kata Sandi
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Text style={{ backgroundColor: "#ffffff" }}>
                        <FontAwesomeIcon icon={faLock} />
                      </InputGroup.Text>
                      <Form.Control
                        name="password"
                        type={passwordShown ? "text" : "password"}
                        onChange={onChange}
                        value={data.password}
                        placeholder="Masukkan Kata sandi"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                      <InputGroup.Text
                        onClick={() => setPasswordShown(!passwordShown)}
                        style={{ backgroundColor: "#ffffff", borderLeft: "0" }}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                  <Button
                    onClick={handleSubmit}
                    className={styles.button}
                    variant="primary"
                  >
                    Login
                  </Button>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Peringatan</Modal.Title>
        </Modal.Header>
        <Modal.Body>Email atau Kata sandi salah</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

//   const navigate = useNavigate();

//   const OnChange = (e, setState) => {
//     setState(e.target.value);
//   };

//   const AmbilToken = (email, password) => {
//     AxiosInstance.post("user/login", {
//       email: email,
//       password: password,
//     })
//       // .then((res) => Cookies.set("token", res.data.data.token));
//       // navigate('/admin');
//       .then((res) => {
//         Cookies.set("token", res.data.data.token);
//         navigate("/admin");
//       });
//   };

//   const AmbilPengguna = () => {
//     AxiosInstance.get("user/count", {
//       headers: {
//         Authorization: "Bearer " + token,
//       },
//     }).then((res) => setUser(res.data.data));
// };

// const items = useSelector((state) => console.log(state))
// const dispatch = useDispatch()

// useEffect(() => {
//     dispatch(login())
// }, [])

//   return (
//     <Container fluid className={styles.blocklogin}>
//       <Row
//         style={{
//           height: "100vh",
//           alignItems: "center",
//           justifyContent: "right",
//           paddingRight: "4em",
//         }}
//       >
//         <Col lg={4} sm={4}>
//           <div>
//             <div className={styles.ketlogin}>
//               <h2>Admin Login</h2>
//               <div>Selamat Datang Kembali. Silahkan masuk ke akun anda.</div>
//             </div>
//             <div>
//               <Form
//                 onSubmit={(e) => {
//                   e.preventDefault();
//                   AmbilToken(email, password);
//                 }}
//               >
//                 <Form.Group
//                   className="mb-3"
//                   controlId="exampleForm.ControlInput1"
//                 >
//                   <Form.Label className={styles.email}>Email</Form.Label>
//                   <InputGroup>
//                     <InputGroup.Text
//                       style={{ backgroundColor: "#ffffff", borderRight: "0" }}
//                     >
//                       <FontAwesomeIcon icon={faUser} />
//                     </InputGroup.Text>
//                     <Form.Control
//                       type="text"
//                       name="email"
//                       onChange={(e) => OnChange(e, setEmail)}
//                       placeholder="Masukkan email"
//                       aria-label="Username"
//                       aria-describedby="basic-addon1"
//                     />
//                   </InputGroup>
//                 </Form.Group>
//                 <Form.Group
//                   className="mb-3"
//                   controlId="exampleForm.ControlInput1"
//                 >
//                   <Form.Label className={styles.password}>
//                     Kata Sandi
//                   </Form.Label>
//                   <InputGroup>
//                     <InputGroup.Text style={{ backgroundColor: "#ffffff" }}>
//                       <FontAwesomeIcon icon={faLock} />
//                     </InputGroup.Text>
//                     <Form.Control
//                       type={passwordShown ? "text" : "password"}
//                       name="password"
//                       onChange={(e) => OnChange(e, setPassword)}
//                       placeholder="Masukkan Kata sandi"
//                       aria-label="Username"
//                       aria-describedby="basic-addon1"
//                     />
//                     <InputGroup.Text
//                       onClick={() => setPasswordShown(!passwordShown)}
//                       style={{ backgroundColor: "#ffffff", borderLeft: "0" }}
//                     >
//                       <FontAwesomeIcon icon={faEye} />
//                     </InputGroup.Text>
//                     {/* <p>{token}</p>
//                                         <div>
//                                             <p>Cookies: {Cookies.get("token") ? "ada" : "kosong"}</p>
//                                             <p>Ini Cookies: {Cookies.get("token")}</p>
//                                         </div> */}
//                   </InputGroup>
//                 </Form.Group>
//                 {/* <input type="submit" value="Login" /> */}
//                 <Button
//                   className={styles.button}
//                   variant="primary"
//                   type="submit"
//                 >
//                   Login
//                 </Button>
//               </Form>
//             </div>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );

export default Login;
