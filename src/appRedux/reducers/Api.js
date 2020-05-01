import {
  REDUX_STRATEGIES,
  REDUX_NOTIFICATION,
  REDUX_RECENT_ORDERS,
} from "../../constants/API";

const INIT_STATE = {
  strategies: [],
  notification: { fetchMore: true, arr: [] },
  recentOrders: [],
  user: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjI3bWRtbzdzbiIsInJvbGUiOiJ1c2VyIiwiY3JlYXRlZEluIjoxNTg2MDcwMzIxODU3LCJpYXQiOjE1ODYwNzAzMjF9.qsDaJuwUCfo3ZlFWEEqXjjRgzUiqcuX89zPHd2Ik73M",
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case REDUX_STRATEGIES:
      return { ...state, strategies: action.value };

    case REDUX_NOTIFICATION:
      return { ...state, notification: action.value };

    case REDUX_RECENT_ORDERS:
      return { ...state, recentOrders: action.value };

    default:
      return state;
  }
};
