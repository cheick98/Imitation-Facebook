import React, { useState } from "react";
import { useSelector } from "react-redux";
import PostCard from "../Home/PostCard";
import AboutMe from "./AboutMe";
import ListFriend from "./ListFriend";

const MenuProfil = () => {
  const user = useSelector((state) => state.user);
  const allPosts = useSelector((state) => state.allPosts);

  const [publication, setPublication] = useState(true);
  const [about, setAbout] = useState(false);
  const [friends, setFriends] = useState(false);

  return (
    <div className="menu-profil">
      <div className="menu-title">
        <span
          className={publication ? "active" : ""}
          onClick={() => {
            setPublication(true);
            setAbout(false);
            setFriends(false);
          }}
        >
          Publication
        </span>
        <span
          className={about ? "active" : ""}
          onClick={() => {
            setPublication(false);
            setAbout(true);
            setFriends(false);
          }}
        >
          A propos
        </span>
        <span
          className={friends ? "active" : ""}
          onClick={() => {
            setPublication(false);
            setAbout(false);
            setFriends(true);
          }}
        >
          Amis
        </span>
      </div>
      <div className="menu-content">
        {publication &&
          allPosts &&
          allPosts.map((post) => {
            if (post.posterId === user._id) {
              return <PostCard key={post._id} post={post} />;
            } else {
              return null;
            }
          })}
        {about && <AboutMe />}
        {friends && <ListFriend />}
      </div>
    </div>
  );
};

export default MenuProfil;
