import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import styles from "../../assets/styles/Login.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faEye } from '@fortawesome/free-solid-svg-icons'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

const Login = () => {
    return (
        <Container fluid className={styles.blocklogin}>
            <Row
                style={{
                    height: "100vh",
                    alignItems: "center",
                    justifyContent: "right",
                    paddingRight: "4em"
                }}>
                <Col lg={4}>
                    <div>
                        <div className={styles.ketlogin}>
                            <h2>Admin Login</h2>
                            <div>Selamat Datang Kembali. Silahkan masuk ke akun anda.</div>
                        </div>
                        <div>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label className={styles.email}>Email</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text style={{ backgroundColor: "#ffffff", borderRight: "0" }}><FontAwesomeIcon icon={faUser} /></InputGroup.Text>
                                        <Form.Control
                                            type='email'
                                            placeholder="Masukkan email"
                                            aria-label="Username"
                                            aria-describedby="basic-addon1"
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label className={styles.password}>Kata Sandi</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text style={{ backgroundColor: "#ffffff" }}><FontAwesomeIcon icon={faLock} /></InputGroup.Text>
                                        <Form.Control
                                            type='password'
                                            placeholder="Masukkan Kata sandi"
                                            aria-label="Username"
                                            aria-describedby="basic-addon1"
                                        />
                                        <InputGroup.Text style={{ backgroundColor: "#ffffff", borderLeft: "0" }}><FontAwesomeIcon icon={faEye} /></InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                                <Button className={styles.button} variant="primary">Login</Button>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Login