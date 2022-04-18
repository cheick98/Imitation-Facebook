import axios from "axios";
import { SUGGESTION_FRIEND } from "../constants";

export const suggestionFriend = (userId, data) => {
  return (dispatch) => {
    axios
      .patch(`/api/user/suggestion-friend/${userId}`, data)
      .then((res) => {
        dispatch({ type: SUGGESTION_FRIEND, payload: res.data });
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };
};
