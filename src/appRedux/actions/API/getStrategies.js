import Axios from "axios";
import { sortBy } from "lodash";
import {
  REDUX_PAGE_LOADERS,
  API,
  REDUX_STRATEGIES,
} from "../../../constants/API";

export default (otherUsername) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { getStrategies: true },
  });
  const user = getState().auth.userInfo;
  try {
    const res = await Axios({
      baseURL: API,
      url: `/strategy/get/addedIn/-1?lang=${
        getState().settings.locale.locale
      }&cb=${Date.now()}`,
      method: "GET",
    });
    let strategies = sortBy(res.data.data, (i) => i["addedIn"]).reverse();
    let owned = [],
      others = [],
      following = [],
      watching = [],
      all = [];
    if (otherUsername)
      strategies.map((st) => {
        if (st.username === otherUsername) owned.push(st);
        else others.push(st);
        if (st.followersIds.includes(otherUsername)) following.push(st);
        if (st.watchersIds.includes(otherUsername)) watching.push(st);
        all.push(st);
        return st;
      });
    else
      strategies.map((st) => {
        if (st.public) {
          // if (true) {
          let profitFactor = st.wonMoney / st.lostMoney;
          profitFactor = profitFactor ? profitFactor : 0;
          let winningRate =
            (st.wonOrders / (st.wonOrders + st.lostOrders)) * 100;
          winningRate = winningRate ? winningRate : 0;
          if (profitFactor >= 1 && winningRate >= 50) st.geniune = true;
          else st.geniune = false;
          if (st.username === user.username) owned.push(st);
          else {
            others.push(st);
          }
          if (st.followersIds.includes(user.username)) following.push(st);
          if (st.watchersIds.includes(user.username)) watching.push(st);
          all.push(st);
        }
        return st;
      });
    dispatch({
      type: REDUX_STRATEGIES,
      value: { all, owned, others, watching, following },
    });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getStrategies: false } });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getStrategies: false } });
  }
};
