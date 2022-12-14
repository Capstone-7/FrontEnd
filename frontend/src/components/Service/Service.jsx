import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import styles from '../../assets/styles/Service.module.css'
import Stack from 'react-bootstrap/esm/Stack';

const Service = () => {
    return (
        <>
            <Container fluid className={styles.blockservice}>
                <Row className={styles.titleservice}>
                    <Col lg={9}>
                        <h2 style={{
                            textAlign: "center",
                            paddingBottom: "12px"
                        }}>
                            Kamu nanya kenapa harus <i>PayOll</i>?
                        </h2>
                        <div style={{
                            textAlign: "center",
                            paddingBottom: "2em"
                        }}>
                            Ni ya, Kita kasih tau ya! Kita bisa bikin kamu ngerasa nyaman disaat kamu lagi ngelakuin
                            pembayaran tagihan online. Selain bikin nyaman kita juga sediain ini buat kamu
                        </div>
                    </Col>
                </Row>
                <Stack style={{ zIndex: "1" }}>
                    <Row className={styles.rowonecard}>
                        <Col lg={3} sm={5} className={styles.toMid}>
                            <Card className={styles.card}>
                                <Card.Img variant="top" src={require("../../assets/icons/pengamanan.png")}
                                    style={{
                                        width: "35%",
                                        height: "auto",
                                        zIndex: "0"
                                    }} />
                                <Card.Body>
                                    <Card.Title>Perlindungan Extra</Card.Title>
                                    <Card.Text>
                                        Sepenting itu kamu buat kita, selama proses pembayaran kamu kita pantau 7x24 jam dengan keamanan sistem kelas dunia
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={3} sm={5} className={styles.toMid}>
                            <Card className={styles.card}>
                                <Card.Img variant="top" src={require("../../assets/icons/pasdikantong.png")} style={{
                                    width: "35%",
                                    height: "auto",
                                }} />
                                <Card.Body>
                                    <Card.Title>Pas Dikantong</Card.Title>
                                    <Card.Text>
                                        Buat kamu yang spesial nya melebihi martabak, Nikmati produk dengan harga terbaik dan promo - promo yang menarik perhatian kantong kamu
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={3} sm={5} className={styles.toMid}>
                            <Card className={styles.card}>
                                <Card.Img variant="top" src={require("../../assets/icons/easypeasy.png")} style={{
                                    width: "35%",
                                    height: "auto",
                                }} />
                                <Card.Body>
                                    <Card.Title>Easy Peasy</Card.Title>
                                    <Card.Text>
                                        Don’t worry be happy, Transaksi pulsa, paket data, bayar tagihan, dan lainnya jadi gampang pake banget
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Stack>
                <Row className={styles.rowtwocard}>
                    <Col lg={3} sm={5} className={styles.toMid}>
                        <Card className={styles.card}>
                            <Card.Img variant="top" src={require("../../assets/icons/antiadmin.png")} style={{
                                width: "35%",
                                height: "auto",
                            }} />
                            <Card.Body>
                                <Card.Title>Anti Admin Club</Card.Title>
                                <Card.Text>
                                    Gak ada biaya tambahan buat kamu yang lagi bayar tagihan.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={3} sm={5} className={styles.toMid}>
                        <Card className={styles.card}>
                            <Card.Img variant="top" src={require("../../assets/icons/selfreward.png")} style={{
                                width: "35%",
                                height: "auto",
                            }} />
                            <Card.Body>
                                <Card.Title>Self Reward</Card.Title>
                                <Card.Text>
                                    Nikmatin Reward dan Voucher harta karun dari kita yang haqiqi tanpa ada bayaran apapun
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Service