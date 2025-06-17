import React from "react";
import Navbar from "./Navbar";
import Banner from "./Banner";
import SpecialOffer from "./SpecialOffer";
import AboutHome from "./AboutHome/AboutHome";
import OutHomeMenu from "./OutHomeMenu/OutHomeMenu";

const Home = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <SpecialOffer />
      <AboutHome />
      <OutHomeMenu />
    </>
  );
};

export default Home;
