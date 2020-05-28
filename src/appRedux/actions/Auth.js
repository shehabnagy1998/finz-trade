import {
  HIDE_MESSAGE,
  INIT_URL,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  SHOW_MESSAGE,
  SIGNIN_USER,
  SIGNOUT_USER,
  SIGNUP_USER,
} from "constants/ActionTypes";
import { REDUX_PAGE_LOADERS, API } from "constants/API";
import Axios from "axios";
import { UPDATE_USER } from "../../constants/ActionTypes";
import { notification } from "antd";
import { push } from "connected-react-router";

const openNotificationError = (title, msg) => {
  notification["error"]({
    message: title,
    description: msg,
  });
};
const openNotificationSuccess = (title, msg) => {
  notification["success"]({
    message: title,
    description: msg,
  });
};

///////////////////////////////////////////////////////////////////////
export const userConfirmEmail = (code) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { confirmEmail: true },
  });

  try {
    const res = await Axios({
      baseURL: API,
      url: `/user/confirm/${code}`,
      method: "PUT",
    });
    openNotificationSuccess("Confirmation", "Email confirmed");
    dispatch(push("/login"));
    dispatch({ type: REDUX_PAGE_LOADERS, value: { confirmEmail: false } });
  } catch (error) {
    console.log(error.response);
    if (error.response && error.response.data) {
      openNotificationError("Confirmation", error.response.data.message);
      dispatch({ type: SIGNUP_USER, value: { userInfo: {}, authUser: null } });
      dispatch({ type: REDUX_PAGE_LOADERS, value: { confirmEmail: false } });
      return;
    }
    openNotificationError("Confirmation", "Failed to confirm email");
  }
};

///////////////////////////////////////////////////////////////////////
export const userSignUp = (user) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { signUpUser: true },
  });

  try {
    const res = await Axios({
      baseURL: API,
      url: `/user/register`,
      method: "POST",
      data: { ...user },
    });
    console.log(res);
    openNotificationSuccess("Register", "Account created successfully");
    dispatch(push("/confirm-email"));
    dispatch({ type: REDUX_PAGE_LOADERS, value: { signUpUser: false } });
  } catch (error) {
    console.log(error.response);
    if (error.response && error.response.data) {
      openNotificationError("Register", error.response.data.message);
      dispatch({ type: SIGNUP_USER, value: { userInfo: {}, authUser: null } });
      dispatch({ type: REDUX_PAGE_LOADERS, value: { signUpUser: false } });
      return;
    }
    openNotificationError("Register", "Failed to register");
  }
};

///////////////////////////////////////////////////////////////////////
export const getUserInfo = (_) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { getUserInfo: true },
  });
  const userToken = getState().auth.authUser;

  try {
    const res = await Axios({
      baseURL: API,
      url: "/user/info?cb=" + Date.now(),
      method: "GET",
      headers: {
        token: userToken,
      },
    });
    console.log(res);
    if (res.data.data.user.plan.subscriptionId)
      dispatch({
        type: UPDATE_USER,
        value: {
          ...res.data.data.user,
          plan: res.data.data.subscription.plan,
          subscription: res.data.data.subscription.subscription.subscription,
        },
      });
    else
      dispatch({
        type: UPDATE_USER,
        value: {
          ...res.data.data.user,
        },
      });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getUserInfo: false } });
  } catch (error) {
    console.log(error.response);
    if (error.response && error.response.data) {
      localStorage.removeItem("user_id");
      dispatch({ type: SIGNIN_USER, value: { userInfo: {}, authUser: null } });
      dispatch({ type: REDUX_PAGE_LOADERS, value: { getUserInfo: false } });
    }
  }
};

