import Axios from "axios";
import {
  REDUX_PAGE_LOADERS,
  API,
  REDUX_STRATEGIES,
} from "../../../constants/API";

export default (_) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { getStrategies: true },
  });
  const user = getState().auth.userInfo;
  try {
    const res = await Axios({
      baseURL: API,
      url: "/strategy/get/addedIn/-1",
      method: "GET",
    });
    let owned = [],
      others = [],
      following = [],
      watching = [],
      all = [];
    res.data.data.map((st) => {
      if (st.username === user.username) owned.push(st);
      else others.push(st);
      if (st.followersIds.includes(user.username)) following.push(st);
      if (st.watchersIds.includes(user.username)) watching.push(st);
      all.push(st);
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
