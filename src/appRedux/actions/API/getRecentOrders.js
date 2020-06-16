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
  const userToken = getState().auth.authUser;
  try {
    const res = await Axios({
      baseURL: API,
      url: `/order/get/1/5?cb=${Date.now()}`,
      method: "GET",
      headers: {
        token: userToken,
      },
    });
    dispatch({ type: REDUX_RECENT_ORDERS, value: res.data.data });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getRecentOrders: false } });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getRecentOrders: false } });
  }
};
