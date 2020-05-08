import Axios from "axios";
import {
  REDUX_PAGE_LOADERS,
  API,
  REDUX_STRATEGIES,
  REDUX_BROKERS,
} from "../../../constants/API";
import getBrokers from "./getBrokers";
import { notification } from "antd";

const openNotificationError = () => {
  notification["error"]({
    message: "Broker",
    description: "sorry failed to add new broker, try again",
  });
};

export default (obj) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { addBroker: true },
  });
  const userToken = getState().Api.user.token;
  try {
    const res = await Axios({
      baseURL: API,
      url: `/broker/add/${obj.id}/${obj.name}`,
      method: "POST",
      headers: {
        token: userToken,
      },
    });
    await dispatch(getBrokers());
    dispatch({ type: REDUX_PAGE_LOADERS, value: { addBroker: false } });
  } catch (error) {
    console.log(error.response);
    openNotificationError();
    dispatch({ type: REDUX_PAGE_LOADERS, value: { addBroker: false } });
  }
};
