import {
  DELETE_FRIEND,
  EDIT_USER_INFO_BIO,
  EDIT_USER_INFO_BIRTHDAY,
  EDIT_USER_INFO_COUNTRY,
  EDIT_USER_INFO_EMAIL,
  EDIT_USER_INFO_NOM,
  EDIT_USER_INFO_PRENOM,
  EDIT_USER_INFO_PSEUDO,
  GET_USER,
} from "../constants";

const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case EDIT_USER_INFO_PSEUDO:
      return { ...state, pseudo: action.payload.pseudo };
    case EDIT_USER_INFO_NOM:
      return { ...state, nom: action.payload.nom };
    case EDIT_USER_INFO_PRENOM:
      return { ...state, prenom: action.payload.prenom };
    case EDIT_USER_INFO_EMAIL:
      return { ...state, email: action.payload.email };
    case EDIT_USER_INFO_BIRTHDAY:
      return { ...state, birthDay: action.payload.birthDay };
    case EDIT_USER_INFO_COUNTRY:
      return { ...state, country: action.payload.country };
    case EDIT_USER_INFO_BIO:
      return { ...state, bio: action.payload.bio };

    case DELETE_FRIEND:
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

export default userReducer;
