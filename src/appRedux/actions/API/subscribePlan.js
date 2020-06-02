import Axios from "axios";
import {
  REDUX_PAGE_LOADERS,
  API,
  REDUX_STRATEGIES,
  REDUX_PAGE_TEMPS,
} from "../../../constants/API";
import { notification } from "antd";
import toggleFollowStrategy from "./toggleFollowStrategy";

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

export default (token, followObject) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { subscribePlan: true },
  });
  const userToken = getState().auth.authUser;
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

    dispatch({ type: REDUX_PAGE_LOADERS, value: { subscribePlan: false } });
    if (followObject.id) {
      dispatch(toggleFollowStrategy(followObject.id, followObject.type));
      return;
    }
    openNotificationSuccess();
  } catch (error) {
    console.log(error.response);
    if (error.response && error.response.data) {
      if (error.response.data.thirdActionSecret) {
        dispatch({
          type: REDUX_PAGE_TEMPS,
          value: { clientSecret: error.response.data.thirdActionSecret },
        });
        return;
      }
      openNotificationError(error.response.data.message);
      return;
    }
    dispatch({ type: REDUX_PAGE_LOADERS, value: { subscribePlan: false } });
    openNotificationError("sorry error has occured, please try again");
  }
};
