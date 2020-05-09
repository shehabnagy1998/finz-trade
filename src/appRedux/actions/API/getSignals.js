import Axios from "axios";
import { REDUX_PAGE_LOADERS, API, REDUX_SIGNALS } from "../../../constants/API";

export default (page, status) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { getSignals: true },
  });
  let to = page * 5;
  let from = to - 4;
  const token = getState().Api.user.token;
  let url = `/signal/get/${from}/${to}`;
  if (status) url += `?status=${status}`;
  try {
    const res = await Axios({
      baseURL: API,
      url,
      method: "GET",
      headers: {
        token,
      },
    });
    console.log(res);
    dispatch({
      type: REDUX_SIGNALS,
      value: { list: res.data.data, count: res.data.count },
    });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getSignals: false } });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getSignals: false } });
  }
};