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
  const userToken = getState().auth.authUser;
  try {
    const res = await Axios({
      baseURL: API,
      url: `http://finztrade.com/notification/get/${position.from}/${position.to}?seen=false`,
      method: "GET",
      headers: {
        token: userToken,
      },
    });
    console.log(res);
    if (res.data.data.length <= 0) {
      const resSeen = await Axios({
        baseURL: API,
        url: `http://finztrade.com/notification/get/${position.from}/${position.to}?seen=true`,
        method: "GET",
        headers: {
          token: userToken,
        },
      });

      dispatch({
        type: REDUX_NOTIFICATION,
        value: { fetchMore: false, arr: resSeen.data.data, allSaw: true },
      });
    } else if (res.data.data.length >= 1 && res.data.data.length < 50) {
      const resSeen = await Axios({
        baseURL: API,
        url: `http://finztrade.com/notification/get/${position.from}/${
          50 - res.data.data.length
        }?seen=true`,
        method: "GET",
        headers: {
          token: userToken,
        },
      });
      dispatch({
        type: REDUX_NOTIFICATION,
        value: {
          fetchMore: false,
          arr: [...res.data.data, ...resSeen.data.data],
          allSaw: false,
        },
      });
    } else {
      dispatch({
        type: REDUX_NOTIFICATION,
        value: { fetchMore: true, arr: res.data.data },
        allSaw: false,
      });
    }

    // dispatch({
    //   type: REDUX_NOTIFICATION,
    //   value: { fetchMore: true, arr: res.data.data },
    // });

    // if (res.data.data.length >= 1) {
    //   if (position.from === 1) {
    //     dispatch({
    //       type: REDUX_NOTIFICATION,
    //       value: { fetchMore: true, arr: res.data.data },
    //     });
    //   } else {
    //     dispatch({
    //       type: REDUX_NOTIFICATION,
    //       value: {
    //         fetchMore: true,
    //         arr: [...getState().Api.notification.arr, res.data.data],
    //       },
    //     });
    //   }
    // } else {
    //   dispatch({
    //     type: REDUX_NOTIFICATION,
    //     value: {
    //       fetchMore: false,
    //       arr: [...getState().Api.notification.arr],
    //     },
    //   });
    // }

    dispatch({ type: REDUX_PAGE_LOADERS, value: { getNotification: false } });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getNotification: false } });
  }
};
