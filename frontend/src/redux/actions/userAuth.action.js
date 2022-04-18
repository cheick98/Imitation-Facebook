import axios from "axios";
import {
  ACCEPT_INVITATION,
  DELETE_FRIEND_USER_AUTH,
  GET_USER_AUTH,
  REFUSE_INVITATION,
  SEND_INVITATION,
  SEND_INVITATION_ABORT,
} from "../constants";

export const getUserAuth = (uid) => {
  return (dispatch) => {
    axios
      .get(`/api/user/${uid}`, { uid })
      .then((res) => {
        dispatch({ type: GET_USER_AUTH, payload: res.data });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
};

export const sendInvitation = (userId, data) => {
  return (dispatch) => {
    axios
      .patch(`/api/user/invitation/${userId}`, data)
      .then(() => {
        dispatch({ type: SEND_INVITATION, payload: data });
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };
};

export const sendInvitationAbort = (userId, data) => {
  return (dispatch) => {
    axios
      .patch(`/api/user/invitation-abort/${userId}`, data)
      .then(() => {
        dispatch({ type: SEND_INVITATION_ABORT, payload: data });
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };
};

export const acceptInvitation = (userId, data) => {
  return (dispatch) => {
    axios
      .patch(`/api/user/accept-invitation/${userId}`, data)
      .then(() => {
        dispatch({ type: ACCEPT_INVITATION, payload: data });
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };
};

export const refuseInvitation = (userId, data) => {
  return (dispatch) => {
    axios
      .patch(`/api/user/refuse-invitation/${userId}`, data)
      .then(() => {
        dispatch({ type: REFUSE_INVITATION, payload: data });
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };
};

export const deleteFriendUserAuth = (userId, data) => {
  return (dispatch) => {
    axios
      .patch(`/api/user/delete-friend/${userId}`, data)
      .then(() => {
        dispatch({ type: DELETE_FRIEND_USER_AUTH, payload: data });
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };
};
