import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Home from "./Home";
import Profile from "./Profile";
import PricingTable from "./PricingTable";
import InVoices from "./InVoices";
import Orders from "./Orders";
import Strategy from "./Strategy";

const App = ({ match }) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}home`} component={Home} />
      <Route path={`${match.url}profile/:id`} component={Profile} />
      <Route path={`${match.url}pricing`} component={PricingTable} />
      <Route path={`${match.url}invoices`} component={InVoices} />
      <Route path={`${match.url}orders`} component={Orders} />
      <Route path={`${match.url}strategy/:id`} component={Strategy} />
      <Redirect to={`${match.url}home`} />
    </Switch>
  </div>
);

export default App;
