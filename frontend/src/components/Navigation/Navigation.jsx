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
      <Stack className={styles.MainContent}>
        <Navbar>
            <Container className={styles.MainContent__Navbar}>
              <Navbar.Brand href="#home"><img src={logo} alt="Logo Brand" style={{width: "73px", height: "97"}}/></Navbar.Brand>
              <Nav className={styles.NavItem}>
                <Nav.Link href="#home" className={styles.NavList_Home}>Home</Nav.Link>
                <Nav.Link href="#features" className={styles.NavList__About}>About</Nav.Link>
                <Nav.Link href="#pricing" className={styles.NavList__Product}>Product List</Nav.Link>
              </Nav>
              <btn className={styles.Download}>Download</btn>
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
              {/* belum fix untuk bold "beban tagihan" */}
              <h1 className={styles.HeroText}>Si paling jadi pilihan buat nuntasin <span>Beban Tagihan</span> kamu</h1>
              <img src={btnDownload} alt="Google Play" className={styles.btnDownload}/>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Navigation;