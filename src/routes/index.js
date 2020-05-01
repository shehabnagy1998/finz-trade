import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Home from "./home/index";

const App = ({ match }) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}home`} component={Home} />
      <Redirect to={`${match.url}home`} />
    </Switch>
  </div>
);

export default App;
