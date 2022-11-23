import React from "react";
 
import styles from "../../assets/styles/ProductListContent.module.css";
import btnDownload from "../../assets/images/btn_download.png";
 
const ProductListContent = () => {
  return (
    <>
      <div className={styles.BackgroundProduct}>
        <div className="container d-flex justify-content-center align-items-end h-100 w-100">
          <div className="row">
            <div
              className={`my-4 ${styles.deskripsi}`}
              style={{ color: "white", 
                       width: '20%' }}
            >
              <h1 className={styles.Content}>
                Rasakan kemudahan dalam menuntaskan
                <span style={{ color: "#F9A702" }}> Beban Tagihan</span> dengan
                satu aplikasi
              </h1>
              <hr className={styles.hrModel} />
              <p className={styles.SecondaryDeskripsi}>Bersama PayOll, hempaskan tagihan dalam satu menit.</p>
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