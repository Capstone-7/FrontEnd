import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import LoginPage from '../pages/LoginPage'
import PageProduct from '../pages/PageProduct'


const SetUpRouters = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/productlist" element={<PageProduct />} />
        <Route path="/admin/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default SetUpRouters;