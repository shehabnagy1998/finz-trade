import Axios from "axios";
import {
  REDUX_PAGE_LOADERS,
  API,
  REDUX_PAGE_ERRORS,
} from "../../../constants/API";
import { notification } from "antd";
import getUserInfo from "./getUserInfo";

const openNotificationError = () => {
  notification["error"]({
    message: "Settings",
    description: "sorry failed to update picture, try again",
  });
};

export default (base64) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { editUserPic: true },
  });
  const userToken = getState().Api.user.token;
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
    console.log(res);
    // dispatch({ type: REDUX_STRATEGIES, value: res.data.data });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { editUserPic: false } });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { editUserPic: false } });
    await dispatch(getUserInfo());
  } catch (error) {
    console.log(error.response);
    openNotificationError();
    dispatch({ type: REDUX_PAGE_ERRORS, value: { editUserPic: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { editUserPic: false } });
  }
};
