import React from "react";
import Navbar from "./Navbar";
import Banner from "./Banner";
import SpecialOffer from "./SpecialOffer";
import AboutHome from "./AboutHome/AboutHome";
import OutHomeMenu from "./OutHomeMenu/OutHomeMenu";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <SpecialOffer />
      <AboutHome />
      <OutHomeMenu />
      <Footer/>
    </>
  );
};

export default Home;
