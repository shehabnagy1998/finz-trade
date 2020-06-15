import Axios from "axios";
import { REDUX_PAGE_LOADERS, API } from "../../../constants/API";
import { notification } from "antd";

const openNotificationSuccess = () => {
  notification["success"]({
    message: "User Settings",
    description: "you have successfully edited your settings",
  });
};
const openNotificationError = (msg) => {
  notification["error"]({
    message: "Settings",
    description: msg,
  });
};

export default (obj) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { editUserSettings: true },
  });
  const userToken = getState().auth.authUser;
  try {
    const res = await Axios({
      baseURL: API,
      url: "/user/preferences",
      method: "PUT",
      data: { ...obj },
      headers: {
        token: userToken,
      },
    });
    openNotificationSuccess();
    // dispatch({ type: REDUX_STRATEGIES, value: res.data.data });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { editUserSettings: false } });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: REDUX_PAGE_LOADERS, value: { editUserSettings: false } });
    if (error.response && error.response.data) {
      openNotificationError(error.response.data.message);
      return;
    }
    openNotificationError("sorry failed to edit your settings, try again");
  }
};
