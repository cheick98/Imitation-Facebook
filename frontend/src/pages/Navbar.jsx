import React from "react";
import CenterNav from "../components/Navbar/CenterNav";
import LeftNav from "../components/Navbar/LeftNav";
import RightNav from "../components/Navbar/RightNav";
import "../styles_pages/navbar.css";

const Navbar = () => {
  return (
    <nav>
      <LeftNav />
      <CenterNav />
      <RightNav />
    </nav>
  );
};

export default Navbar;
