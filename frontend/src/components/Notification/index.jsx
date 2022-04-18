import React from "react";
import { useSelector } from "react-redux";
import Invitation from "./Invitation";

const CenterNotification = () => {
  const userAuth = useSelector((state) => state.userAuth);

  return (
    <div className="center-side">
      {userAuth.notifsFriends &&
        (userAuth.notifsFriends.length !== 0 ? (
          userAuth.notifsFriends.map((idUser) => {
            return <Invitation key={idUser} idUser={idUser} />;
          })
        ) : (
          <p className="noNotif">
            Vous n'avez aucune invitation pour le moment.
          </p>
        ))}
    </div>
  );
};

export default CenterNotification;
