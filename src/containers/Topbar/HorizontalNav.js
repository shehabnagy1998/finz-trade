import React from "react";
import { Link } from "react-router-dom";
import IntlMessages from "../../util/IntlMessages";

const HorizontalNav = () => {
  return (
    <ul className="navbar-list">
      <li className="navbar-list-item">
        <Link to="/home">
          <IntlMessages id="sidebar.home" />
        </Link>
      </li>
      <li className="navbar-list-item">
        <Link to="/home">
          <IntlMessages id="sidebar.strategies" />
        </Link>
      </li>
      <li className="navbar-list-item">
        <Link to="/home">
          <IntlMessages id="sidebar.orders" />
        </Link>
      </li>
      <li className="navbar-list-item">
        <Link to="/home">
          <IntlMessages id="sidebar.stats" />
        </Link>
      </li>
      <li className="navbar-list-item">
        <Link to="/home">
          <IntlMessages id="sidebar.inVoices" />
        </Link>
      </li>
    </ul>
  );
};

HorizontalNav.propTypes = {};

export default HorizontalNav;
