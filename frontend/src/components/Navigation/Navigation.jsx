import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import logo from "../../assets/images/Logo.png";

import styles from "../../assets/styles/Navigation.module.css";
import Stack from "react-bootstrap/Stack";
import { useNavigate } from "react-router-dom";
import AnchorLink from "react-anchor-link-smooth-scroll";

const Navigation = () => {
  const navigate = useNavigate();
  const toProduct = () => {
    navigate("/productlist");
  };

  const toHome = () => {
    navigate("/");
  };

  return (
    <>
      <Stack className={styles.ContainerMainContent}>
        <Navbar collapseOnSelect expand="lg" className={styles.MainContent}>
          <Container>
            <Navbar.Brand onClick={toHome}>
              <img
                src={logo}
                alt="Logo Brand"
                style={{ width: "73px", height: "97" }}
                className={styles.Logo}
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className={styles.NavItem}>
                <Nav.Link onClick={toHome} className={styles.NavList__Item}>
                  Home
                  <div className={styles.NavList__BottomBorder}></div>
                </Nav.Link>
                <Nav.Link>
                  <AnchorLink
                    href="#about"
                    className={styles.NavList__ItemAbout}
                  >
                    About
                    <div className={styles.NavList__BottomBorder}></div>
                  </AnchorLink>
                </Nav.Link>
                <Nav.Link onClick={toProduct} className={styles.NavList__Item}>
                  Product List
                  <div className={styles.NavList__BottomBorder}></div>
                </Nav.Link>
              </Nav>
              <Nav>
                <a style={{ textDecoration: "none" }} href="http://bit.ly/3YxSP4A"><button className={styles.Download}>Download</button></a>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Stack>
    </>
  );
};

export default Navigation;
