import createSagaMiddleware from "redux-saga";
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import rootSaga from "../sagas/index";
import createRootReducer from "../reducers";
import {
  persistStore,
  persistReducer,
  persistCombineReducers,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const createBrowserHistory = require("history").createBrowserHistory;
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["settings"],
};

export const history = createBrowserHistory();

const routeMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const middlewares = [thunk, sagaMiddleware, routeMiddleware];

export default function configureStore(preloadedState) {
  const persistedReducer = persistCombineReducers(
    persistConfig,
    createRootReducer(history)
  );

  const store = createStore(
    persistedReducer, // root reducer with router state
    compose(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        ...middlewares
      )
    )
  );

  let persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);
  return { store, persistor };
}
