import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UidContext } from "../../context/UidContext";
import {
  createNewFriendDiscussion,
  getMyFriendDiscussion,
} from "../../redux/actions/friendDiscussion.action";
import { deleteFriend } from "../../redux/actions/user.action";
import { deleteFriendUserAuth } from "../../redux/actions/userAuth.action";

const Friends = ({ user }) => {
  const uid = useContext(UidContext);
  const userAuth = useSelector((state) => state.userAuth);
  const myFriendDiscussion = useSelector((state) => state.myFriendDiscussion);
  const dispatch = useDispatch();

  const userAuthFriend = userAuth.friends;

  const idUser = useParams().id;
  const redirection = useNavigate();

  // sorted by decroissant order
  const myFriendDiscussionSorted = myFriendDiscussion.sort(
    (a, b) => b.timestamp - a.timestamp
  );
  // for get my friend id in my friends discussion sorted
  const myFriendDiscussionIdFriendId = [];
  const myFriendIdWichIDiscut = [];
  myFriendDiscussionSorted.forEach((friendDiscussion) => {
    if (friendDiscussion.friendOneId !== uid) {
      myFriendDiscussionIdFriendId.push({
        friendId: friendDiscussion.friendOneId,
        friendDiscussionId: friendDiscussion._id,
        timestamp: friendDiscussion.timestamp,
      });
      myFriendIdWichIDiscut.push(friendDiscussion.friendOneId);
    }

    if (friendDiscussion.friendTwoId !== uid) {
      myFriendDiscussionIdFriendId.push({
        friendId: friendDiscussion.friendTwoId,
        friendDiscussionId: friendDiscussion._id,
        timestamp: friendDiscussion.timestamp,
      });
    }
    myFriendIdWichIDiscut.push(friendDiscussion.friendTwoId);
  });

  const createDiscussionWithFriend = (userId) => {
    let i = 1;

    if (myFriendDiscussionIdFriendId.length !== 0) {
      myFriendDiscussionIdFriendId.forEach((fIdDid) => {
        if (myFriendIdWichIDiscut?.includes(userId)) {
          if (fIdDid.friendId === userId)
            redirection(`/discussion/${fIdDid.friendDiscussionId}`);
        } else {
          if (i === 1) {
            dispatch(
              createNewFriendDiscussion({
                uid,
                friendOneId: uid,
                friendTwoId: userId,
                timestamp: new Date().getTime(),
              })
            );

            i++;
            redirection(`/messagerie`);
          }
        }
      });
    } else {
      dispatch(
        createNewFriendDiscussion({
          uid,
          friendOneId: uid,
          friendTwoId: userId,
          timestamp: new Date().getTime(),
        })
      );

      redirection(`/messagerie`);
    }
  };

  const handleDeleteFriend = (invitId) => {
    if (
      window.confirm(
        "Voulez-vous vraiment retiré " + user.pseudo + " de vos amis ?"
      )
    ) {
      dispatch(deleteFriend(uid, { uid, invitId: invitId }));
      dispatch(deleteFriendUserAuth(uid, { uid, invitId: invitId }));
    }
  };

  useEffect(() => {
    uid && dispatch(getMyFriendDiscussion(uid));
  }, [uid, dispatch]);

  return (
    <div className="friends">
      <Link to={`/profil/${user._id}`} className="img-text">
        <div className="friend-img-container">
          <img src={user.picture} alt="friend-pic" />
        </div>
        <span> {user.pseudo} </span>
      </Link>
      <span>
        {userAuthFriend?.includes(user._id) && (
          <i
            className="fas fa-comment-alt"
            onClick={() => createDiscussionWithFriend(user._id)}
          ></i>
        )}

        {uid && uid === idUser && (
          <i
            className="fas fa-trash"
            onClick={() => handleDeleteFriend(user._id)}
          ></i>
        )}
      </span>
    </div>
  );
};

export default Friends;
