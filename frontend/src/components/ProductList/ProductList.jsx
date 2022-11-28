import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
import SwiperCore, {
    EffectCoverflow,
    Pagination,
    Navigation
} from "swiper";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons'
import styles from "../../assets/styles/ProductList.module.css"

SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

const ProductList = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Container fluid className={styles.blockcarousel}>
            <Row style={{ justifyContent: "center", textAlign: "center", padding: "3em 0em 0em 0em " }}>
                <Col lg={3}>
                    <h2>Product List</h2>
                </Col>
            </Row>
            <Row style={{ justifyContent: "center", padding: "2em 0em 7em 0em " }}>
                <Col lg={10}>
                    <Swiper
                        navigation={true}
                        effect={"coverflow"}
                        centeredSlides={true}
                        spaceBetween={50}
                        slidesPerView={3}
                        loop={true}
                        coverflowEffect={{
                            rotate: 20,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: true
                        }}
                        pagination={{
                            clickable: true
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
                                    <div className={styles.dailystyle}>
                                        <h2>Daily</h2>
                                        <div>Best price on your Dompet</div>
                                        <Button variant="primary">Mampir Dulu aja<FontAwesomeIcon style={{ paddingLeft: "10px" }} icon={faCircleArrowRight} /></Button>
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
                                        <div>Kurangin beban Tagihan kamu & keluargamu dengan cepat</div>
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
                                        <div>Mental Health is priority. Beli Paket hiburan kamu disini aja</div>
                                    </div>
                                </div>
                            )}
                        </SwiperSlide>
                    </Swiper>
                    {/* <Carousel activeIndex={index} onSelect={handleSelect} className={styles.carousel}>
                        <Carousel.Item>
                            <Image
                                className="d-block w-100"
                                src={require("../../assets/images/daily.jpg")}
                                alt="First slide"
                                fluid
                            />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={require("../../assets/images/bills.jpg")}
                                alt="Second slide"
                                fluid
                            />

                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={require("../../assets/images/entertainment.jpg")}
                                alt="Third slide"
                                fluid
                            />

                            <Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>
                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel> */}
                </Col>
            </Row>
        </Container>
    )
}

export default ProductList