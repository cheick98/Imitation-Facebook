import axios from "axios";
import { GET_ALL_USERS } from "../constants";

export const getAllUsers = () => {
  return (dispatch) => {
    axios
      .get("/api/user")
      .then((res) => {
        dispatch({ type: GET_ALL_USERS, payload: res.data });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
};
