import Axios from "axios";
import {
  REDUX_PAGE_LOADERS,
  API,
  REDUX_STRATEGIES,
  REDUX_BROKERS,
} from "../../../constants/API";

export default (id) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { deleteBroker: id },
  });
  const userToken = getState().Api.user.token;
  try {
    const res = await Axios({
      baseURL: API,
      url: `/broker/delete/${id}`,
      method: "DELETE",
      headers: {
        token: userToken,
      },
    });
    let newBrokers = getState().Api.brokers.filter((i) => i._id !== id);
    dispatch({ type: REDUX_BROKERS, value: newBrokers });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { deleteBroker: null } });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: REDUX_PAGE_LOADERS, value: { deleteBroker: null } });
  }
};
