import Axios from "axios";
import { REDUX_PAGE_LOADERS, API } from "../../../constants/API";
import { notification } from "antd";

const openNotificationError = () => {
  notification["error"]({
    message: "Settings",
    description: "sorry failed to change settings, try again",
  });
};

export default (obj, setSettings) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { editUserSettings: true },
  });
  const userToken = getState().Api.user.token;
  try {
    const res = await Axios({
      baseURL: API,
      url: "/user/uploadPic",
      method: "PUT",
      data: { ...obj },
      headers: {
        token: userToken,
      },
    });
    console.log(res);
    // dispatch({ type: REDUX_STRATEGIES, value: res.data.data });
    setSettings(obj);
    dispatch({ type: REDUX_PAGE_LOADERS, value: { editUserSettings: false } });
  } catch (error) {
    console.log(error.response);
    openNotificationError();
    dispatch({ type: REDUX_PAGE_LOADERS, value: { editUserSettings: false } });
  }
};
