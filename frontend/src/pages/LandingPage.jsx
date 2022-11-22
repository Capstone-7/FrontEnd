import React from 'react'
import Navigation from '../components/Navigation/Navigation'
import AboutApp from '../components/AboutApp/AboutApp'
import MainContent from '../components/MainContent/MainContent'

const LandingPage = () => {
  return (
    <div>
      <Navigation />
      <MainContent />
      <AboutApp />
    </div>
  )
}

export default LandingPage
