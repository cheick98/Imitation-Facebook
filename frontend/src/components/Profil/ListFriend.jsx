import React from "react";
import { useSelector } from "react-redux";
import Friends from "./Friends";

const ListFriend = () => {
  const user = useSelector((state) => state.user);
  const allUsers = useSelector((state) => state.allUsers);

  return (
    <div className="profil-list-friend">
      {user && user.friends.length !== 0 ? (
        user.friends.map((idUser) => {
          return allUsers.map((user) => {
            if (idUser === user._id) {
              return <Friends key={idUser} user={user} />;
            } else {
              return null;
            }
          });
        })
      ) : (
        <p>Vous n'avez d'amis pour le moment</p>
      )}
    </div>
  );
};

export default ListFriend;
