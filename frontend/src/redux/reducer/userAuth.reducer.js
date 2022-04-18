import {
  ACCEPT_INVITATION,
  DELETE_FRIEND_USER_AUTH,
  EDIT_USER_AUTH_INFO_BIO,
  EDIT_USER_AUTH_INFO_BIRTHDAY,
  EDIT_USER_AUTH_INFO_COUNTRY,
  EDIT_USER_AUTH_INFO_EMAIL,
  EDIT_USER_AUTH_INFO_NOM,
  EDIT_USER_AUTH_INFO_PRENOM,
  EDIT_USER_AUTH_INFO_PSEUDO,
  GET_USER_AUTH,
  REFUSE_INVITATION,
  SEND_INVITATION,
  SEND_INVITATION_ABORT,
} from "../constants";

const initialState = {};

const userAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_AUTH:
      return action.payload;
    case EDIT_USER_AUTH_INFO_PSEUDO:
      return { ...state, pseudo: action.payload.pseudo };
    case EDIT_USER_AUTH_INFO_NOM:
      return { ...state, nom: action.payload.nom };
    case EDIT_USER_AUTH_INFO_PRENOM:
      return { ...state, prenom: action.payload.prenom };
    case EDIT_USER_AUTH_INFO_EMAIL:
      return { ...state, email: action.payload.email };
    case EDIT_USER_AUTH_INFO_BIRTHDAY:
      return { ...state, birthDay: action.payload.birthDay };
    case EDIT_USER_AUTH_INFO_COUNTRY:
      return { ...state, country: action.payload.country };
    case EDIT_USER_AUTH_INFO_BIO:
      return { ...state, bio: action.payload.bio };

    case SEND_INVITATION:
      return {
        ...state,
        sendInvitation: [...state.sendInvitation, action.payload.invitId],
      };

    case SEND_INVITATION_ABORT:
      return {
        ...state,
        sendInvitation: state.sendInvitation.filter(
          (idUser) => idUser !== action.payload.invitId
        ),
      };

    case ACCEPT_INVITATION:
      return {
        ...state,
        notifsFriends: state.notifsFriends.filter(
          (idUser) => idUser !== action.payload.invitId
        ),
        friends: [...state.friends, action.payload.invitId],
      };

    case REFUSE_INVITATION:
      return {
        ...state,
        notifsFriends: state.notifsFriends.filter(
          (idUser) => idUser !== action.payload.invitId
        ),
      };

    case DELETE_FRIEND_USER_AUTH:
      return {
        ...state,
        friends: state.friends.filter(
          (idUser) => idUser !== action.payload.invitId
        ),
      };

    default:
      return state;
  }
};

export default userAuthReducer;
