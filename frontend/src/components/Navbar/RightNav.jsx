import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import cookie from "js-cookie";
import { useSelector } from "react-redux";

const RightNav = () => {
  const userAuth = useSelector((state) => state.userAuth);

  const removeCookie = (key) => {
    cookie.remove(key, { expires: 1 });
  };

  const logout = () => {
    axios
      .get("/api/user/logout")
      .then(() => {
        removeCookie("jwt");
        window.location = "/";
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  return (
    <div className="right-side-nav">
      {/* User profil */}
      <Link
        to={`/profil/${userAuth._id}`}
        className="profil"
        style={{ textDecoration: "none" }}
      >
        <div className="user-pic">
          <img src={userAuth.picture} alt="" />
        </div>
        <span> {userAuth.pseudo} </span>
      </Link>
      {/* The options */}
      <div className="options">
        <button onClick={logout}>
          <i className="fas fa-sign-out-alt"></i>
        </button>
      </div>
    </div>
  );
};

export default RightNav;
