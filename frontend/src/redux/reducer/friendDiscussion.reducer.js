import {
  CREATE_NEW_FRIEND_DISCUSSION,
  MY_FRIEND_DISCUSSION,
} from "../constants";

const initialState = [];

const myFriendDiscussionReducer = (state = initialState, action) => {
  switch (action.type) {
    case MY_FRIEND_DISCUSSION:
      return action.payload;

    case CREATE_NEW_FRIEND_DISCUSSION:
      return [action.payload, ...state];

    default:
      return state;
  }
};

export default myFriendDiscussionReducer;
