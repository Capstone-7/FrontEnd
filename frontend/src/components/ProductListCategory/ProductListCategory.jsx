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
    {/* <Stack className={styles.Item}> */}
      <Carousel className={styles.CarouselProductList}>
        <Carousel.Item interval={1000} className={styles.CarouselItemProduct}>
          <img
            className="d-block w-100"
            src={img1}
            alt="First slide"
          />
          <Carousel.Caption>
            {/* <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500} className={styles.CarouselItemProduct}>
          <img
            className="d-block w-100"
            src={img2}
            alt="Second slide"
          />
          <Carousel.Caption>
            {/* <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className={styles.CarouselItemProduct}>
          <img
            className="d-block w-100"
            src={img3}
            alt="Third slide"
          />
          <Carousel.Caption>
            {/* <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p> */}
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    {/* </Stack> */}
    </>
  )
}

export default ProductListCategory