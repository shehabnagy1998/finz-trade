import Axios from "axios";
import {
  REDUX_PAGE_LOADERS,
  API,
  REDUX_STRATEGIES,
} from "../../../constants/API";
import { notification } from "antd";

const openNotificationSuccess = () => {
  notification["success"]({
    message: "Payment Method",
    description: "you have successfully added new payment method",
  });
};

const openNotificationError = () => {
  notification["error"]({
    message: "Payment Method",
    description: "Failed to add payment method",
  });
};

export default (token) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { addPaymentSource: true },
  });

  const userToken = getState().auth.authUser;
  try {
    const res = await Axios({
      baseURL: API,
      url: `/user/paymentSource?lang=${getState().settings.locale.locale}`,
      method: "POST",
      data: { token },
      headers: {
        token: userToken,
      },
    });
    openNotificationSuccess();
    // dispatch({ type: REDUX_STRATEGIES, value: res.data.data });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { addPaymentSource: false } });
  } catch (error) {
    console.log(error.response);
    openNotificationError();
    dispatch({ type: REDUX_PAGE_LOADERS, value: { addPaymentSource: false } });
  }
};
