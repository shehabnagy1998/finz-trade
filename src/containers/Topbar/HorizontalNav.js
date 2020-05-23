import React from "react";
import { NavLink } from "react-router-dom";
import IntlMessages from "../../util/IntlMessages";

const HorizontalNav = () => {
  return (
    <ul className="navbar-list">
      <li className="navbar-list-item">
        <NavLink activeClassName={"active"} className="nav-item" to="/home">
          <IntlMessages id="sidebar.home" />
        </NavLink>
      </li>

      <li className="navbar-list-item">
        <NavLink activeClassName={"active"} className="nav-item" to="/orders">
          <IntlMessages id="sidebar.orders" />
        </NavLink>
      </li>

      <li className="navbar-list-item">
        <NavLink
          activeClassName={"active"}
          className="nav-item"
          to="/watchlist"
        >
          {/* <IntlMessages id="sidebar.inVoices" /> */}
          Watchlist
        </NavLink>
      </li>
    </ul>
  );
};

HorizontalNav.propTypes = {};

export default HorizontalNav;
