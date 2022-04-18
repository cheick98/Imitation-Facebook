import React, { useContext, useEffect } from "react";
import CenterProfil from "../components/Profil";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import "../styles_pages/profil.css";
import { getUser } from "../redux/actions/user.action";
import { UidContext } from "../context/UidContext";
import NotConnected from "./NotConnected";

const Profil = () => {
  const uid = useContext(UidContext);
  const idUser = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(idUser.id));
  }, [idUser, dispatch]);

  return (
    <div className="body-profil">
      {uid ? (
        <>
          <LeftSide />
          <CenterProfil />
          <RightSide />
        </>
      ) : (
        <NotConnected />
      )}
    </div>
  );
};

export default Profil;
