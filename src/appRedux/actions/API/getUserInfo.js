import Axios from "axios";
import { REDUX_PAGE_LOADERS, API, REDUX_USER } from "../../../constants/API";

export default (_) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { getUserInfo: true },
  });
  const user = getState().Api.user;

  try {
    const res = await Axios({
      baseURL: API,
      url: "/user/info",
      method: "GET",
      headers: {
        token: user.token,
      },
    });
    dispatch({
      type: REDUX_USER,
      value: {
        ...user,
        ...res.data.data.user,
        plan: res.data.data.subscription.plan,
        subscription: res.data.data.subscription.subscription.subscription,
      },
    });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getUserInfo: false } });
  } catch (error) {
    console.log(error.response);
    if (error.response && error.response.data) {
      dispatch({ type: REDUX_USER, value: {} });
      dispatch({ type: REDUX_PAGE_LOADERS, value: { getUserInfo: false } });
    }
  }
};
