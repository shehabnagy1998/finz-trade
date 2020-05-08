import Axios from "axios";
import {
  REDUX_PAGE_LOADERS,
  API,
  REDUX_STRATEGIES,
} from "../../../constants/API";

export default (token) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { addPaymentSource: true },
  });
  const userToken = getState().Api.user.token;
  try {
    const res = await Axios({
      baseURL: API,
      url: "/user/paymentSource",
      method: "POST",
      data: { token },
      headers: {
        token: userToken,
      },
    });
    // dispatch({ type: REDUX_STRATEGIES, value: res.data.data });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { addPaymentSource: false } });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: REDUX_PAGE_LOADERS, value: { addPaymentSource: false } });
  }
};
