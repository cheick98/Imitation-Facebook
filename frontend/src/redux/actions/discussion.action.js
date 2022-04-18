import axios from "axios";
import {
  GET_DISCUSSION_WITH_FRIEND,
  LIVE_MESSAGE,
  SEND_MESSAGE,
} from "../constants";

export const getDiscussionWithFriend = (friendDiscussionId) => {
  return (dispatch) => {
    axios
      .get(`/api/discussion/${friendDiscussionId}`)
      .then((res) => {
        dispatch({ type: GET_DISCUSSION_WITH_FRIEND, payload: res.data });
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };
};

export const sendMessageToFriend = (userAuthId, data) => {
  return (dispatch) => {
    axios
      .post(`/api/discussion`, { uid: userAuthId, ...data })
      .then((res) => {
        dispatch({
          type: SEND_MESSAGE,
          payload: { _id: res.data._id, ...data },
        });
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };
};

export const liveMessage = (data) => {
  return (dispatch) => {
    dispatch({ type: LIVE_MESSAGE, payload: data });
  };
};
