import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UidContext } from "../../context/UidContext";
import {
  deleteCommentPost,
  dislikeCommentPost,
  editCommentPost,
  likeCommentPost,
} from "../../redux/actions/post.action";

const SeeCommentPost = ({ comment, postId }) => {
  const uid = useContext(UidContext);
  const allUsers = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

  const [editComment, setEditComment] = useState(false);
  const [textCommentPostEdit, setTextCommentPostEdit] = useState("");

  const handleEditComment = (postId) => {
    if (textCommentPostEdit) {
      dispatch(
        editCommentPost(postId, {
          uid,
          commentId: comment._id,
          text: textCommentPostEdit,
        })
      );

      setEditComment(false);
    }
  };

  const handleDeleteCommentPost = (postId) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce commentaire !")) {
      dispatch(deleteCommentPost(postId, { uid, commentId: comment._id }));
    }
  };

  const handleLikeCommentPost = (postId) => {
    dispatch(
      likeCommentPost(postId, { uid, userId: uid, commentId: comment._id })
    );
  };

  const handleDislikeCommentPost = (postId) => {
    dispatch(
      dislikeCommentPost(postId, {
        uid,
        userId: uid,
        commentId: comment._id,
      })
    );
  };

  return (
    <div className="see-comment">
      {allUsers &&
        allUsers.map((user) => {
          if (user._id === comment.commenterId) {
            return (
              <React.Fragment key={comment._id}>
                {/* see a comment */}
                <div className="user-comment">
                  <div className="image">
                    <div className="img-container">
                      <Link to={`/profil/${comment.commenterId}`}>
                        <img src={user.picture} alt="user-pic" />
                      </Link>
                    </div>
                  </div>
                  <div className="user-name-comment">
                    <Link
                      to={`/profil/${comment.commenterId}`}
                      style={{ textDecoration: "none" }}
                    >
                      <p className="user-name"> {user.pseudo} </p>
                    </Link>
                    {!editComment ? (
                      <span>{comment.text}</span>
                    ) : (
                      <textarea
                        name="text"
                        id="text"
                        defaultValue={comment.text}
                        onChange={(e) => setTextCommentPostEdit(e.target.value)}
                      />
                    )}
                  </div>

                  {uid === comment.commenterId && (
                    <div className="icon-delete-edit">
                      {!editComment ? (
                        <>
                          <i
                            className="fas fa-edit"
                            onClick={() => setEditComment(true)}
                          ></i>
                          <i
                            className="fas fa-trash"
                            onClick={() => handleDeleteCommentPost(postId)}
                          ></i>
                        </>
                      ) : (
                        <>
                          <i
                            className="fas fa-check valid"
                            onClick={() => handleEditComment(postId)}
                          ></i>
                          <i
                            className="fas fa-times abort"
                            onClick={() => setEditComment(false)}
                          ></i>
                        </>
                      )}
                    </div>
                  )}
                </div>
                {/* like comment */}
                <div className="like-comment">
                  <p>
                    {comment.likers.includes(uid) ? (
                      <i
                        className="far fa-thumbs-up"
                        style={{ color: "#1B74E4" }}
                        onClick={() => handleDislikeCommentPost(postId)}
                      ></i>
                    ) : (
                      <i
                        className="far fa-thumbs-up"
                        onClick={() => handleLikeCommentPost(postId)}
                      ></i>
                    )}
                    <span> {comment.likers.length} </span>
                  </p>
                  <span>le {new Date(comment.timestamp).toLocaleString()}</span>
                </div>
              </React.Fragment>
            );
          } else {
            return null;
          }
        })}
    </div>
  );
};

export default SeeCommentPost;
