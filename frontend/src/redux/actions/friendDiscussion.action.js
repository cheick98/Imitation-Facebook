import axios from "axios";
import {
  CREATE_NEW_FRIEND_DISCUSSION,
  MY_FRIEND_DISCUSSION,
} from "../constants";

export const getMyFriendDiscussion = (userAuthId) => {
  return (dispatch) => {
    axios
      .get(`/api/friend-discussion/${userAuthId}`)
      .then((res) => {
        dispatch({ type: MY_FRIEND_DISCUSSION, payload: res.data });
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };
};

export const createNewFriendDiscussion = (data) => {
  return (dispatch) => {
    axios
      .post(`/api/friend-discussion`, data)
      .then((res) => {
        dispatch({
          type: CREATE_NEW_FRIEND_DISCUSSION,
          payload: { _id: res.data._id, ...data },
        });
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };
};
