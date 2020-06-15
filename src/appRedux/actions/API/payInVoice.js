import Axios from "axios";
import {
  REDUX_PAGE_LOADERS,
  API,
  REDUX_STRATEGIES,
  REDUX_BROKERS,
  REDUX_INVOICES,
} from "../../../constants/API";
import { notification } from "antd";

const openNotificationSuccess = () => {
  notification["success"]({
    message: "Invoices",
    description: "you have successfully paied invoice",
  });
};
const openNotificationError = (msg) => {
  notification["error"]({
    message: "Invoices",
    description: msg,
  });
};

export default (id) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { payInVoice: id },
  });
  const userToken = getState().auth.authUser;
  try {
    const res = await Axios({
      baseURL: API,
      url: `/invoice/pay/${id}`,
      method: "PUT",
      headers: {
        token: userToken,
      },
    });
    let inVoices = getState().Api.inVoices;
    inVoices.list = inVoices.list.map((i) => {
      if (i.id) i.status = "paid";
      return i;
    });
    openNotificationSuccess();
    dispatch({ type: REDUX_INVOICES, value: inVoices });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { payInVoice: null } });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: REDUX_PAGE_LOADERS, value: { payInVoice: false } });
    if (error.response && error.response.data) {
      openNotificationError(error.response.data.message);
      return;
    }
    openNotificationError("sorry failed to pay invoice, try again");
  }
};
