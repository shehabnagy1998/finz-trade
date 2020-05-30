import Axios from "axios";
import {
  REDUX_PAGE_LOADERS,
  API,
  REDUX_STRATEGIES,
  REDUX_BROKERS,
  REDUX_STRATEGY,
} from "../../../constants/API";

export default (id) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { getStrategyById: true },
  });
  const userToken = getState().auth.authUser;
  try {
    const res = await Axios({
      baseURL: API,
      url: `/strategy/get/${id}?cb=Date.now()`,
      method: "GET",
      headers: {
        token: userToken,
      },
    });
    const ordersRes = await Axios({
      baseURL: API,
      url: `/order/get/1/10?strategyId=${id}&stats=true&cb=Date.now()`,
      method: "GET",
      headers: {
        token: userToken,
      },
    });
    console.log(ordersRes);
    dispatch({
      type: REDUX_STRATEGY,
      value: {
        data: res.data.strategy,
        followers: res.data.followers,
        watchers: res.data.watchers,
        orders: ordersRes.data.data,
        stats: ordersRes.data.stats,
      },
    });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getStrategyById: false } });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getStrategyById: false } });
  }
};
