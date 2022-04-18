import React, { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { UidContext } from "../../context/UidContext";
import { commentPost, getAllPosts } from "../../redux/actions/post.action";

const DoComment = ({ postId }) => {
  const uid = useContext(UidContext);

  const userAuth = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");

  const handleCommentPost = (e) => {
    e.preventDefault();

    if (comment) {
      dispatch(commentPost(postId, { uid, commenterId: uid, text: comment }));
      dispatch(getAllPosts());
      setComment("");
    } else {
      alert(
        "Veuillez ecrire un commentaire avant de d'appuyer sur la touche entrée !"
      );
    }
  };

  return (
    <div className="do-comment">
      <Link to={`/profil/${uid}`} className="img-container">
        <img src={userAuth.picture} alt="user-pic" />
      </Link>
      <form action="#" onSubmit={handleCommentPost}>
        <input
          type="text"
          placeholder="Ecriver un commentaire..."
          name="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <span>Appuyez sur Entrée pour publier votre commentaire.</span>
      </form>
    </div>
  );
};

export default DoComment;
