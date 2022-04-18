import axios from "axios";
import {
  DELETE_FRIEND,
  EDIT_USER_AUTH_INFO_BIO,
  EDIT_USER_AUTH_INFO_BIRTHDAY,
  EDIT_USER_AUTH_INFO_COUNTRY,
  EDIT_USER_AUTH_INFO_EMAIL,
  EDIT_USER_AUTH_INFO_NOM,
  EDIT_USER_AUTH_INFO_PRENOM,
  EDIT_USER_AUTH_INFO_PSEUDO,
  EDIT_USER_INFO_BG_PICTURE,
  EDIT_USER_INFO_BIO,
  EDIT_USER_INFO_BIRTHDAY,
  EDIT_USER_INFO_COUNTRY,
  EDIT_USER_INFO_EMAIL,
  EDIT_USER_INFO_NOM,
  EDIT_USER_INFO_PICTURE,
  EDIT_USER_INFO_PRENOM,
  EDIT_USER_INFO_PSEUDO,
  GET_USER,
} from "../constants";

export const getUser = (uid) => {
  return (dispatch) => {
    axios
      .get(`/api/user/${uid}`, { uid })
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  };
};

export const editUserInfoPseudo = (uid, data) => {
  return (dispatch) => {
    axios
      .put(`/api/user/${uid}`, data)
      .then(() => {
        dispatch({ type: EDIT_USER_INFO_PSEUDO, payload: data });
        dispatch({ type: EDIT_USER_AUTH_INFO_PSEUDO, payload: data });
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };
};
export const editUserInfoNom = (uid, data) => {
  return (dispatch) => {
    axios
      .put(`/api/user/${uid}`, data)
      .then(() => {
        dispatch({ type: EDIT_USER_INFO_NOM, payload: data });
        dispatch({ type: EDIT_USER_AUTH_INFO_NOM, payload: data });
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };
};

export const editUserInfoPrenom = (uid, data) => {
  return (dispatch) => {
    axios
      .put(`/api/user/${uid}`, data)
      .then(() => {
        dispatch({ type: EDIT_USER_INFO_PRENOM, payload: data });
        dispatch({ type: EDIT_USER_AUTH_INFO_PRENOM, payload: data });
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };
};

export const editUserInfoEmail = (uid, data) => {
  return (dispatch) => {
    axios
      .put(`/api/user/${uid}`, data)
      .then(() => {
        dispatch({ type: EDIT_USER_INFO_EMAIL, payload: data });
        dispatch({ type: EDIT_USER_AUTH_INFO_EMAIL, payload: data });
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };
};

export const editUserInfoBirthDay = (uid, data) => {
  return (dispatch) => {
    axios
      .put(`/api/user/${uid}`, data)
      .then(() => {
        dispatch({ type: EDIT_USER_INFO_BIRTHDAY, payload: data });
        dispatch({ type: EDIT_USER_AUTH_INFO_BIRTHDAY, payload: data });
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };
};

export const editUserInfoCountry = (uid, data) => {
  return (dispatch) => {
    axios
      .put(`/api/user/${uid}`, data)
      .then(() => {
        dispatch({ type: EDIT_USER_INFO_COUNTRY, payload: data });
        dispatch({ type: EDIT_USER_AUTH_INFO_COUNTRY, payload: data });
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };
};

export const editUserInfoBio = (uid, data) => {
  return (dispatch) => {
    axios
      .put(`/api/user/${uid}`, data)
      .then(() => {
        dispatch({ type: EDIT_USER_INFO_BIO, payload: data });
        dispatch({ type: EDIT_USER_AUTH_INFO_BIO, payload: data });
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };
};

export const editUserInfoPicture = (data) => {
  return (dispatch) => {
    axios
      .post(`/api/user/upload`, data)
      .then(() => {
        dispatch({ type: EDIT_USER_INFO_PICTURE });
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };
};

export const editUserInfoBgPicture = (data) => {
  return (dispatch) => {
    axios
      .post(`/api/user/upload-bg-img`, data)
      .then(() => {
        dispatch({ type: EDIT_USER_INFO_BG_PICTURE });
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };
};

export const deleteFriend = (userId, data) => {
  return (dispatch) => {
    axios
      .patch(`/api/user/delete-friend/${userId}`, data)
      .then(() => {
        dispatch({ type: DELETE_FRIEND, payload: data });
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };
};