///////////////////////////////////////////////////////////////////////
export const userSignIn = (user) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { signInUser: true },
  });

  try {
    const res = await Axios({
      baseURL: API,
      url: `/user/login/${user.username}/${user.password}`,
      method: "POST",
    });

    if (user.remember) localStorage.setItem("user_id", res.data.token);
    dispatch({
      type: SIGNIN_USER,
      value: {
        userInfo: { ...res.data.data.user },
        authUser: res.data.token,
      },
    });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { signInUser: false } });
  } catch (error) {
    console.log(error.response);
    if (error.response && error.response.data) {
      openNotificationError("Login", error.response.data.message);
      dispatch({ type: SIGNIN_USER, value: { userInfo: {}, authUser: null } });
      dispatch({ type: REDUX_PAGE_LOADERS, value: { signInUser: false } });
      return;
    }
    openNotificationError("Login", "Failed to login");
  }
};

///////////////////////////////////////////////////////////////////////
export const userSignOut = (_) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { getUserInfo: true },
  });
  const userToken = getState().auth.authUser;

  try {
    const res = await Axios({
      baseURL: API,
      url: "/user/logout",
      method: "DELETE",
      headers: {
        token: userToken,
      },
    });
    localStorage.removeItem("user_id");
    dispatch({ type: SIGNOUT_USER });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getUserInfo: false } });
  } catch (error) {
    console.log(error.response);
    if (error.response && error.response.data) {
      dispatch({ type: SIGNOUT_USER });
      dispatch({ type: REDUX_PAGE_LOADERS, value: { getUserInfo: false } });
    }
  }
};

///////////////////////////////////////////////////////////////////////
export const userForgotPassword = (email) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { forgotPassword: true },
  });

  try {
    const res = await Axios({
      baseURL: API,
      url: `/user/requestChangePassword/${email}`,
      method: "PUT",
    });
    console.log(res);
    openNotificationSuccess(
      "Forget Password",
      "if your email is registered, you will find email with code"
    );
    dispatch(push("/reset-password"));
    dispatch({ type: REDUX_PAGE_LOADERS, value: { forgotPassword: false } });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: REDUX_PAGE_LOADERS, value: { forgotPassword: false } });
    if (error.response && error.response.data) {
      openNotificationSuccess("Forget Password", error.response.data.message);
      return;
    }
    openNotificationError("Forget Password", "Failed to send email");
  }
};

///////////////////////////////////////////////////////////////////////
export const editUserPic = (base64) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { editUserPic: true },
  });
  const userToken = getState().auth.authUser;
  console.log(base64);
  try {
    const res = await Axios({
      baseURL: API,
      url: "/user/uploadPic",
      method: "PUT",
      data: { base64 },
      headers: {
        token: userToken,
      },
    });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { editUserPic: false } });
    await dispatch(getUserInfo());
  } catch (error) {
    console.log(error.response);
    dispatch({ type: REDUX_PAGE_LOADERS, value: { editUserPic: false } });
    if (error.response && error.response.data) {
      openNotificationError("User Picture", error.response.data.message);
      return;
    }
    openNotificationError("User Picture", "Failed to change picture");
  }
};

///////////////////////////////////////////////////////////////////////
export const userResetPassword = (obj) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { resetPassword: true },
  });

  try {
    const res = await Axios({
      baseURL: API,
      url: `/user/changePass/${obj.email}/${obj.code}/${obj.newPass}`,
      method: "PUT",
    });
    console.log(res);
    openNotificationSuccess("Reset Password", "password reseted successfully");
    dispatch(push("/login"));
    dispatch({ type: REDUX_PAGE_LOADERS, value: { resetPassword: false } });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: REDUX_PAGE_LOADERS, value: { resetPassword: false } });
    if (error.response && error.response.data) {
      openNotificationSuccess("Reset Password", error.response.data.message);
      return;
    }
    openNotificationError("Reset Password", "Failed to reset password");
  }
};

export const showAuthMessage = (message) => {
  return {
    type: SHOW_MESSAGE,
    value: message,
  };
};

export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    value: url,
  };
};

export const showAuthLoader = () => {
  return {
    type: ON_SHOW_LOADER,
  };
};

export const hideMessage = () => {
  return {
    type: HIDE_MESSAGE,
  };
};
export const hideAuthLoader = () => {
  return {
    type: ON_HIDE_LOADER,
  };
};
