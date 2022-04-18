import React, { Fragment, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UidContext } from "../../context/UidContext";
import {
  acceptInvitation,
  refuseInvitation,
} from "../../redux/actions/userAuth.action";

const Invitation = ({ idUser }) => {
  const uid = useContext(UidContext);
  const allUsers = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

  const handleAcceptInvitation = (idUser) => {
    dispatch(acceptInvitation(uid, { uid, invitId: idUser }));
    alert("Vous avez accepté l'invitation !");
  };

  const handleRefuseInvitation = (idUser) => {
    if (window.confirm("Voulez vous vraiment refuser cette invitation !")) {
      dispatch(refuseInvitation(uid, { uid, invitId: idUser }));
    }
  };

  return (
    <div className="invitation">
      {allUsers &&
        allUsers.map((user) => {
          if (user._id === idUser) {
            return (
              <Fragment key={idUser}>
                <Link
                  to={`/profil/${idUser}`}
                  className="img-text"
                  style={{ textDecoration: "none" }}
                >
                  <div className="img-container">
                    <img src={user.picture} alt="user-pic" />
                  </div>
                  <span>{user.pseudo}</span>
                </Link>

                <span className="invit">vous a envoyé une invitation</span>

                <div className="accept-refuse-invitation">
                  <i
                    className="fas fa-check"
                    onClick={() => handleAcceptInvitation(idUser)}
                  ></i>
                  <i
                    className="fas fa-times"
                    onClick={() => handleRefuseInvitation(idUser)}
                  ></i>
                </div>
              </Fragment>
            );
          } else {
            return null;
          }
        })}
    </div>
  );
};

export default Invitation;
