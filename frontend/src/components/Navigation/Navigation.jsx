import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import logo from '../../assets/images/Logo.png'
import Hero from "../../assets/images/hero.png"
import btnDownload from '../../assets/images/btn_download.png';

import styles from '../../assets/styles/Navigation.module.css'
import Stack from 'react-bootstrap/Stack';


const Navigation = () => {
  return (
    <>
    {/* Navbar */}
    <div className={styles.BackgroundContent}>
      <Stack className={styles.ContainerMainContent}>
        <Navbar className={styles.MainContent}>
            <Container className={styles.MainContent__Navbar}>
              <Navbar.Brand href="#home"><img src={logo} alt="Logo Brand" style={{width: "73px", height: "97"}} /></Navbar.Brand>
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
              <button className={styles.Download}>Download</button>
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