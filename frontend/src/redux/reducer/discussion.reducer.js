import {
  GET_DISCUSSION_WITH_FRIEND,
  LIVE_MESSAGE,
  SEND_MESSAGE,
} from "../constants";

const initialState = [];

const discussionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DISCUSSION_WITH_FRIEND:
      return action.payload;

    case SEND_MESSAGE:
      return [...state, action.payload];

    case LIVE_MESSAGE:
      return [...state, action.payload];

    default:
      return state;
  }
};

export default discussionReducer;
