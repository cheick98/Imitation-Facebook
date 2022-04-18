import React, { useState } from "react";

import { NavLink } from "react-router-dom";

const CenterNav = () => {
  const menu = {
    home: "",
    notification: "",
    messagerie: "",
  };
  const [actived, setActived] = useState({ ...menu, home: "active" });
  const { home, notification, messagerie } = actived;

  return (
    <ul className="center-side-nav">
      <li>
        <NavLink
          to="/"
          className="i-container"
          onClick={(isActive) => {
            isActive && setActived({ menu, home: "active" });
          }}
        >
          <i className={`fas fa-home ${home}`}></i>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/notification"
          className="i-container"
          onClick={(isActive) => {
            isActive && setActived({ menu, notification: "active" });
          }}
        >
          <i className={`fas fa-bell ${notification}`}></i>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/messagerie"
          className="i-container"
          onClick={(isActive) => {
            isActive && setActived({ menu, messagerie: "active" });
          }}
        >
          <i className={`fab fa-facebook-messenger ${messagerie}`}></i>
        </NavLink>
      </li>
    </ul>
  );
};

export default CenterNav;
