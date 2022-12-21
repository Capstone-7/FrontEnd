import React, { useEffect } from "react";
import styles from "../../assets/styles/ProductListContent.module.css";
import btnDownload from "../../assets/images/btn_download.png";
import Aos from "aos";
const ProductListContent = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <>
      <div className={styles.BackgroundProduct}>
        <div className="container d-flex justify-content-center align-items-end h-100 w-100">
          <div className="row" data-aos="fade-up">
            <div
              className={`my-4 ${styles.deskripsi}`}
              style={{ color: "white", width: "20%" }}
            >
              <h1 className={styles.Content}>
                Rasakan kemudahan dalam menuntaskan
                <span className={styles.BebanTagihan}> Beban Tagihan</span>{" "}
                dengan satu aplikasi
              </h1>
              <hr className={styles.hrModel} />
              <p className={styles.SecondaryDeskripsi}>
                Bersama PayOll, hempaskan tagihan dalam satu menit.
              </p>
              <img
                src={btnDownload}
                alt="Google Play"
                className={styles.btnDownload}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductListContent;
