import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Stack from "react-bootstrap/Stack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import styles from "../../assets/styles/Footer.module.css";
import AnchorLink from "react-anchor-link-smooth-scroll";

const Footer = () => {
  return (
    <Container fluid className={styles.blockfooter}>
      <Row className={styles.rowfooter}>
        <Col xs={5} lg={3} sm={3} md={3} className={styles.blockone}>
          <Stack direction="horizontal" gap={3}>
            <div>
              <Image
                src={require("../../assets/icons/logo.png")}
                alt="logo"
                fluid
                className={styles.logo}
              />
              <Stack
                direction="horizontal"
                gap={4}
                className={styles.columnone}
              >
                <a style={{ textDecoration: "none" }} href="http://bit.ly/3YxSP4A">
                  <div>Download Now</div>
                </a>
                <div>License</div>
                <AnchorLink
                  href="#about"
                  style={{ textDecoration: "none", color: "#e8f2fe" }}
                >
                  About
                </AnchorLink>
                <div>Features</div>
              </Stack>
              <Stack
                direction="horizontal"
                gap={3}
                style={{ fontSize: "11px" }}
              >
                <div>© Copyright 2022</div>
                <div style={{ color: "#B7D7FD" }}>
                  <i>PayOll</i>
                </div>
              </Stack>
            </div>
          </Stack>
        </Col>
        <Col
          xs={6}
          lg={4}
          sm={6}
          md={6}
          style={{ textAlign: "center", fontSize: "13px" }}
          className={styles.columntwo}
        >
          <Stack direction="horizontal" gap={5} className={styles.columntwo}>
            <div className={styles.leftline}></div>
            <div className={styles.contentcolumntwo}>
              <h5 style={{ paddingBottom: "12px", color: "#B7D7FD" }}>
                Contact Us
              </h5>
              <div style={{ paddingBottom: "15px" }}>
                Reach out to us for any inquiry
              </div>
              <Stack
                direction="horizontal"
                gap={3}
                style={{ justifyContent: "center" }}
              >
                <Stack direction="horizontal" gap={3}>
                  <FontAwesomeIcon icon={faPhone} />
                  <div>(024) 20192933</div>
                </Stack>
                <Stack direction="horizontal" gap={3}>
                  <FontAwesomeIcon icon={faEnvelope} />
                  <div>email@mail.com</div>
                </Stack>
              </Stack>
            </div>
            <div className={styles.rightline}></div>
          </Stack>
        </Col>
        <Col lg={3} sm={3} md={2} className={styles.columnthree}>
          <div style={{ color: "#B7D7FD", paddingBottom: "12px" }}>
            Get in app
          </div>
          <a style={{ textDecoration: "none" }} href="http://bit.ly/3YxSP4A">
            <Image
              src={require("../../assets/icons/btn_download.png")}
              alt="download"
              fluid
            />
          </a>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
