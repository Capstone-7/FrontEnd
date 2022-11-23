import React from 'react'
import Mocup from "../../assets/images/Mocup.png"
import styles from '../../assets/styles/AboutApp.module.css'

const AboutApp = () => {
  return (
    <>
      <div className="container py-5">
        <div className="row mb-5">
          <div className="col-md-6 mt-5 d-flex justify-content-center">
              <p className={styles.Content}><span className={styles.SecondaryContent}>PayOll</span> adalah aplikasi yang dapat mempermudah kamu dalam melakukan transaksi dan pembayaran PPOB secara online. Gaperlu risau bayar tagihan karna terbatas jarak dan waktu, dengan PayOll kamu bisa melakukannya dimana pun dan kapan ajah semau kamu </p>
          </div>
          <div className="col-md-6 Mocup-Gradient">
            <div className="Mocup-gradient d-flex justify-content-center">
              <img src={Mocup} alt="Moc Up" className={styles.Mocup} />
            </div>
            <div className="d-flex justify-content-center">
              <button style={{backgroundColor: "#396EB0", color: "#EBF1F7", borderColor: "#396EB0"}} className={styles.buttonMore}>Lihat Lainnya</button>
            </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default AboutApp