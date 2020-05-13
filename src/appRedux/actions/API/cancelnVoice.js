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
    value: { cancelInVoice: id },
  });
  const userToken = getState().auth.authUser;
  try {
    const res = await Axios({
      baseURL: API,
      url: `/invoice/cancel/${id}`,
      method: "DELETE",
      headers: {
        token: userToken,
      },
    });
    let inVoices = getState().Api.inVoices;
    inVoices.list = inVoices.list.filter((i) => i.id !== id);

    dispatch({ type: REDUX_INVOICES, value: inVoices });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { cancelInVoice: null } });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: REDUX_PAGE_LOADERS, value: { cancelInVoice: null } });
  }
};
