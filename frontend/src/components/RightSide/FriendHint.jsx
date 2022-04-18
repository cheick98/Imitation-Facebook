import React, { Fragment, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UidContext } from "../../context/UidContext";
import {
  sendInvitation,
  sendInvitationAbort,
} from "../../redux/actions/userAuth.action";

const FriendHint = ({ idUser }) => {
  const uid = useContext(UidContext);
  const userAuth = useSelector((state) => state.userAuth);
  const allUsers = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

  const handleSendInvitation = (invitId) => {
    dispatch(sendInvitation(uid, { uid, invitId: invitId }));
  };

  const handleSendInvitationAbort = (invitId) => {
    dispatch(sendInvitationAbort(uid, { uid, invitId: invitId }));
  };

  return (
    <div className="friend-suggestion">
      {allUsers &&
        allUsers.map((user) => {
          if (user._id === idUser) {
            return (
              <Fragment key={idUser}>
                <Link to={`/profil/${user._id}`} className="img-text-container">
                  <div className="img-container">
                    <img src={user.picture} alt="user-pic" />
                  </div>
                  <span> {user.pseudo} </span>
                </Link>
                {userAuth.sendInvitation &&
                !userAuth.sendInvitation.includes(user._id) ? (
                  <div
                    className="follow"
                    onClick={() => handleSendInvitation(user._id)}
                  >
                    <i className="fas fa-user-plus"></i>
                  </div>
                ) : (
                  <div
                    className="follow"
                    onClick={() => handleSendInvitationAbort(user._id)}
                  >
                    <i className="fas fa-times"></i>
                  </div>
                )}
              </Fragment>
            );
          } else {
            return null;
          }
        })}
    </div>
  );
};

export default FriendHint;
