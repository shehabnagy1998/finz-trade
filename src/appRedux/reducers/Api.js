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
  REDUX_SIGNALS,
  REDUX_STRATEGY,
  REDUX_OTHER_USER,
  REDUX_ORDER_SIGNALS,
} from "../../constants/API";

const INIT_STATE = {
  strategies: { all: [], owned: [], others: [], watching: [], following: [] },
  strategy: { data: {}, followers: [], watchers: [], orders: [], stats: {} },
  notification: { fetchMore: true, arr: [], allSaw: true },
  recentOrders: [],
  pageLoaders: {},
  pageErrors: {},
  pageTemps: {},
  paymentSource: {},
  pricingTable: [],
  brokers: [],
  inVoices: { list: [], hasMore: false },
  coupon: {},
  signals: { list: [], count: 0 },
  orderSignals: { list: [], count: 0, order: {} },
  otherUser: {},
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case REDUX_STRATEGIES:
      return { ...state, strategies: action.value };

    case REDUX_STRATEGY:
      return { ...state, strategy: action.value };

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

    case REDUX_SIGNALS:
      return { ...state, signals: action.value };

    case REDUX_ORDER_SIGNALS:
      return { ...state, orderSignals: action.value };

    case REDUX_OTHER_USER:
      return { ...state, otherUser: action.value };

    default:
      return state;
  }
};
