import React from "react";
import { NavLink } from "react-router-dom";
import IntlMessages from "../../util/IntlMessages";

const HorizontalNav = () => {
  return (
    <ul className="navbar-list">
      <li className="navbar-list-item">
        <NavLink activeClassName={"active"} className="nav-item" to="/home">
          <IntlMessages id="home" />
        </NavLink>
      </li>

      <li className="navbar-list-item">
        <NavLink activeClassName={"active"} className="nav-item" to="/orders">
          <IntlMessages id="orders" />
        </NavLink>
      </li>

      <li className="navbar-list-item">
        <NavLink
          activeClassName={"active"}
          className="nav-item"
          to="/watchlist"
        >
          <IntlMessages id="watchlist" />
        </NavLink>
      </li>
    </ul>
  );
};

HorizontalNav.propTypes = {};

export default HorizontalNav;
