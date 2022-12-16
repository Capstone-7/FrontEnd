import React from 'react'

import Carousel from 'react-bootstrap/Carousel';
import Stack from 'react-bootstrap/Stack';
import styles from '../../assets/styles/ProductListCategory.module.css'
// import './ProductListCategory.css'

import img1 from '../../assets/images/Slide1.png'
import img2 from '../../assets/images/Slide2.png'
import img3 from '../../assets/images/Slide3.png'


const ProductListCategory = () => {
  
  return (
    <>
      <Carousel className={styles.CarouselProductList}>
        <Carousel.Item interval={1000} className={styles.CarouselItemProduct}>
          <img
            className="d-block w-100"
            src={img1}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={500} className={styles.CarouselItemProduct}>
          <img
            className="d-block w-100"
            src={img2}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item className={styles.CarouselItemProduct}>
          <img
            className="d-block w-100"
            src={img3}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </>
  )
}

export default ProductListCategory