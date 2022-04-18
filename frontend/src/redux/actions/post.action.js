import axios from "axios";
import {
  COMMENT_POST,
  CREATE_POST_NO_IMG,
  CREATE_POST_WITH_IMG,
  DELETE_COMMEMNT_POST,
  DELETE_POST,
  DISLIKE_COMMENT_POST,
  DISLIKE_POST,
  EDIT_COMMEMNT_POST,
  EDIT_POST,
  GET_ALL_POSTS,
  LIKE_COMMENT_POST,
  LIKE_POST,
} from "../constants";

export const getAllPosts = () => {
  return (dispatch) => {
    axios
      .get("/api/post")
      .then((res) => {
        dispatch({ type: GET_ALL_POSTS, payload: res.data });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
};

export const createPostNoIng = (data) => {
  return (dispatch) => {
    axios
      .post("/api/post/post-no-img", data)
      .then((res) => {
        dispatch({ type: CREATE_POST_NO_IMG, payload: res.data });
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };
};

export const createPostWithIng = (data) => {
  return (dispatch) => {
    axios
      .post("/api/post/post-with-img", data)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: CREATE_POST_WITH_IMG, payload: res.data });
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };
};

export const deletePost = (postId, data) => {
  return (dispatch) => {
    axios
      .delete(`/api/post/${postId}`, data)
      .then(() => {
        dispatch({ type: DELETE_POST, payload: { postId } });
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };
};

export const editPostMsg = (postId, data) => {
  return (dispatch) => {
    axios
      .put(`/api/post/${postId}`, data)
      .then(() => {
        dispatch({ type: EDIT_POST, payload: { ...data, postId } });
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };
};

export const likePost = (postId, data) => {
  return (dispatch) => {
    axios
      .patch(`/api/post/like-post/${postId}`, data)
      .then(() => {
        dispatch({ type: LIKE_POST, payload: { ...data, postId } });
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };
};

export const dislikePost = (postId, data) => {
  return (dispatch) => {
    axios
      .patch(`/api/post/dislike-post/${postId}`, data)
      .then(() => {
        dispatch({ type: DISLIKE_POST, payload: { ...data, postId } });
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };
};

export const commentPost = (postId, data) => {
  return (dispatch) => {
    axios
      .patch(`/api/post/comment-post/${postId}`, data)
      .then(() => {
        dispatch({ type: COMMENT_POST });
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };
};

export const editCommentPost = (postId, data) => {
  return (dispatch) => {
    axios
      .patch(`/api/post/edit-comment-post/${postId}`, data)
      .then(() => {
        dispatch({ type: EDIT_COMMEMNT_POST, payload: { ...data, postId } });
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };
};

export const deleteCommentPost = (postId, data) => {
  return (dispatch) => {
    axios
      .patch(`/api/post/delete-comment-post/${postId}`, data)
      .then(() => {
        dispatch({ type: DELETE_COMMEMNT_POST, payload: { ...data, postId } });
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };
};

export const likeCommentPost = (postId, data) => {
  return (dispatch) => {
    axios
      .patch(`/api/post/like-comment-post/${postId}`, data)
      .then(() => {
        dispatch({ type: LIKE_COMMENT_POST, payload: { ...data, postId } });
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };
};

export const dislikeCommentPost = (postId, data) => {
  return (dispatch) => {
    axios
      .patch(`/api/post/dislike-comment-post/${postId}`, data)
      .then(() => {
        dispatch({ type: DISLIKE_COMMENT_POST, payload: { ...data, postId } });
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };
};
