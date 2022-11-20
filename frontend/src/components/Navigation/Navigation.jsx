import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import logo from '../../assets/images/Logo.png'
import Hero from "../../assets/images/hero.png"
import btnDownload from '../../assets/images/btn_download.png';

import styles from '../../assets/styles/Navigation.module.css'
import Stack from 'react-bootstrap/Stack';

import Form from 'react-bootstrap/Form';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button'


const Navigation = () => {
  return (
    <>

    <div className={styles.BackgroundContent}>
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
                <Nav.Link href="#pricing" className={styles.NavList__Item}>
                  Product List
                  <div className={styles.NavList__BottomBorder}></div> 
                </Nav.Link>
              </Nav>
              <Nav>
              <button className={styles.Download}>Download</button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Stack>



      {/* Main Content */}
      <div className="container">
        <div className="row">
          <div className="col-md-6 d-flex flex-column justify-content-center">
              <img src={Hero} className={styles.Hero} alt="Hero"/>
          </div>
          <div className="col-md-6">
              <h1 className={styles.HeroText}>Si paling jadi pilihan buat nuntasin <span className={styles.SecondaryText}>Beban Tagihan</span> kamu</h1>
              <img src={btnDownload} alt="Google Play" className={styles.btnDownload}/>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default Navigation;