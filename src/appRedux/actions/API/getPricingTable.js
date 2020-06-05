import Axios from "axios";
import {
  REDUX_PAGE_LOADERS,
  API,
  REDUX_STRATEGIES,
  REDUX_PRICING_TABLE,
} from "../../../constants/API";

export default (token) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { addPricingTable: true },
  });
  const userToken = getState().auth.authUser;
  try {
    const res = await Axios({
      baseURL: API,
      url: "/plan/get?cb="+Date.now(),
      method: "GET",
    });

    dispatch({ type: REDUX_PRICING_TABLE, value: res.data.data });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { addPricingTable: false } });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: REDUX_PAGE_LOADERS, value: { addPricingTable: false } });
  }
};
