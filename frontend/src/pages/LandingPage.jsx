import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Footer from "../components/Footer";

function LandingPage() {
  return (
    <div className="">
      <Navbar />
      <Hero />
      <About />
      <Services /> 
      <Footer />
    </div>
  );
}

export default LandingPage;
