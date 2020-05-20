import Axios from "axios";
import {
  REDUX_PAGE_LOADERS,
  API,
  REDUX_STRATEGIES,
  REDUX_BROKERS,
} from "../../../constants/API";

export default () => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { getBrokers: true },
  });
  const userToken = getState().auth.authUser;
  try {
    const res = await Axios({
      baseURL: API,
      url: "/broker/get/",
      method: "GET",
      headers: {
        token: userToken,
      },
    });
    dispatch({ type: REDUX_BROKERS, value: res.data.data });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getBrokers: false } });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getBrokers: false } });
  }
};
