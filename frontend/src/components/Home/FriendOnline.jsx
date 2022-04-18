import React from "react";
import { Link } from "react-router-dom";

const FriendOnline = () => {
  return (
    <Link to="/profil/5" className="img-container">
      <img src="./user.jpg" alt="user-pic" />
    </Link>
  );
};

export default FriendOnline;
