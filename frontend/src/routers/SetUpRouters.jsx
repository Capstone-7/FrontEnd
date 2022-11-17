import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'

const SetUpRouters = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage />} >

            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default SetUpRouters