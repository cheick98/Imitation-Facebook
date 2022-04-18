import React from "react";
import { format } from "timeago.js";
import { Link, useParams } from "react-router-dom";

const FriendDiscution = ({ user, discussionId, timestamp }) => {
  const friendDiscussionId = useParams().discussionId;

  return (
    <Link
      to={`/discussion/${discussionId}`}
      style={{ textDecoration: "none", color: "#767778" }}
      className={
        friendDiscussionId === discussionId
          ? "friend-discution selected"
          : "friend-discution"
      }
    >
      <img src={user.picture} alt="friend-pic" />
      <div className="friend-name-message">
        <span className="pseudo"> {user.pseudo} </span>
        <p>
          {/* <span> ok c'est bien </span> . <span>2h</span> <span>2</span> */}
          <span> {format(timestamp)} </span>
        </p>
      </div>
    </Link>
  );
};

export default FriendDiscution;
