import Axios from "axios";
import {
  REDUX_PAGE_LOADERS,
  API,
  REDUX_STRATEGIES,
} from "../../../constants/API";
import getStrategies from "./getStrategies";
import getStrategyById from "./getStrategyById";
import { notification } from "antd";
import subscribePlan from "./subscribePlan";

const openNotificationSuccess = () => {
  notification["success"]({
    message: "Strategies",
    description: "you have successfully followed strategy",
  });
};
const openNotificationError = (msg) => {
  notification["error"]({
    message: "Strategies",
    description: msg,
  });
};

export default (id, type, stripeId) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { toggleFollowStrategy: id },
  });
  const userToken = getState().auth.authUser;
  let newStrategies = getState().Api.strategies;
  try {
    let [strategy] = newStrategies.following.filter((i) => i._id === id);
    let res;
    console.log(strategy);
    if (strategy) {
      res = await Axios({
        baseURL: API,
        url: `/strategy/unfollow/${id}`,
        method: "DELETE",
        headers: {
          token: userToken,
        },
      });
    } else {
      res = await Axios({
        baseURL: API,
        url: `/strategy/follow/${id}`,
        method: "PUT",
        headers: {
          token: userToken,
        },
      });
    }

    if (type === "all") {
      dispatch(getStrategies());
    }
    if (type === "one") {
      dispatch(getStrategies());
      dispatch(getStrategyById(id));
    }
    openNotificationSuccess();
    dispatch({
      type: REDUX_PAGE_LOADERS,
      value: { toggleFollowStrategy: null },
    });
  } catch (error) {
    console.log(error.response);
    if (error.response && error.response.data) {
      if (error.response.status === 401) {
        await dispatch(subscribePlan(stripeId, { id, type }));
        return;
      }
      dispatch({
        type: REDUX_PAGE_LOADERS,
        value: { toggleFollowStrategy: null },
      });
      openNotificationError(error.response.data.message);
      return;
    }
    dispatch({
      type: REDUX_PAGE_LOADERS,
      value: { toggleFollowStrategy: null },
    });
    openNotificationError("sorry failed to follow strategy, try again");
  }
};
