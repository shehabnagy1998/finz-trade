import React from "react";
import { NavLink } from "react-router-dom";
import IntlMessages from "../../util/IntlMessages";
import { useSelector } from "react-redux";

const HorizontalNav = () => {
  const { userInfo } = useSelector(({ auth }) => auth);
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
      {userInfo.plan && userInfo.plan.name ? null : (
        <li className="navbar-list-item">
          <NavLink
            activeClassName={"active"}
            className="nav-item"
            to="/pricing"
          >
            <IntlMessages id="pricing" />
          </NavLink>
        </li>
      )}
    </ul>
  );
};

HorizontalNav.propTypes = {};

export default HorizontalNav;
