import React, { useState } from "react";
import axios from "axios";

import "../styles_pages/login.css";

const LoginForm = () => {
  const data = { email: "", password: "" };

  const [loginData, setLoginData] = useState(data);
  const { email, password } = loginData;

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Veuillez renseigner les deux champs");
    } else {
      axios
        .post("/api/user/login", loginData)
        .then(() => {
          window.location = "/";
        })
        .catch((error) => {
          alert(error.response.data.error);
        });
    }
  };

  return (
    <div className="login">
      <h1>Veuillez entrer vos coordonnées</h1>

      <form action="" onSubmit={handleLogin}>
        <div className="email">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email..."
            onChange={handleChange}
          />
          <br />
          <span className="email error"></span>
        </div>
        <div className="password">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Mot de passe..."
            onChange={handleChange}
          />
          <br />
          <span className="email error"></span>
        </div>

        <div className="connexion">
          <input type="submit" value="Se connecter" />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
