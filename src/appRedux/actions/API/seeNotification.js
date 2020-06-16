import Axios from "axios";
import {
  REDUX_PAGE_LOADERS,
  API,
  REDUX_STRATEGIES,
  REDUX_PAYMENT_SOURCES,
  REDUX_NOTIFICATION,
} from "../../../constants/API";
import { getUserInfo } from "../Auth";

export default () => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { seeNotification: true },
  });
  const userToken = getState().auth.authUser;
  try {
    const res = await Axios({
      baseURL: API,
      url: `/notification/watch?lang=${getState().settings.locale.locale}`,
      method: "put",
      headers: {
        token: userToken,
      },
    });
    let notification = getState().Api.notification;
    notification.allSaw = true;
    dispatch({
      type: REDUX_NOTIFICATION,
      value: { ...notification },
    });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { seeNotification: false } });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: REDUX_PAGE_LOADERS, value: { seeNotification: false } });
  }
};
