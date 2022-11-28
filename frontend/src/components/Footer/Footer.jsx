import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import Stack from 'react-bootstrap/Stack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import styles from "../../assets/styles/Footer.module.css"

const Footer = () => {
    return (
        <Container fluid className={styles.blockfooter}>
            <Row className={styles.rowfooter}>
                <Col lg={3} sm={3}>
                    <Stack direction="horizontal" gap={3}>
                        <div>
                            <Image src={require("../../assets/icons/logo.png")} alt="logo" fluid className={styles.logo} />
                            <Stack direction="horizontal" gap={4} className={styles.columnone}>
                                <div>
                                    Download Now
                                </div>
                                <div>
                                    License
                                </div>
                                <div>
                                    About
                                </div>
                                <div>
                                    Features
                                </div>
                            </Stack>
                            <Stack direction="horizontal" gap={3} style={{ fontSize: "11px" }}>
                                <div>
                                    © Copyright 2022
                                </div>
                                <div style={{ color: "#B7D7FD" }}>
                                    <i>PayOll</i>
                                </div>
                            </Stack>
                        </div>
                    </Stack>
                </Col>
                {/* <Col lg={1} className={styles.linerow}>
                </Col> */}
                <Col lg={4} sm={4} style={{ textAlign: "center", fontSize: "13px" }}>
                    <Stack direction="horizontal" gap={5}>
                        <div className={styles.line}></div>
                        <div>
                            <h5 style={{ paddingBottom: "12px", color: "#B7D7FD" }}>
                                Contact Us
                            </h5>
                            <div style={{ paddingBottom: "15px" }}>
                                Reach out to us for any inquiry
                            </div>
                            <Stack direction="horizontal" gap={3} style={{ justifyContent: "center" }}>
                                <Stack direction="horizontal" gap={3}>
                                    <FontAwesomeIcon icon={faPhone} />
                                    <div>
                                        (024) 20192933
                                    </div>
                                </Stack>
                                <Stack direction="horizontal" gap={3}>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    <div>
                                        email@mail.com
                                    </div>
                                </Stack>
                            </Stack>
                        </div>
                        <div className={styles.line}></div>
                    </Stack>
                </Col>
                {/* <Col lg={1} className={styles.linerow}>
                </Col> */}
                <Col lg={3} sm={3}>
                    <div style={{ color: "#B7D7FD", paddingBottom: "12px", }}>
                        Get in app
                    </div>
                    <Image src={require("../../assets/icons/btn_download.png")} alt="download" fluid />
                </Col>
            </Row>
        </Container >
    )
}

export default Footer