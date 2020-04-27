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
        <NavLink activeClassName={"active"} className="nav-item" to="/home">
          <IntlMessages id="sidebar.strategies" />
        </NavLink>
      </li>
      <li className="navbar-list-item">
        <NavLink activeClassName={"active"} className="nav-item" to="/home">
          <IntlMessages id="sidebar.orders" />
        </NavLink>
      </li>
      <li className="navbar-list-item">
        <NavLink activeClassName={"active"} className="nav-item" to="/home">
          <IntlMessages id="sidebar.stats" />
        </NavLink>
      </li>
      <li className="navbar-list-item">
        <NavLink activeClassName={"active"} className="nav-item" to="/home">
          <IntlMessages id="sidebar.inVoices" />
        </NavLink>
      </li>
    </ul>
  );
};

HorizontalNav.propTypes = {};

export default HorizontalNav;
