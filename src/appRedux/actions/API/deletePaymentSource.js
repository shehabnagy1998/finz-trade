import Axios from "axios";
import {
  REDUX_PAGE_LOADERS,
  API,
  REDUX_STRATEGIES,
} from "../../../constants/API";
import { notification } from "antd";

const openNotificationSuccess = () => {
  notification["success"]({
    message: "Payment method",
    description: "you have successfully deleted payment method",
  });
};
const openNotificationError = (msg) => {
  notification["error"]({
    message: "Payment method",
    description: msg,
  });
};

export default (id) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { deletePaymentSource: true },
  });
  const userToken = getState().auth.authUser;
  try {
    const res = await Axios({
      baseURL: API,
      url: `/user/paymentSource/${id}?lang=${
        getState().settings.locale.locale
      }`,
      method: "DELETE",
      headers: {
        token: userToken,
      },
    });
    // dispatch({ type: REDUX_STRATEGIES, value: res.data.data });
    openNotificationSuccess();
    dispatch({
      type: REDUX_PAGE_LOADERS,
      value: { deletePaymentSource: false },
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: REDUX_PAGE_LOADERS,
      value: { deletePaymentSource: false },
    });
    if (error.response && error.response.data) {
      openNotificationError(error.response.data.message);
      return;
    }
    openNotificationError("sorry failed to delete payment method, try again");
  }
};
