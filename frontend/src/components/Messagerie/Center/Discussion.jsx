import React from "react";
import { useSelector } from "react-redux";
import { format } from "timeago.js";

const Discussion = ({ own, disc }) => {
  const allUsers = useSelector((state) => state.allUsers);

  return (
    <div className={own ? "discussion own" : "discussion"}>
      {allUsers.map((user) => {
        if (user._id === disc.senderId) {
          return (
            <React.Fragment key={disc.senderId}>
              {!own && <img src={user.picture} alt="friend-pic" />}
              <div className="mes-times">
                <p>{disc.message}</p>
                <span> {format(disc.createdAt)} </span>
              </div>
            </React.Fragment>
          );
        } else return null;
      })}
    </div>
  );
};

export default Discussion;
