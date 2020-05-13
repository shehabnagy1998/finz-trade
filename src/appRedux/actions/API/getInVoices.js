import Axios from "axios";
import {
  REDUX_PAGE_LOADERS,
  API,
  REDUX_STRATEGIES,
  REDUX_INVOICES,
} from "../../../constants/API";

export default (lastID) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { getInVoices: true },
  });
  const userToken = getState().auth.authUser;
  let url = "/invoice/get";
  if (lastID) url += `?last=${lastID}`;
  try {
    const res = await Axios({
      baseURL: API,
      url,
      method: "GET",
      headers: {
        token: userToken,
      },
    });
    console.log(res);
    let invoices = res.data.data.invoices.data.map((i) => ({
      ...i,
      plan_description: i.lines.data[0].description,
      period_start_at: i.lines.data[0].period.start,
      period_end_at: i.lines.data[0].period.end,
      amount: i.lines.data[0].amount,
    }));
    if (lastID) {
      let oldList = getState().Api.inVoices.list;
      dispatch({
        type: REDUX_INVOICES,
        value: {
          list: [...oldList, ...invoices],
          hasMore: res.data.data.invoices.has_more,
        },
      });
    } else
      dispatch({
        type: REDUX_INVOICES,
        value: { list: invoices, hasMore: res.data.data.invoices.has_more },
      });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getInVoices: false } });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getInVoices: false } });
  }
};
