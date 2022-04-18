import React, { useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { UidContext } from "../context/UidContext";
import NotConnected from "./NotConnected";
import HeaderLeft from "../components/Messagerie/Left/HeaderLeft";
import FriendDiscution from "../components/Messagerie/Left/FriendDiscution";
import CenterHeader from "../components/Messagerie/Center/CenterHeader";
import SendMessage from "../components/Messagerie/Center/SendMessage";
import Discussion from "../components/Messagerie/Center/Discussion";

// action to dispatch
import { getMyFriendDiscussion } from "../redux/actions/friendDiscussion.action";
import {
  getDiscussionWithFriend,
  liveMessage,
} from "../redux/actions/discussion.action";

import "../styles_pages/messagerie.css";

const Messagerie = () => {
  const uid = useContext(UidContext);
  const friendDiscussionId = useParams().discussionId;

  const allUsers = useSelector((state) => state.allUsers);
  const myFriendDiscussion = useSelector((state) => state.myFriendDiscussion);
  const discussion = useSelector((state) => state.discussion);
  const dispatch = useDispatch();

  const scrollRef = useRef();
  const socket = useRef();

  // sorted by decroissant order
  const myFriendDiscussionSorted = myFriendDiscussion.sort(
    (a, b) => b.timestamp - a.timestamp
  );

  // for get my friend id in my friends discussion sorted
  const myFriendDiscussionIdFriendId = [];
  myFriendDiscussionSorted.forEach((friendDiscussion) => {
    if (friendDiscussion.friendOneId !== uid)
      myFriendDiscussionIdFriendId.push({
        friendId: friendDiscussion.friendOneId,
        friendDiscussionId: friendDiscussion._id,
        timestamp: friendDiscussion.timestamp,
      });

    if (friendDiscussion.friendTwoId !== uid)
      myFriendDiscussionIdFriendId.push({
        friendId: friendDiscussion.friendTwoId,
        friendDiscussionId: friendDiscussion._id,
        timestamp: friendDiscussion.timestamp,
      });
  });

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current?.on("getMessage", (data) => {
      dispatch(
        liveMessage({
          friendDiscussionId,
          senderId: data.senderId,
          message: data.message,
          createdAt: Date.now(),
        })
      );
    });
  }, [dispatch, friendDiscussionId]);

  useEffect(() => {
    uid && socket.current.emit("addUser", uid);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [uid]);

  useEffect(() => {
    uid && dispatch(getMyFriendDiscussion(uid));
  }, [uid, dispatch, discussion]);

  useEffect(() => {
    friendDiscussionId && dispatch(getDiscussionWithFriend(friendDiscussionId));
  }, [dispatch, friendDiscussionId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [discussion]);

  return (
    <div className="messagerie">
      {uid ? (
        <>
          <div className="left-side-mes">
            <HeaderLeft />
            <div className="body-left">
              {myFriendDiscussionIdFriendId.map((fdIdFid) => {
                return allUsers.map((user) => {
                  if (user._id === fdIdFid.friendId) {
                    return (
                      <FriendDiscution
                        user={user}
                        discussionId={fdIdFid.friendDiscussionId}
                        timestamp={fdIdFid.timestamp}
                        key={fdIdFid.friendDiscussionId}
                      />
                    );
                  } else return null;
                });
              })}
            </div>
          </div>
          <div className="center-side-mes">
            {window.location.pathname !== "/messagerie" ? (
              <>
                <CenterHeader />
                <div className="body-center">
                  <div className="discussion-container">
                    {discussion && discussion.length !== 0 ? (
                      discussion.map((disc, index) => {
                        return (
                          <span key={index} ref={scrollRef}>
                            <Discussion
                              own={disc.senderId === uid}
                              disc={disc}
                            />
                          </span>
                        );
                      })
                    ) : (
                      <p className="no-disc">
                        <span>
                          Vous n'avez pas encore à discuter entre vous. Soyez
                          donc le(a) premier(e) a lui envoyé un message.
                        </span>
                      </p>
                    )}
                  </div>

                  <SendMessage
                    friendDiscussionId={friendDiscussionId}
                    socket={socket}
                  />
                </div>
              </>
            ) : (
              <p className="select-friend-to-speak">
                <span>Veuillez choisir un ami avec qui discuter.</span>
              </p>
            )}
          </div>
        </>
      ) : (
        <NotConnected />
      )}
    </div>
  );
};

export default Messagerie;
