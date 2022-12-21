import React, { useEffect } from "react";
import Mocup from "../../assets/images/Mocup.png";
import styles from "../../assets/styles/AboutApp.module.css";
import Aos from "aos";
const AboutApp = () => {
  useEffect(() => {
    Aos.init({ duration: 2500 });
  }, []);
  return (
    <>
      <section id="about" className={styles.about}>
        <div className="container py-5 my-5">
          <div className="row mb-3">
            <div
              className="col-md-6 mt-5 d-flex justify-content-center"
              data-aos="fade-right"
            >
              <p className={styles.Content}>
                <span className={styles.SecondaryContent}>PayOll</span> adalah
                aplikasi yang dapat mempermudah kamu dalam melakukan transaksi
                dan pembayaran PPOB secara online. Gaperlu risau bayar tagihan
                karna terbatas jarak dan waktu, dengan PayOll kamu bisa
                melakukannya dimana pun dan kapan ajah semau kamu{" "}
              </p>
            </div>
            <div className="col-md-6 Mocup-Gradient" data-aos="fade-up">
              <div
                className="Mocup-gradient d-flex justify-content-center"
                data-aos-anchor-placement="top-bottom"
              >
                <img src={Mocup} alt="Moc Up" className={styles.Mocup} />
              </div>
              <div className="d-flex justify-content-center">
                <button
                  style={{
                    backgroundColor: "#396EB0",
                    color: "#EBF1F7",
                    borderColor: "#396EB0",
                  }}
                  className={styles.buttonMore}
                >
                  Lihat Lainnya
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutApp;
