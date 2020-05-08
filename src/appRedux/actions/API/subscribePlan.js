import Axios from "axios";
import {
  REDUX_PAGE_LOADERS,
  API,
  REDUX_STRATEGIES,
} from "../../../constants/API";
import { notification } from "antd";

const openNotificationSuccess = () => {
  notification["success"]({
    message: "Subscribtion",
    description: "you have successfully subscribed",
  });
};
const openNotificationError = () => {
  notification["error"]({
    message: "Subscribtion",
    description: "sorry error has occured, please try again",
  });
};

export default (token) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { subscribePlan: true },
  });
  const userToken = getState().Api.user.token;
  const couponName = getState().Api.coupon.name;
  let url = `/subscription/subscribe/${token}`;
  if (couponName) url += `?coupon=${couponName}`;
  try {
    const res = await Axios({
      baseURL: API,
      url,
      method: "POST",
      headers: {
        token: userToken,
      },
    });
    openNotificationSuccess();
    dispatch({ type: REDUX_PAGE_LOADERS, value: { subscribePlan: false } });
  } catch (error) {
    console.log(error.response);
    openNotificationError();
    dispatch({ type: REDUX_PAGE_LOADERS, value: { subscribePlan: false } });
  }
};
