import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UidContext } from "../../context/UidContext";
import {
  deletePost,
  dislikePost,
  editPostMsg,
  likePost,
} from "../../redux/actions/post.action";
import CommentPostCard from "./CommentPostCard";

const PostCard = ({ post }) => {
  const uid = useContext(UidContext);
  const allUsers = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

  const [seeComment, setSeeComment] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const [editMsgPost, setEditMsgPost] = useState("");

  const handleDeletePost = (postId) => {
    if (window.confirm("Voulez-vous vraiment supprimer le post ?")) {
      dispatch(deletePost(postId, { uid }));
    }
  };

  const handleEditPostMsg = (postId) => {
    if (editMsgPost) {
      dispatch(editPostMsg(postId, { uid, message: editMsgPost }));
      setEditPost(false);
    }
  };

  const handleLikePost = (postId) => {
    dispatch(likePost(postId, { uid, userId: uid }));
  };

  const handleDisLikePost = (postId) => {
    dispatch(dislikePost(postId, { uid, userId: uid }));
  };

  return (
    <div className="card">
      {allUsers.map((user) => {
        if (user._id === post.posterId) {
          return (
            <React.Fragment key={user._id}>
              {/* card header */}
              <div className="card-header">
                {/* image with the user name */}
                <div className="img-name">
                  <Link to={`/profil/${user._id}`} className="img">
                    <img src={user.picture} alt="user-pic" />
                  </Link>
                  <p>
                    {user.pseudo} <br />
                    <span> {new Date(post.createdAt).toLocaleString()} </span>
                  </p>
                </div>

                {/* the option menu*/}
                {uid === post.posterId && (
                  <div className="option-menu">
                    {!editPost ? (
                      <>
                        <i
                          className="fas fa-edit"
                          onClick={() => setEditPost(true)}
                        ></i>
                        <i
                          className="fas fa-trash"
                          onClick={() => handleDeletePost(post._id)}
                        ></i>
                      </>
                    ) : (
                      <>
                        <i
                          className="fas fa-check valid"
                          onClick={() => handleEditPostMsg(post._id)}
                        ></i>
                        <i
                          className="fas fa-times abort"
                          onClick={() => setEditPost(false)}
                        ></i>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* car body */}
              <div className="card-body">
                {/* post's text */}
                {!editPost ? (
                  post.message && <p>{post.message}</p>
                ) : (
                  <textarea
                    name="message"
                    id="message"
                    defaultValue={post.message}
                    onChange={(e) => setEditMsgPost(e.target.value)}
                  />
                )}
                {/* image post */}
                <div className="img-container">
                  {post.picture && (
                    <a
                      href={post.picture}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <img src={post.picture} alt="post-pic" />
                    </a>
                  )}
                </div>
                <hr />
              </div>

              {/* card footer */}
              <div className="card-footer">
                <div className="like-comment-share">
                  {post.likers && post.likers.includes(uid) ? (
                    <div
                      className="like"
                      onClick={() => handleDisLikePost(post._id)}
                    >
                      <i
                        className="far fa-thumbs-up"
                        style={{ color: "#1B74E4" }}
                      ></i>
                      <span>
                        {post.likers.length !== 0 && post.likers.length} Like
                      </span>
                    </div>
                  ) : (
                    <div
                      className="like"
                      onClick={() => handleLikePost(post._id)}
                    >
                      <i className="far fa-thumbs-up"></i>
                      <span>
                        {post.likers.length !== 0 && post.likers.length} Like
                      </span>
                    </div>
                  )}
                  <div
                    className="comment"
                    onClick={() => setSeeComment(!seeComment)}
                  >
                    <i className="far fa-comment-alt"></i>
                    <span>
                      {post.comments.length !== 0 && post.comments.length}
                      Commenter
                    </span>
                  </div>
                  <div className="share">
                    <i className="fas fa-share"></i>
                    <span>Partager</span>
                  </div>
                </div>
                <hr />

                {seeComment && <CommentPostCard post={post} />}
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

export default PostCard;
