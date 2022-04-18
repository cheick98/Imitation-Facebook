import React from "react";

const HeaderLeft = () => {
  return (
    <div className="left-header">
      <p>Discussions</p>
      <div className="search">
        <input type="text" placeholder="Rechercher dans messagerie ..." />
        <i className="fas fa-search"></i>
      </div>
    </div>
  );
};

export default HeaderLeft;
