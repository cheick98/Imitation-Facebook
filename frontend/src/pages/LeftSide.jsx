import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "../styles_pages/leftSide.css";

const LeftSide = () => {
const userAuth = useSelector(state => state.userAuth)

  return (
    <div className="left-side">
      {/* user profil */}
      <Link
        to={`/profil/${userAuth._id}`}
        className="profil"
        style={{ textDecoration: "none" }}
      >
        <div className="user-pic">
          <img src={userAuth.picture} alt="user-pic" />
        </div>
        <span> {userAuth.pseudo} </span>
      </Link>
      {/* icon */}
      <div className="icons-text">
        <div className="icon-text">
          <i className="fas fa-user-friends"></i>
          <span>Amis</span>
        </div>
        <div className="icon-text">
          <i className="fas fa-bookmark"></i>
          <span>Enregistrements</span>
        </div>
        <div className="icon-text">
          <i className="fas fa-users"></i>
          <span>Groupes</span>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
