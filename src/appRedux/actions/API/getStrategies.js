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
  try {
    const res = await Axios({
      baseURL: API,
      url: "/strategy/get/addedIn/-1",
      method: "GET",
    });

    dispatch({ type: REDUX_STRATEGIES, value: res.data.data });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getStrategies: false } });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getStrategies: false } });
  }
};
