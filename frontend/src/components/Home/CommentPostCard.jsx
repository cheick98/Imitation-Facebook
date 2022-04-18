import React from "react";
import DoComment from "./DoComment";
import SeeCommentPost from "./SeeCommentPost";

const CommentPostCard = ({ post }) => {
  const allCommentsArray = Object.keys(post.comments).map(
    (i) => post.comments[i]
  );

  // sorted by decroissant order
  const sortedComments = allCommentsArray.sort((a, b) => {
    return b.timestamp - a.timestamp;
  });

  return (
    <div className="commenter">
      {/* do a comment */}
      <DoComment postId={post._id} />

      {/* see comment and like comment*/}
      {post.comments && post.comments.length !== 0 ? (
        sortedComments.map((comment) => {
          return (
            <SeeCommentPost
              key={comment._id}
              comment={comment}
              postId={post._id}
            />
          );
        })
      ) : (
        <p className="no-comment">
          Pas de commentaire pour le moment. Soyez donc la premiere personne à
          commenter
        </p>
      )}
    </div>
  );
};

export default CommentPostCard;
