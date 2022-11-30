import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import logo from '../../assets/images/Logo.png'


import styles from '../../assets/styles/Navigation.module.css'
import Stack from 'react-bootstrap/Stack';
import { useNavigate } from "react-router-dom"


const Navigation = () => {


  const navigate = useNavigate();
      const toProduct = () => {
          navigate("/productlist")
      }


  return (
    <>
    <Stack className={styles.ContainerMainContent}>
        <Navbar collapseOnSelect expand="lg" className={styles.MainContent} >
          <Container>
          <Navbar.Brand href="#home"><img src={logo} alt="Logo Brand" style={{width: "73px", height: "97"}} className={styles.Logo} /></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className={styles.NavItem}>
              <Nav.Link href="#home" className={styles.NavList__Item}>
                  Home
                  <div className={styles.NavList__BottomBorder}></div>
              </Nav.Link>
                <Nav.Link href="#features" className={styles.NavList__Item}>
                  About
                  <div className={styles.NavList__BottomBorder}></div>
                </Nav.Link>
                <Nav.Link onClick={toProduct} className={styles.NavList__Item}>
                  Product List
                  <div className={styles.NavList__BottomBorder}></div> 
                </Nav.Link>
                {/* <DarkMode /> */}
              </Nav>
              <Nav>
              <button className={styles.Download}>Download</button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Stack>
    </>
  )
}

export default Navigation;