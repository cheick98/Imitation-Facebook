import React from "react";
import { useSelector } from "react-redux";
import ForDoApost from "./ForDoApost";
import PostCard from "./PostCard";
import SeeFriendOnline from "./SeeFriendOnline";

const CenterHome = () => {
  const allPosts = useSelector((state) => state.allPosts);

  return (
    <div className="center-side">
      <ForDoApost />
      <SeeFriendOnline />

      {allPosts && allPosts.length !== 0 ? (
        allPosts.map((post) => {
          return <PostCard key={post._id} post={post} />;
        })
      ) : (
        <p>
          Personne n'a encore fait de publication pour le moment. Soyez donc la
          premiere personne
        </p>
      )}
    </div>
  );
};

export default CenterHome;
