import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import "assets/vendors/style";
import configureStore, { history } from "./appRedux/store";
import "./firebase/firebase";
import App from "./containers/App/index";
import { StripeProvider } from "react-stripe-elements";

const store = configureStore(/* provide initial state if any */);

const NextApp = () => (
  <Provider store={store}>
    <StripeProvider apiKey="pk_test_A4NpuY8IglXSz4BGF0xQIkXE">
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </StripeProvider>
  </Provider>
);

export default NextApp;
