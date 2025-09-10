import React from 'react'
import Navbar from '../components/LandingPage/Navbar'
import Hero from '../components/LandingPage/Hero'
import Footer from '../components/LandingPage/Footer'
import CompaniesSection from "../components/LandingPage/companiesSection"
import FeatureHighlight from '../components/LandingPage/FeatureHighlights'
import ProjectPlan from '../components/LandingPage/projectplan'
import ProductivitySection from '../components/LandingPage/productivitySection'
import Features from '../components/LandingPage/feature'
import Testimonial from '../components/LandingPage/testimonial'




const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero/>
      <CompaniesSection/>
      <FeatureHighlight/>
      <Features/>
      <ProjectPlan/>
      <ProductivitySection/>
      <Testimonial/>
      <Footer/>
    </div>
  )
}

export default Home
