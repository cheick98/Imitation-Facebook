import React, { useContext } from "react";
import CenterNotification from "../components/Notification";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

import { UidContext } from "../context/UidContext";
import NotConnected from "./NotConnected";

import "../styles_pages/notification.css";

const Notification = () => {
  const uid = useContext(UidContext);

  return (
    <div className="body-notification">
      {uid ? (
        <>
          <LeftSide />
          <CenterNotification />
          <RightSide />
        </>
      ) : (
        <NotConnected />
      )}
    </div>
  );
};

export default Notification;
