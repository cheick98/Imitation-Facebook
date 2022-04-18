import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UidContext } from "../../context/UidContext";
import {
  editUserInfoBgPicture,
  editUserInfoPicture,
} from "../../redux/actions/user.action";

const BgImgUserImg = () => {
  const dispatch = useDispatch();

  const uid = useContext(UidContext);
  const user = useSelector((state) => state.user);

  const [fileBgImg, setFileBgImg] = useState();
  const [fileUserPic, setFileUserPic] = useState();

  const changeUserPicture = () => {
    const data = new FormData();
    data.append("userId", uid);
    data.append("uid", uid);
    data.append("file", fileUserPic);

    dispatch(editUserInfoPicture(data));
    alert("Votre photo de profile a bien été mis à jour !");
    window.location = `/profil/${uid}`;
  };

  const changeUserBgImage = () => {
    const data = new FormData();
    data.append("userId", uid);
    data.append("uid", uid);
    data.append("file", fileBgImg);

    dispatch(editUserInfoBgPicture(data));
    alert("Votre photo d'arriere plan a bien été mis à jour !");
    window.location = `/profil/${uid}`;
  };

  return (
    <div className="user-pic-bg-img">
      <div className="bg-img">
        <input
          type="file"
          name="file"
          id="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => setFileBgImg(e.target.files[0])}
        />
        <a href={user.backgroundImg} target="_blank" rel="noonpener noreferrer">
          <img src={user.backgroundImg} alt="bg-img" />
        </a>

        {uid === user._id &&
          (!fileBgImg ? (
            <label htmlFor="file" className="bg-label">
              <i className="fas fa-camera"></i>
              <span>Ajouter une photo de couverture</span>
            </label>
          ) : (
            <span className="valid-abort-bg-picture">
              <i className="fas fa-check valid" onClick={changeUserBgImage}></i>
              <i
                className="fas fa-times abort"
                onClick={() => (window.location = `/profil/${uid}`)}
              ></i>
            </span>
          ))}
      </div>

      <div className="img-profil-container">
        <a href={user.picture} target="_blank" rel="noonpener noreferrer">
          <img src={user.picture} alt="user-pic" />
        </a>
      </div>

      <div className="icon-user-pict">
        <input
          type="file"
          name="file"
          id="user-profil"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => setFileUserPic(e.target.files[0])}
        />
        {uid === user._id &&
          (!fileUserPic ? (
            <label htmlFor="user-profil">
              <i className="fas fa-camera"></i>
            </label>
          ) : (
            <span className="valid-abort-bg-picture">
              <i className="fas fa-check valid" onClick={changeUserPicture}></i>
              <i
                className="fas fa-times abort"
                onClick={() => (window.location = `/profil/${uid}`)}
              ></i>
            </span>
          ))}
      </div>

      <p>
        {user.nom} {user.prenom}
      </p>
    </div>
  );
};

export default BgImgUserImg;
