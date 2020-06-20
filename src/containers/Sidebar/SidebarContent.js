import React from "react";
import { Menu } from "antd";
import { Link, NavLink } from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE,
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";
import { useSelector } from "react-redux";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const SidebarContent = () => {
  let { navStyle, themeType, pathname } = useSelector(
    ({ settings }) => settings
  );
  const { userInfo } = useSelector(({ auth }) => auth);

  const getNoHeaderClass = (navStyle) => {
    if (
      navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR ||
      navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR
    ) {
      return "gx-no-header-notifications";
    }
    return "";
  };
  const getNavStyleSubMenuClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };
  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split("/")[1];
  return (
    <>
      <SidebarLogo />
      <div className="gx-sidebar-content">
        <div
          className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}
        >
          <UserProfile />
          <AppsNavigation />
        </div>
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <ul className="navbar-list">
            <li className="navbar-list-item">
              <NavLink
                activeClassName={"active"}
                className="nav-item"
                to="/home"
              >
                <IntlMessages id="home" />
              </NavLink>
            </li>

            <li className="navbar-list-item">
              <NavLink
                activeClassName={"active"}
                className="nav-item"
                to="/orders"
              >
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
        </CustomScrollbars>
      </div>
    </>
  );
};

SidebarContent.propTypes = {};
export default SidebarContent;
