import React, { useState } from "react";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";

const Navigation = ({user, logOut}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Navbar toggle={toggle} user={user} logOut={logOut} />
      <Sidebar isOpen={isOpen} toggle={toggle} user={user} logOut={logOut}/>
    </>
  );
};

export default Navigation;
