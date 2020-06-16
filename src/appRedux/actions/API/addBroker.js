import Axios from "axios";
import {
  REDUX_PAGE_LOADERS,
  API,
  REDUX_STRATEGIES,
  REDUX_BROKERS,
} from "../../../constants/API";
import getBrokers from "./getBrokers";
import { notification } from "antd";

const openNotificationSuccess = () => {
  notification["success"]({
    message: "Broker",
    description: "you have successfully added new broker",
  });
};

const openNotificationError = (msg) => {
  notification["error"]({
    message: "Broker",
    description: msg,
  });
};

export default (obj) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { addBroker: true },
  });
  const userToken = getState().auth.authUser;
  try {
    const res = await Axios({
      baseURL: API,
      url: `/broker/add/${obj.id}/${obj.name}?lang=${
        getState().settings.locale.locale
      }`,
      method: "POST",
      headers: {
        token: userToken,
      },
    });
    openNotificationSuccess();
    await dispatch(getBrokers());
    dispatch({ type: REDUX_PAGE_LOADERS, value: { addBroker: false } });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: REDUX_PAGE_LOADERS, value: { addBroker: false } });
    if (error.response && error.response.data) {
      openNotificationError(error.response.data.message);
      return;
    }
    openNotificationError("sorry failed to add new broker, try again");
  }
};
