import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UidContext } from "../../context/UidContext";
import {
  createPostNoIng,
  createPostWithIng,
} from "../../redux/actions/post.action";

const ForDoApost = () => {
  const uid = useContext(UidContext);
  const userAuth = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();

  const [textPost, setTextPost] = useState("");
  const [postImg, setPostImg] = useState();
  const [previewPostImg, setPreviewPostImg] = useState("");

  const handlePostPicture = (e) => {
    setPreviewPostImg(URL.createObjectURL(e.target.files[0]));
    setPostImg(e.target.files[0]);
  };

  const handleAbortPost = () => {
    setTextPost("");
    setPostImg();
    setPreviewPostImg("");
  };

  const handlePost = () => {
    if (textPost || postImg) {
      if (!postImg) {
        dispatch(createPostNoIng({ uid, posterId: uid, message: textPost }));

        handleAbortPost();
      }

      if (postImg) {
        let data = new FormData();
        data.append("uid", uid);
        data.append("posterId", uid);
        if (textPost) data.append("message", textPost);
        data.append("file", postImg);

        dispatch(createPostWithIng(data));

        handleAbortPost();
      }
    } else {
      alert("Veuiller ecrire un text ou choisir une image");
    }
  };

  return (
    <div className="post">
      <div className="poster">
        <Link to={`/profil/${uid}`} className="image">
          <img src={userAuth.picture} alt="user-pic" />
        </Link>
        <textarea
          name="text"
          id="text"
          placeholder="Quoi de neuf..."
          value={textPost}
          onChange={(e) => setTextPost(e.target.value)}
        />
      </div>
      <hr />
      {previewPostImg && (
        <div className="preview">
          <img src={previewPostImg} alt="preview-img" />
          <i className="fas fa-times" onClick={() => setPreviewPostImg("")}></i>
        </div>
      )}
      <div className="do-post">
        <div className="image-post">
          <input
            type="file"
            name="file"
            id="file"
            accept=".jpg, .jpeg, .png"
            onChange={handlePostPicture}
          />
          <label htmlFor="file">
            <i className="fas fa-image"></i>
          </label>
        </div>
        <div className="text">
          <button onClick={handleAbortPost}>Annuler Post</button>
          <button onClick={handlePost}>Poster</button>
        </div>
      </div>
    </div>
  );
};

export default ForDoApost;
