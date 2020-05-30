import Axios from "axios";
import {
  REDUX_PAGE_LOADERS,
  API,
  REDUX_STRATEGIES,
  REDUX_PAYMENT_SOURCES,
} from "../../../constants/API";
import { getUserInfo } from "../Auth";

export default (obj) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { addPayout: true },
  });
  const userToken = getState().auth.authUser;
  try {
    const res = await Axios({
      baseURL: API,
      url: `/user/payout`,
      method: "put",
      data: { ...obj },
      headers: {
        token: userToken,
      },
    });

    await dispatch(getUserInfo());
    dispatch({ type: REDUX_PAGE_LOADERS, value: { addPayout: false } });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: REDUX_PAGE_LOADERS, value: { addPayout: false } });
  }
};
