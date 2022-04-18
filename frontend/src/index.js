import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// redux
import { Provider } from "react-redux";

import "@fortawesome/fontawesome-free/css/all.min.css";

import store from "./redux/store";
import { getAllUsers } from "./redux/actions/allUsers.action";
import { getAllPosts } from "./redux/actions/post.action";

store.dispatch(getAllUsers());
store.dispatch(getAllPosts());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
