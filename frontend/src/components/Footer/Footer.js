import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import Stack from 'react-bootstrap/Stack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from "../../assets/styles/Footer.module.css"

const Footer = () => {
    return (
        <Container fluid className={styles.blockfooter}>
            <Row className={styles.rowfooter}>
                <Col lg={3}>
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
                    <Stack direction="horizontal" gap={3}>
                        <div>
                            © Copyright 2022
                        </div>
                        <div style={{ color: "#B7D7FD" }}>
                            <i>PayOll</i>
                        </div>
                    </Stack>
                </Col>
                <Col lg={1} className={styles.linerow}>
                    <div className={styles.line}></div>
                </Col>
                <Col lg={3} style={{ textAlign: "center" }}>
                    <h5 style={{ paddingBottom: "12px", color: "#B7D7FD" }}>
                        Contact Us
                    </h5>
                    <div style={{ paddingBottom: "15px" }}>
                        Reach out to us for any inquiry
                    </div>
                    <Stack direction="horizontal" gap={3} style={{ justifyContent: "center" }}>
                        <Stack direction="horizontal" gap={3}>
                            <FontAwesomeIcon icon="fa-light fa-phone" />
                            <div>
                                (024) 20192933
                            </div>
                        </Stack>
                        <Stack direction="horizontal" gap={3}>
                            <FontAwesomeIcon icon="fa-light fa-envelope" />
                            <div>
                                email@mail.com
                            </div>
                        </Stack>
                    </Stack>
                </Col>
                <Col lg={1} className={styles.linerow}>
                    <div className={styles.line}></div>
                </Col>
                <Col lg={3}>
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