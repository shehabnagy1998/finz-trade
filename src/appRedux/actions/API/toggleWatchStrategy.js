import Axios from "axios";
import {
  REDUX_PAGE_LOADERS,
  API,
  REDUX_STRATEGIES,
} from "../../../constants/API";
import getStrategies from "./getStrategies";
import getStrategyById from "./getStrategyById";
import { notification } from "antd";
import { getUserInfo } from "../Auth";

const openNotificationSuccess = () => {
  notification["success"]({
    message: "Strategies",
    description: "you have successfully watched strategy",
  });
};
const openNotificationSuccess2 = () => {
  notification["success"]({
    message: "Strategies",
    description: "you have successfully unwatched strategy",
  });
};
const openNotificationError = (msg) => {
  notification["error"]({
    message: "Strategies",
    description: msg,
  });
};

export default (id, type, sortObj) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { toggleWatchStrategy: id },
  });
  const userToken = getState().auth.authUser;
  let newStrategies = getState().Api.strategies;
  try {
    let [strategy] = newStrategies.watching.filter((i) => i._id === id);

    if (strategy) {
      const res = await Axios({
        baseURL: API,
        url: `/strategy/unwatch/${id}?lang=${
          getState().settings.locale.locale
        }`,
        method: "DELETE",
        headers: {
          token: userToken,
        },
      });
      openNotificationSuccess2();
    } else {
      const res = await Axios({
        baseURL: API,
        url: `/strategy/watch/${id}`,
        method: "PUT",
        headers: {
          token: userToken,
        },
      });
      openNotificationSuccess();
    }
    if (type === "all") {
      dispatch(getStrategies());
    }
    if (type === "one") {
      dispatch(getStrategies());
      dispatch(getStrategyById(id));
    }
    await dispatch(getUserInfo());

    dispatch({
      type: REDUX_PAGE_LOADERS,
      value: { toggleWatchStrategy: null },
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: REDUX_PAGE_LOADERS,
      value: { toggleWatchStrategy: null },
    });
    if (error.response && error.response.data) {
      openNotificationError(error.response.data.message);
      return;
    }
    openNotificationError("sorry failed to watch strategy, try again");
  }
};
