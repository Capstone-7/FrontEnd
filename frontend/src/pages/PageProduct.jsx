import React from 'react'
import Navigation from '../components/Navigation/Navigation'
import ProductListContent from '../components/ProductListContent/ProductListContent'
import ProductListCategory from '../components/ProductListCategory/ProductListCategory'
import ProductListReward from '../components/ProductListReward/ProductListReward'
import Footer from '../components/Footer/Footer'

const PageProduct = () => {
  return (
    <>
      <Navigation />
      <ProductListContent />
      <ProductListCategory />
      <ProductListReward />
      <Footer />
    </>
  )
}

export default PageProduct