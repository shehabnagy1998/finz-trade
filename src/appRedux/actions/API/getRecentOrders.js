import Axios from "axios";
import {
  REDUX_PAGE_LOADERS,
  API,
  REDUX_RECENT_ORDERS,
} from "../../../constants/API";

export default (_) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { getRecentOrders: true },
  });
  const token = getState().Api.user.token;

  try {
    const res = await Axios({
      baseURL: API,
      url: "/order/get/1/5",
      method: "GET",
      headers: {
        token,
      },
    });
    dispatch({ type: REDUX_RECENT_ORDERS, value: res.data.data });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getRecentOrders: false } });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getRecentOrders: false } });
  }
};
