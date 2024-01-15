import React from "react";
import { useState } from "react";
import Navbar from "../components/Navigation/Navbar/Navbar";
import Sidebar from "../components/Navigation/Sidebar/Sidebar";
import Hero from "../components/Hero/Hero";

const Home = () => {
  // const [isOpen, setIsOpen] = useState(false);

  // const toggle = () => {
  //   setIsOpen(!isOpen);
  // };

  // console.log("Home user:", user); // Provjerite je li user definiran

  return (
    <>
      {/* <Navbar toggle={toggle} />
      <Sidebar isOpen={isOpen} toggle={toggle} /> */}
      <Hero />
    </>
  );
};

export default Home;
