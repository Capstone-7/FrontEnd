import React, { useEffect } from "react";

import styles from "../../assets/styles/MainContent.module.css";
import btnDownload from "../../assets/images/btn_download.png";
import Hero from "../../assets/images/hero.png";
import Aos from "aos";

const MainContent = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <>
      <div className={styles.BackgroundContent} data-aos="fade-down">
        <div className="container" styles={{ marginTop: "50%;" }}>
          <div className="row">
            <div
              className="col-md-6 d-flex flex-column justify-content-center"
              data-aos="fade-down"
            >
              <img src={Hero} className={styles.Hero} alt="Hero" />
            </div>
            <div className="col-md-6" data-aos="fade-left">
              <h1 className={styles.HeroText}>
                Si paling jadi pilihan buat nuntasin{" "}
                <span className={styles.SecondaryText}>Beban Tagihan</span> kamu
              </h1>
              <div className="d-flex justify-content-center">
                <img
                  src={btnDownload}
                  alt="Google Play"
                  className={styles.btnDownload}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainContent;
