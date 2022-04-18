import React from "react";
import { Link } from "react-router-dom";

const LeftSide = () => {
  return (
    <div className="left-side-nav">
      <Link to="/">
        <i className="fab fa-facebook"></i>
      </Link>
      <div className="search-icon">
        <i className="fas fa-search"></i>
        <input type="text" placeholder="Search a friend ..." />
      </div>
    </div>
  );
};

export default LeftSide;
