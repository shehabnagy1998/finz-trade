import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Home from "./Home/index";
import Profile from "./Profile/index";
import PricingTable from "./PricingTable";
import InVoices from "./InVoices";

const App = ({ match }) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}home`} component={Home} />
      <Route path={`${match.url}profile/:id`} component={Profile} />
      <Route path={`${match.url}pricing`} component={PricingTable} />
      <Route path={`${match.url}invoices`} component={InVoices} />
      <Redirect to={`${match.url}home`} />
    </Switch>
  </div>
);

export default App;
