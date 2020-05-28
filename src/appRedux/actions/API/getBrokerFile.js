import Axios from "axios";
import {
  REDUX_PAGE_LOADERS,
  API,
  REDUX_BROKER_FILE,
  CDN,
} from "../../../constants/API";

const downloadURI = (uri, name) => {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default (_) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { getBrokerFile: true },
  });
  const userToken = getState().auth.authUser;
  try {
    const res = await Axios({
      baseURL: API,
      url: "/user/brokerFile",
      method: "GET",
      headers: {
        token: userToken,
      },
    });
    let file = res.data.file;
    if (file) {
      let link = CDN + file;
      let name = "Broker File";
      console.log(res);
      console.log(link);
      downloadURI(link, name);
    }
    dispatch({ type: REDUX_BROKER_FILE, value: res.data.data });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getBrokerFile: false } });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getBrokerFile: false } });
  }
};
