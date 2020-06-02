import Axios from "axios";
import {
  REDUX_PAGE_LOADERS,
  API,
  REDUX_STRATEGIES,
  REDUX_PAGE_TEMPS,
} from "../../../constants/API";
import { notification } from "antd";

const openNotificationSuccess = () => {
  notification["success"]({
    message: "Subscribtion",
    description: "you have successfully subscribed",
  });
};
const openNotificationError = (msg) => {
  notification["error"]({
    message: "Subscribtion",
    description: msg,
  });
};

export default (token) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { subscribePlan: true },
  });
  const userToken = getState().auth.authUser;
  try {
    const res = await Axios({
      baseURL: API,
      url: `/subscription/confirm`,
      method: "PUT",
      headers: {
        token: userToken,
      },
    });

    openNotificationSuccess();
    dispatch({
      type: REDUX_PAGE_TEMPS,
      value: { clientSecret: null },
    });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { subscribePlan: false } });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: REDUX_PAGE_LOADERS, value: { subscribePlan: false } });
    if (error.response && error.response.data) {
      openNotificationError(error.response.data.message);
      return;
    }
    openNotificationError("sorry error has occured, please try again");
  }
};
