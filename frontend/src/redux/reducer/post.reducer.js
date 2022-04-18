import {
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

const initialState = [];

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POSTS:
      return action.payload;
    case DELETE_POST:
      return state.filter((post) => post._id !== action.payload.postId);
    case EDIT_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return { ...post, message: action.payload.message };
        } else {
          return post;
        }
      });

    case CREATE_POST_NO_IMG:
      return [action.payload, ...state];

    case CREATE_POST_WITH_IMG:
      return [action.payload, ...state];

    case LIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return { ...post, likers: [...post.likers, action.payload.userId] };
        } else {
          return post;
        }
      });

    case DISLIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likers: post.likers.filter(
              (userId) => userId !== action.payload.userId
            ),
          };
        } else {
          return post;
        }
      });

    case EDIT_COMMEMNT_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            comments: post.comments.map((comment) => {
              if (comment._id === action.payload.commentId) {
                return { ...comment, text: action.payload.text };
              } else {
                return comment;
              }
            }),
          };
        } else {
          return post;
        }
      });

    case DELETE_COMMEMNT_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            comments: post.comments.filter(
              (comment) => comment._id !== action.payload.commentId
            ),
          };
        } else {
          return post;
        }
      });

    case LIKE_COMMENT_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            comments: post.comments.map((comment) => {
              if (comment._id === action.payload.commentId) {
                return {
                  ...comment,
                  likers: [...comment.likers, action.payload.userId],
                };
              } else {
                return comment;
              }
            }),
          };
        } else {
          return post;
        }
      });

    case DISLIKE_COMMENT_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            comments: post.comments.map((comment) => {
              if (comment._id === action.payload.commentId) {
                return {
                  ...comment,
                  likers: comment.likers.filter(
                    (userId) => userId !== action.payload.userId
                  ),
                };
              } else {
                return comment;
              }
            }),
          };
        } else {
          return post;
        }
      });

    default:
      return state;
  }
};

export default postReducer;
