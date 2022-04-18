import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UidContext } from "../../context/UidContext";
import { getAllUsers } from "../../redux/actions/allUsers.action";
import {
  editUserInfoBio,
  editUserInfoBirthDay,
  editUserInfoCountry,
  editUserInfoEmail,
  editUserInfoNom,
  editUserInfoPrenom,
  editUserInfoPseudo,
} from "../../redux/actions/user.action";

const AboutMe = () => {
  const uid = useContext(UidContext);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [editInfo, setEditInfo] = useState(false);

  const data = {
    pseudo: "",
    nom: "",
    prenom: "",
    birthDay: "",
    country: "",
    email: "",
    bio: "",
  };

  const [editInfoValue, setEditInfoValue] = useState(data);
  const { pseudo, nom, prenom, birthDay, country, email, bio } = editInfoValue;

  const handleChange = (e) => {
    setEditInfoValue({ ...editInfoValue, [e.target.id]: e.target.value });
  };

  const validEdit = () => {
    if (pseudo) {
      dispatch(editUserInfoPseudo(user._id, { uid, pseudo }));
      dispatch(getAllUsers());
    }
    if (nom) dispatch(editUserInfoNom(user._id, { uid, nom }));
    if (prenom) dispatch(editUserInfoPrenom(user._id, { uid, prenom }));
    if (email) dispatch(editUserInfoEmail(user._id, { uid, email }));
    if (birthDay) dispatch(editUserInfoBirthDay(user._id, { uid, birthDay }));
    if (country) dispatch(editUserInfoCountry(user._id, { uid, country }));
    if (bio) dispatch(editUserInfoBio(user._id, { uid, bio }));

    setEditInfo(false);
  };

  return (
    <div className="about">
      {editInfo === false ? (
        <>
          <div className="information">
            <span className="label">Pseudo</span>
            <div className="pseudo">
              <span> {user.pseudo} </span>
            </div>
            <span className="label">Nom Prénom</span>
            <div className="nom-prenom">
              <span> {user.nom} </span> <span> {user.prenom} </span>
            </div>
            <span className="label">Date de naissance</span>
            <div className="birthDay">
              <span> {user.birthDay} </span>
            </div>
            <span className="label">Pays</span>
            <div className="country">
              <span> {user.country} </span>
            </div>
            <span className="label">Email</span>
            <div className="email">
              <span> {user.email} </span>
            </div>
            {uid === user._id && (
              <div className="edit" onClick={() => setEditInfo(true)}>
                <span>Modifier</span>
                <i className="fas fa-edit"></i>
              </div>
            )}
          </div>

          <div className="bioInformation">
            <div
              style={{
                borderBottom: "1px solid #776266",
                color: "#776266",
                marginBottom: "10px",
              }}
            >
              Biographie
            </div>
            <span> {user.bio} </span>
          </div>
        </>
      ) : (
        <>
          <div className="information-edit">
            <span className="label">Pseudo</span>
            <div className="pseudo">
              <input
                type="text"
                name="pseudo"
                id="pseudo"
                defaultValue={user.pseudo}
                onChange={handleChange}
              />
            </div>
            <span className="label">Nom</span>
            <div className="nom">
              <input
                type="text"
                name="nom"
                id="nom"
                defaultValue={user.nom}
                onChange={handleChange}
              />
            </div>
            <span className="label">Prénom</span>
            <div className="prenom">
              <input
                type="text"
                name="prenom"
                id="prenom"
                defaultValue={user.prenom}
                onChange={handleChange}
              />
            </div>
            <span className="label">Date de naissance</span>
            <div className="birthDay">
              <input
                type="text"
                name="birthDay"
                id="birthDay"
                defaultValue={user.birthDay}
                placeholder="jj-mm-aaaa"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                onChange={handleChange}
              />
            </div>
            <span className="label">Pays</span>
            <div className="country">
              <input
                type="text"
                name="country"
                id="country"
                defaultValue={user.country}
                onChange={handleChange}
              />
            </div>
            <span className="label">Email</span>
            <div className="email">
              <input
                type="text"
                name="email"
                id="email"
                defaultValue={user.email}
                onChange={handleChange}
              />
            </div>
            <div className="valid-abort">
              <span onClick={validEdit}>Valider</span>
              <span onClick={() => setEditInfo(false)}>Annuler</span>
            </div>
          </div>

          <div className="bioEdit">
            <span className="label">Biographie</span>
            <textarea
              name="bio"
              id="bio"
              defaultValue={user.bio}
              onChange={handleChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AboutMe;
