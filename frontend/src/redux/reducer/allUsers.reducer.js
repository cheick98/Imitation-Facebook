import { GET_ALL_USERS } from "../constants";

const initialState = [];

const allUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.payload;

    default:
      return state;
  }
};

export default allUsersReducer;
