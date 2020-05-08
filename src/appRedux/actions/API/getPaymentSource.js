import Axios from "axios";
import {
  REDUX_PAGE_LOADERS,
  API,
  REDUX_STRATEGIES,
  REDUX_PAYMENT_SOURCES,
} from "../../../constants/API";

export default (token) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { getPaymentSource: true },
  });
  const userToken = getState().Api.user.token;
  try {
    const res = await Axios({
      baseURL: API,
      url: `/user/paymentSource/${token}`,
      method: "GET",
      headers: {
        token: userToken,
      },
    });
    dispatch({ type: REDUX_PAYMENT_SOURCES, value: res.data.source });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getPaymentSource: false } });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getPaymentSource: false } });
  }
};
