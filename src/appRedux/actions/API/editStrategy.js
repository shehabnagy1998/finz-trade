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
    description: "you have successfully edited strategy",
  });
};
const openNotificationError = (msg) => {
  notification["error"]({
    message: "Strategies",
    description: msg,
  });
};

export default (obj, setItem) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { editStrategy: true },
  });
  const userToken = getState().auth.authUser;
  try {
    const res = await Axios({
      baseURL: API,
      url: `/strategy/edit/${obj._id}`,
      method: "PUT",
      data: { ...obj },
      headers: {
        token: userToken,
      },
    });
    await dispatch(getStrategies());
    setItem({});
    openNotificationSuccess();
    dispatch({ type: REDUX_PAGE_LOADERS, value: { editStrategy: false } });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: REDUX_PAGE_LOADERS, value: { editStrategy: false } });
    if (error.response && error.response.data) {
      openNotificationError(error.response.data.message);
      return;
    }
    openNotificationError("sorry failed to edit strategy, try again");
  }
};
