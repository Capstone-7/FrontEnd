import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import styles from "../../assets/styles/ProductListReward.module.css";
import Aos from "aos";

const ProductListReward = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <Container fluid className={styles.blockreward}>
      <Row style={{ justifyContent: "center" }}>
        <Col lg={7} data-aos="fade-up" data-aos-anchor-placement="top-bottom">
          <h1
            style={{
              color: "#182E4A",
              textAlign: "center",
              fontWeight: "bolder",
            }}
          >
            Kasih Reward buat Dompet kamu dengan promo yang menarik
          </h1>
        </Col>
      </Row>
      <Row
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "0em 3em 0em 3em",
        }}
      >
        <Col
          lg={5}
          data-aos="fade-up"
          data-aos-anchor-placement="center-bottom"
        >
          <div
            style={{
              fontSize: "25px",
              color: "#396EB0",
              paddingBottom: "35px",
            }}
          >
            Temukan berbagai reward yang pastinya menarik dan dapatkan
            keuntungan lainnya dari para sobat brand PayOll
          </div>
          <a style={{ textDecoration: "none" }} href="http://bit.ly/3YxSP4A">
            <Button
              variant="primary"
              style={{ backgroundColor: "#284E7D", padding: "4%" }}
            >
              DOWNLOAD SEKARANG JUGA
            </Button>
          </a>
        </Col>
        <Col lg={5} data-aos="zoom-in-up">
          <Image
            src={require("../../assets/images/promo.png")}
            alt="promo"
            style={{ width: "130%", height: "100%" }}
          />
        </Col>
      </Row>
    </Container>
  );
};
export default ProductListReward;
