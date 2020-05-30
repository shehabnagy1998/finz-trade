import Axios from "axios";
import {
  REDUX_PAGE_LOADERS,
  API,
  REDUX_STRATEGIES,
} from "../../../constants/API";
import getStrategies from "./getStrategies";
import { notification } from "antd";

const openNotificationError = (msg) => {
  notification["error"]({
    message: "Strategies",
    description: msg,
  });
};

export default (obj, setIsVisible) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { addStrategy: true },
  });
  const userToken = getState().auth.authUser;
  try {
    const res = await Axios({
      baseURL: API,
      url: `/strategy/add`,
      method: "POST",
      data: { ...obj },
      headers: {
        token: userToken,
      },
    });

    await dispatch(getStrategies());
    dispatch({ type: REDUX_PAGE_LOADERS, value: { addStrategy: false } });
    setIsVisible(false);
  } catch (error) {
    console.log(error.response);
    dispatch({ type: REDUX_PAGE_LOADERS, value: { addStrategy: false } });
    if (error.response && error.response.data) {
      openNotificationError(error.response.data.message);
      return;
    }
    openNotificationError("sorry failed to add strategy, try again");
  }
};
