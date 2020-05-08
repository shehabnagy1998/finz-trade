import Axios from "axios";
import {
  REDUX_PAGE_LOADERS,
  API,
  REDUX_NOTIFICATION,
} from "../../../constants/API";

export default (position) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { getNotification: true },
  });
  const userToken = getState().Api.user.token;
  try {
    const res = await Axios({
      baseURL: API,
      url: `http://finztrade.com/notification/get/${position.from}/${position.to}`,
      method: "GET",
      headers: {
        token: userToken,
      },
    });

    if (res.data.data.length >= 1) {
      if (position.from === 1) {
        dispatch({
          type: REDUX_NOTIFICATION,
          value: { fetchMore: true, arr: res.data.data },
        });
      } else {
        dispatch({
          type: REDUX_NOTIFICATION,
          value: {
            fetchMore: true,
            arr: [...getState().Api.notification.arr, res.data.data],
          },
        });
      }
    } else {
      dispatch({
        type: REDUX_NOTIFICATION,
        value: {
          fetchMore: false,
          arr: [...getState().Api.notification.arr],
        },
      });
    }

    dispatch({ type: REDUX_PAGE_LOADERS, value: { getNotification: false } });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getNotification: false } });
  }
};
