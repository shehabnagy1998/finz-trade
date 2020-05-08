import {
  REDUX_STRATEGIES,
  REDUX_NOTIFICATION,
  REDUX_RECENT_ORDERS,
  REDUX_PAGE_ERRORS,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_TEMPS,
  REDUX_PAYMENT_SOURCES,
  REDUX_USER,
  REDUX_PRICING_TABLE,
  REDUX_BROKERS,
  REDUX_INVOICES,
  REDUX_COUPON,
} from "../../constants/API";

const INIT_STATE = {
  strategies: { owned: [], others: [], watching: [], following: [] },
  notification: { fetchMore: true, arr: [] },
  recentOrders: [],
  pageLoaders: {},
  pageErrors: {},
  pageTemps: {},
  paymentSource: {},
  pricingTable: [],
  brokers: [],
  inVoices: { list: [], hasMore: false },
  coupon: {},
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

    case REDUX_PAGE_ERRORS:
      return { ...state, pageErrors: { ...state.pageErrors, ...action.value } };

    case REDUX_PAGE_LOADERS:
      return {
        ...state,
        pageLoaders: { ...state.pageLoaders, ...action.value },
      };

    case REDUX_PAGE_TEMPS:
      return { ...state, pageTemps: { ...state.pageTemps, ...action.value } };

    case REDUX_PAYMENT_SOURCES:
      return { ...state, paymentSource: action.value };

    case REDUX_USER:
      return { ...state, user: action.value };

    case REDUX_PRICING_TABLE:
      return { ...state, pricingTable: action.value };

    case REDUX_BROKERS:
      return { ...state, brokers: action.value };

    case REDUX_INVOICES:
      return { ...state, inVoices: action.value };

    case REDUX_COUPON:
      return { ...state, coupon: action.value };

    default:
      return state;
  }
};
