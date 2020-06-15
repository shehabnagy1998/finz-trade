import Axios from "axios";
import {
  REDUX_PAGE_LOADERS,
  API,
  REDUX_STRATEGIES,
} from "../../../constants/API";
import getStrategies from "./getStrategies";
import { notification } from "antd";

const openNotificationSuccess = () => {
  notification["success"]({
    message: "Strategies",
    description: "you have successfully deleted strategy",
  });
};
const openNotificationError = (msg) => {
  notification["error"]({
    message: "Strategies",
    description: msg,
  });
};

export default (id) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { deleteStrategy: true },
  });
  const userToken = getState().auth.authUser;
  try {
    const res = await Axios({
      baseURL: API,
      url: `/strategy/delete/${id}`,
      method: "DELETE",

      headers: {
        token: userToken,
      },
    });
    await dispatch(getStrategies());
    openNotificationSuccess();
    dispatch({ type: REDUX_PAGE_LOADERS, value: { deleteStrategy: false } });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: REDUX_PAGE_LOADERS, value: { deleteStrategy: false } });
    if (error.response && error.response.data) {
      openNotificationError(error.response.data.message);
      return;
    }
    openNotificationError("sorry failed to delete strategy, try again");
  }
};
