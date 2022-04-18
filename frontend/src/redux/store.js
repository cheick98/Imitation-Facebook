import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

// reducers
import userAuthReducer from "./reducer/userAuth.reducer";
import userReducer from "./reducer/user.reducer";
import allUsersReducer from "./reducer/allUsers.reducer";
import postReducer from "./reducer/post.reducer";
import suggestionFriendReducer from "./reducer/suggestionFriend.reducer";
import myFriendDiscussionReducer from "./reducer/friendDiscussion.reducer";
import discussionReducer from "./reducer/discussion.reducer";

// dev extension
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  userAuth: userAuthReducer,
  user: userReducer,
  allUsers: allUsersReducer,
  allPosts: postReducer,
  suggestionFriend: suggestionFriendReducer,
  myFriendDiscussion: myFriendDiscussionReducer,
  discussion: discussionReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
