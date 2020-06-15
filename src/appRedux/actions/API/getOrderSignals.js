import Axios from "axios";
import {
  REDUX_PAGE_LOADERS,
  API,
  REDUX_ORDER_SIGNALS,
} from "../../../constants/API";
import { notification } from "antd";

const openNotificationError = (msg) => {
  notification["error"]({
    message: "Order Signals",
    description: msg,
  });
};
const openNotificationWarnin = (msg) => {
  notification["warn"]({
    message: "Order Signals",
    description: msg,
  });
};

export default (order) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { getOrderSignals: order._id },
  });
  const userToken = getState().auth.authUser;
  try {
    const res = await Axios({
      baseURL: API,
      url:
        "/signal/getAll/1/50/executedIn/1?cb=" +
        Date.now() +
        "&superTicket=" +
        order.ticket,
      method: "GET",
      headers: {
        token: userToken,
      },
    });
    dispatch({
      type: REDUX_ORDER_SIGNALS,
      value: { list: res.data.data, count: res.data.count, order },
    });
    if (res.data.count <= 0)
      openNotificationWarnin("This order doesn't have any signals");
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getOrderSignals: null } });
  } catch (error) {
    console.log(error.response);
    openNotificationError("Failed to get order signals");
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getOrderSignals: null } });
  }
};
