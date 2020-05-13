import {
  HIDE_MESSAGE,
  INIT_URL,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  SHOW_MESSAGE,
  SIGNIN_USER,
  SIGNOUT_USER,
  SIGNUP_USER,
  UPDATE_USER,
} from "constants/ActionTypes";

const INIT_STATE = {
  loader: false,
  alertMessage: "",
  showMessage: false,
  initURL: "",
  authUser: localStorage.getItem("user_id"),
  userInfo: {},
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SIGNUP_USER: {
      return {
        ...state,
        loader: false,
        authUser: action.value.authUser,
        userInfo: action.value.userInfo,
      };
    }
    case SIGNIN_USER: {
      return {
        ...state,
        loader: false,
        authUser: action.value.authUser,
        userInfo: action.value.userInfo,
      };
    }
    case UPDATE_USER: {
      return {
        ...state,
        loader: false,
        userInfo: action.value,
      };
    }
    case INIT_URL: {
      return {
        ...state,
        initURL: action.value,
      };
    }
    case SIGNOUT_USER: {
      return {
        ...state,
        authUser: null,
        userInfo: {},
        initURL: "/",
        loader: false,
      };
    }

    case SHOW_MESSAGE: {
      return {
        ...state,
        alertMessage: action.value,
        showMessage: true,
        loader: false,
      };
    }
    case HIDE_MESSAGE: {
      return {
        ...state,
        alertMessage: "",
        showMessage: false,
        loader: false,
      };
    }
    case ON_SHOW_LOADER: {
      return {
        ...state,
        loader: true,
      };
    }
    case ON_HIDE_LOADER: {
      return {
        ...state,
        loader: false,
      };
    }
    default:
      return state;
  }
};
