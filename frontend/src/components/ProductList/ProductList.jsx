import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import 'swiper/css/scrollbar';
import SwiperCore, { EffectCoverflow, Pagination, Navigation } from "swiper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import styles from "../../assets/styles/ProductList.module.css";
import Aos from "aos";

SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

const ProductList = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <Container fluid className={styles.blockcarousel}>
      <Row
        style={{
          justifyContent: "center",
          textAlign: "center",
          padding: "3em 0em 0em 0em ",
        }}
      >
        <Col lg={3}>
          <h2>Product List</h2>
        </Col>
      </Row>
      <Row
        style={{ justifyContent: "center", padding: "2em 0em 7em 0em " }}
        data-aos="fade-up"
      >
        <Col lg={10}>
          <Swiper
            navigation={true}
            effect={"coverflow"}
            spaceBetween={50}
            loop={true}
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              360: {
                width: 360,
                slidesPerView: 1,
                centeredSlides: true,
              },
              1030: {
                width: 1030,
                slidesPerView: 3,
                centeredSlides: true,
              },
              1550: {
                width: 1550,
                slidesPerView: 3,
                centeredSlides: true,
              },
            }}
            className={styles.mySwiper}
          >
            <SwiperSlide style={{ position: "relative" }}>
              {({ isActive }) => (
                <div>
                  <Image
                    src={require("../../assets/images/daily.jpg")}
                    alt="First slide"
                    className={`${isActive ? styles.active : styles.normal}`}
                  />
                  <div className="d-flex justify-content-center me-4">
                    <div className={styles.dailystyle}>
                      <h2>Daily</h2>
                      <div>Best price on your Dompet</div>
                      <Button variant="primary">
                        Mampir Dulu aja
                        <FontAwesomeIcon
                          style={{ paddingLeft: "10px" }}
                          icon={faCircleArrowRight}
                        />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
            <SwiperSlide style={{ alignItems: "center" }}>
              {({ isActive }) => (
                <div>
                  <Image
                    src={require("../../assets/images/bills.jpg")}
                    alt="First slide"
                    className={`${isActive ? styles.active : styles.normal}`}
                  />
                  <div className={styles.billsstyle}>
                    <h2>Bills</h2>
                    <div>
                      Kurangin beban Tagihan kamu & keluargamu dengan cepat
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
            <SwiperSlide style={{ alignItems: "center" }}>
              {({ isActive }) => (
                <div>
                  <Image
                    src={require("../../assets/images/entertainment.jpg")}
                    alt="First slide"
                    className={`${isActive ? styles.active : styles.normal}`}
                  />
                  <div className={styles.entertainmentstyle}>
                    <h2>Entertainment</h2>
                    <div>
                      Mental Health is priority. Beli Paket hiburan kamu disini
                      aja
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          </Swiper>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductList;
