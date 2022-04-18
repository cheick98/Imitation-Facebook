import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { UidContext } from "../../../context/UidContext";

const CenterHeader = () => {
  const uid = useContext(UidContext);
  const friendDiscussionId = useParams().discussionId;

  const allUsers = useSelector((state) => state.allUsers);
  const myFriendDiscussion = useSelector((state) => state.myFriendDiscussion);

  const friendId = [];
  myFriendDiscussion.forEach((friendDiscussion) => {
    if (friendDiscussion._id === friendDiscussionId) {
      if (friendDiscussion.friendOneId === uid) {
        friendId.push(friendDiscussion.friendTwoId);
      }
      if (friendDiscussion.friendTwoId === uid) {
        friendId.push(friendDiscussion.friendOneId);
      }
    }
  });

  return (
    <div className="center-header">
      {allUsers &&
        allUsers.map((user) => {
          return friendId.map((id) => {
            if (user._id === id) {
              return (
                <React.Fragment key={id}>
                  <Link to={`/profil/${id}`} className="img-name">
                    <img src={user.picture} alt="friend-pic" />
                    <span> {user.pseudo} </span>
                  </Link>
                  <i className="fas fa-bars"></i>
                </React.Fragment>
              );
            } else return null;
          });
        })}
    </div>
  );
};

export default CenterHeader;
