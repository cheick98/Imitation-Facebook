import axios from "axios";
import React, { useState } from "react";
import "../styles_pages/signup.css";

const SignUpForm = () => {
  const data = {
    pseudo: "",
    nom: "",
    prenom: "",
    email: "",
    password: "",
    password_confirm: "",
  };

  const [signupData, setSignupData] = useState(data);
  const { pseudo, nom, prenom, email, password, password_confirm } = signupData;

  const handleChange = (e) => {
    setSignupData({ ...signupData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === password_confirm) {
      axios
        .post("/api/user/signup", { pseudo, nom, prenom, email, password })
        .then((res) => {
          console.log(res.data);
          alert(
            "Inscription reussi avec succès. Veuillez vous connecter maintenant !"
          );
          window.location = "/";
        })
        .catch((error) => {
          alert(error.response.data);
        });
    } else {
      alert("Attention les deux mots de passes ne sont pas les memes !");
    }
  };

  return (
    <div className="singup">
      <h1>Créez un compte</h1>

      <form action="" onSubmit={handleSubmit}>
        <div className="pseudo">
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            placeholder="Pseudo..."
            onChange={handleChange}
          />
        </div>
        <div className="nom-prenom">
          <input
            type="text"
            name="nom"
            id="nom"
            placeholder="Nom..."
            onChange={handleChange}
          />
          <input
            type="text"
            name="prenom"
            id="prenom"
            placeholder="Prénom..."
            onChange={handleChange}
          />
        </div>
        <div className="email">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email..."
            onChange={handleChange}
          />
        </div>
        <div className="password-passwordConfirm">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Mot de passe..."
            onChange={handleChange}
          />
          <input
            type="password"
            name="password_confirm"
            id="password_confirm"
            placeholder="confirmation du mot de passe..."
            onChange={handleChange}
          />
        </div>

        <div className="inscrire">
          <input type="submit" value="S'inscrire" />
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
