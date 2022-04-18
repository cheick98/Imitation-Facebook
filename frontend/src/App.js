import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UidContext } from "./context/UidContext";
import Router from "./pages/router";
import { suggestionFriend } from "./redux/actions/suggestionFriend.action";
import { getUserAuth } from "./redux/actions/userAuth.action";
import { getMyFriendDiscussion } from "./redux/actions/friendDiscussion.action";

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const getToken = () => {
      axios
        .get("/userId")
        .then((res) => {
          setUid(res.data.userId);
        })
        .catch((error) => {
          console.log("No token" + error);
        });
    };

    getToken();

    if (uid) {
      dispatch(getUserAuth(uid));
      dispatch(suggestionFriend(uid, { uid }));
      dispatch(getMyFriendDiscussion(uid));
    }
  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
      <Router />
    </UidContext.Provider>
  );
};

export default App;
