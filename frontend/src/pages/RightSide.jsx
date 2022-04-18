import React from "react";
import { useSelector } from "react-redux";
import FriendHint from "../components/RightSide/FriendHint";

import "../styles_pages/rightSide.css";

const RightSide = () => {
  const userAuth = useSelector((state) => state.userAuth);
  const suggestionFriend = useSelector((state) => state.suggestionFriend);

  // suggestionFriend.sort(() => 0.5 - Math.random());

  return (
    <div className="right-side">
      <h1>Suggestion d'amis</h1>

      <div className="friend-suggestion-container">
        {suggestionFriend &&
          suggestionFriend.map((idUser) => {
            if (
              userAuth.friends &&
              userAuth.notifsFriends &&
              !userAuth.friends.includes(idUser) &&
              !userAuth.notifsFriends.includes(idUser)
            )
              return <FriendHint key={idUser} idUser={idUser} />;
            else {
              return null;
            }
          })}
      </div>
    </div>
  );
};

export default RightSide;
