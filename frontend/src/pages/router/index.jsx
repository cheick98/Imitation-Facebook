import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "../Navbar";
import Home from "../Home";
import Profil from "../Profil";
import Messagerie from "../Messagerie";
import Notification from "../Notification";
import { UidContext } from "../../context/UidContext";

const Routers = () => {
  const uid = useContext(UidContext);

  return (
    <Router>
      {uid && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profil/:id" element={<Profil />} />
        <Route path="/messagerie" element={<Messagerie />} />
        <Route path="/discussion/:discussionId" element={<Messagerie />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default Routers;
