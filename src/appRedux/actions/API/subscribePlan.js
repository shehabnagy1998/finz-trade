import Axios from "axios";
import {
  REDUX_PAGE_LOADERS,
  API,
  REDUX_STRATEGIES,
  REDUX_PAGE_TEMPS,
} from "../../../constants/API";
import { notification } from "antd";
import toggleFollowStrategy from "./toggleFollowStrategy";
import { getUserInfo } from "../Auth";
import { push } from "connected-react-router";

const openNotificationSuccess = () => {
  notification["success"]({
    message: "Subscription",
    description: "you have successfully subscribed",
  });
};
const openNotificationError = (msg) => {
  notification["error"]({
    message: "Subscription",
    description: msg,
  });
};

export default (token, followObject) => async (dispatch, getState) => {
  console.log(token);
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { subscribePlan: true },
  });
  const userToken = getState().auth.authUser;
  const couponName = getState().Api.coupon.name;
  let url = `/subscription/subscribe/${token}?lang=${
    getState().settings.locale.locale
  }`;
  if (couponName) url += `&coupon=${couponName}`;
  if (followObject && followObject.id) url += `&strategy=true`;
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
    if (followObject && followObject.id) {
      dispatch(toggleFollowStrategy(followObject.id, followObject.type));
      return;
    }
    await dispatch(getUserInfo());
    openNotificationSuccess();
    dispatch(push("/home"));
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
