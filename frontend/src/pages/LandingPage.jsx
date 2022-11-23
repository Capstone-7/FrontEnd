import React from 'react'
import Footer from '../components/Footer/Footer'
import Service from '../components/Service/Service'
import Navigation from '../components/Navigation/Navigation'
import AboutApp from '../components/AboutApp/AboutApp'


const LandingPage = () => {
  return (
    <div>
      <Navigation />
      <AboutApp />
      <Service />
      <Footer />
    </div>
  )
}

export default LandingPage
