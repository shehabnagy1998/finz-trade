import Axios from "axios";
import {
  REDUX_PAGE_LOADERS,
  API,
  REDUX_STRATEGIES,
  REDUX_BROKERS,
  REDUX_INVOICES,
} from "../../../constants/API";

export default (id) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { payInVoice: id },
  });
  const userToken = getState().Api.user.token;
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

    dispatch({ type: REDUX_INVOICES, value: inVoices });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { payInVoice: null } });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: REDUX_PAGE_LOADERS, value: { payInVoice: null } });
  }
};
