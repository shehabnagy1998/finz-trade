import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Home from "./Home";
import Profile from "./Profile";
import PricingTable from "./PricingTable";
import Orders from "./Orders";
import Strategy from "./Strategy";
import Watchlist from "./Watchlist";

const App = ({ match }) => {
  return (
    <div className="gx-main-content-wrapper">
      <Switch>
        <Route path={`${match.url}home`} component={Home} />
        <Route path={`${match.url}profile/`} component={Profile} />
        <Route path={`${match.url}pricing`} component={PricingTable} />
        <Route path={`${match.url}watchlist`} component={Watchlist} />
        <Route path={`${match.url}orders`} component={Orders} />
        <Route path={`${match.url}strategy/:id`} component={Strategy} />
        <Redirect to={`${match.url}home`} />
      </Switch>
    </div>
  );
};

export default App;
