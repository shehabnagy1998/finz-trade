import Axios from "axios";
import {
  REDUX_PAGE_LOADERS,
  API,
  REDUX_OTHER_USER,
} from "../../../constants/API";

export default (username) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { getOtherUser: true },
  });
  const userToken = getState().auth.authUser;
  try {
    const res = await Axios({
      baseURL: API,
      url: `/user/info/${username}?stats=true`,
      method: "GET",
      headers: {
        token: userToken,
      },
    });
    console.log(res);
    dispatch({
      type: REDUX_OTHER_USER,
      value: { ...res.data.data.user, stats: res.data.stats },
    });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getOtherUser: false } });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getOtherUser: false } });
  }
};
