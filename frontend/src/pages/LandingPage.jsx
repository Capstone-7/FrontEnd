import React from 'react'
import Navigation from '../components/Navigation/Navigation'
import AboutApp from '../components/AboutApp/AboutApp'
import MainContent from '../components/MainContent/MainContent'
import Footer from '../components/Footer/Footer'
import Service from '../components/Service/Service'

const LandingPage = () => {
  return (
    <div>
      <Navigation />
      <MainContent />
      <AboutApp />
      <Service />
      <Footer />
    </div>
  )
}

export default LandingPage
