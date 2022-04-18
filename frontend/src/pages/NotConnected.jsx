import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const NotConnected = () => {
  const [login, setLogin] = useState(true);
  const [signup, setSignup] = useState(false);

  return (
    <div className="signupLogin">
      <ul>
        <li>
          <button
            className={signup ? "active" : ""}
            onClick={() => {
              setSignup(true);
              setLogin(false);
            }}
          >
            Inscription
          </button>
        </li>
        <li>
          <button
            className={login ? "active" : ""}
            onClick={() => {
              setSignup(false);
              setLogin(true);
            }}
          >
            Connection
          </button>
        </li>
      </ul>

      {signup && <SignUpForm />}
      {login && <LoginForm />}
    </div>
  );
};

export default NotConnected;
