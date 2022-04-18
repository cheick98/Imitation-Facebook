import React, { useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import CenterHome from "../components/Home";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

import "../styles_pages/home.css";
import "../styles_pages/homeLoginSignUp.css";
import NotConnected from "./NotConnected";
import { UidContext } from "../context/UidContext";

const Home = () => {
  const uid = useContext(UidContext);
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  }, []);

  // useEffect(() => {
  //   uid && socket.current.emit("addUser", uid);
  //   socket.current.on("getUsers", (users) => {
  //     console.log(users);
  //   });
  // }, [uid]);

  return (
    <div className="body-home">
      {uid ? (
        <>
          <LeftSide />
          <CenterHome />
          <RightSide />
        </>
      ) : (
        <NotConnected />
      )}
    </div>
  );
};

export default Home;
