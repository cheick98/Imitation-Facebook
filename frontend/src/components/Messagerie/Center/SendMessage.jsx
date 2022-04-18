import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UidContext } from "../../../context/UidContext";
import { sendMessageToFriend } from "../../../redux/actions/discussion.action";

const SendMessage = ({ friendDiscussionId, socket }) => {
  const uid = useContext(UidContext);
  const myFriendDiscussion = useSelector((state) => state.myFriendDiscussion);
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");

  const discussion = myFriendDiscussion.find(
    (friendDiscussion) => friendDiscussion._id === friendDiscussionId
  );

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (message.trim()) {
      dispatch(
        sendMessageToFriend(uid, {
          friendDiscussionId,
          senderId: uid,
          message: message.trim(),
        })
      );

      const receiverId =
        discussion.friendOneId === uid
          ? discussion.friendTwoId
          : discussion.friendOneId;

      socket.current.emit("sendMessage", {
        friendDiscussionId,
        senderId: uid,
        receiverId,
        message: message.trim(),
      });

      setMessage("");
    } else {
      setMessage("");
    }
  };

  return (
    <form className="send" onSubmit={handleSendMessage}>
      <input
        type="text"
        placeholder="Ecrire un message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      {message.trim() && <button className="fas fa-paper-plane"></button>}
    </form>
  );
};

export default SendMessage;
