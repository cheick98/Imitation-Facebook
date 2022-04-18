import { SUGGESTION_FRIEND } from "../constants";

const initialState = [];

const suggestionFriendReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUGGESTION_FRIEND:
      return action.payload;

    default:
      return state;
  }
};

export default suggestionFriendReducer;
