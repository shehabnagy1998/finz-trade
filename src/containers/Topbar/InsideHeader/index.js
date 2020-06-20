import React from "react";
import { Layout, Popover } from "antd";
import { connect, useDispatch, useSelector } from "react-redux";
import CustomScrollbars from "util/CustomScrollbars";
import languageData from "../languageData";
// import SearchBox from "components/SearchBox";
import UserInfo from "components/UserInfo";
import AppNotification from "components/AppNotification";
// import MailNotification from "components/MailNotification";
import HorizontalNav from "../HorizontalNav";
import { Link } from "react-router-dom";
import {
  switchLanguage,
  toggleCollapsedSideNav,
} from "../../../appRedux/actions/Setting";
import IntlMessages from "../../../util/IntlMessages";
import seeNotification from "../../../appRedux/actions/API/seeNotification";

const { Header } = Layout;

// const menu = (
//   <Menu onClick={handleMenuClick}>
//     <Menu.Item key="1">Products</Menu.Item>
//     <Menu.Item key="2">Apps</Menu.Item>
//     <Menu.Item key="3">Blogs</Menu.Item>
//   </Menu>
// );

// function handleMenuClick(e) {
//   message.info("Click on menu item.");
// }

const InsideHeader = () => {
  const dispatch = useDispatch();

  // const [searchText, setSearchText] = useState("");
  const locale = useSelector(({ settings }) => settings.locale);
  const navCollapsed = useSelector(({ settings }) => settings.navCollapsed);
  const { authUser } = useSelector(({ auth }) => auth);
  const notification = useSelector(({ Api }) => Api.notification);

  const languageMenu = () => (
    <CustomScrollbars className="gx-popover-lang-scroll">
      <ul className="gx-sub-popover">
        {languageData.map((language) => (
          <li
            className="gx-media gx-pointer gx-justify-content-center"
            key={JSON.stringify(language)}
            onClick={(e) => dispatch(switchLanguage(language))}
          >
            <i className={`flag flag-24 flag-${language.icon}`} />
            {/* <span className="gx-language-text">{language.name}</span> */}
          </li>
        ))}
      </ul>
    </CustomScrollbars>
  );

  // const updateSearchChatUser = (evt) => {
  //   setSearchText(evt.target.value);
  // };

  const handleSeeNotification = (_) => {
    if (!notification.allSaw) dispatch(seeNotification());
  };

  return (
    <div className="gx-header-horizontal gx-header-horizontal-custom gx-inside-header-horizontal">
      {!authUser && (
        <div className="gx-header-horizontal-top">
          <div className="gx-container">
            <div className="gx-header-horizontal-top-flex">
              <div className="gx-header-horizontal-top-left"></div>
              <ul className="gx-login-list">
                <li>
                  <Link to="/login" className="nav-item">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="nav-item">
                    Register{" "}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <Header className="gx-header-horizontal-main">
        <div className="gx-container">
          <div className="gx-header-horizontal-main-flex">
            <div className="gx-d-block gx-d-lg-none gx-linebar gx-mr-xs-3 6e">
              <img
                onClick={() => {
                  dispatch(toggleCollapsedSideNav(!navCollapsed));
                }}
                src={require("assets/images/bars.png")}
              ></img>
              {/* <i
                className="gx-icon-btn icon icon-menu"
              
              /> */}
            </div>
            <div className="gx-d-block gx-d-lg-none gx-mx-2 gx-pt-xs-1 gx-w-logo">
              <img alt="" src={require("assets/images/w-logo.png")} />
            </div>
            <div className="gx-d-none gx-d-lg-block gx-mr-xs-5 gx-logo gx-width-200">
              <img alt="" src={require("assets/images/logo.png")} />
            </div>

            <div className="gx-header-horizontal-nav-curve gx-d-none gx-d-lg-block">
              <HorizontalNav />
            </div>
            <ul className="gx-header-notifications gx-ml-auto">
              {/* <li className="gx-notify gx-notify-search">
                <Popover
                  overlayClassName="gx-popover-horizantal"
                  placement="bottomRight"
                  content={
                    <div className="gx-d-flex">
                      <Dropdown overlay={menu}>
                        <Button>
                          Category <Icon type="down" />
                        </Button>
                      </Dropdown>
                      <SearchBox
                        styleName="gx-popover-search-bar"
                        placeholder="Search in app..."
                        onChange={updateSearchChatUser}
                        value={searchText}
                      />
                    </div>
                  }
                  trigger="click"
                >
                  <span className="gx-pointer gx-d-block">
                    <i className="icon icon-search-new" />
                  </span>
                </Popover>
              </li> */}

              <li className="gx-notify">
                <Popover
                  overlayClassName="gx-popover-horizantal"
                  placement="bottomRight"
                  content={<AppNotification />}
                  trigger="click"
                  on
                >
                  <span
                    className="gx-pointer gx-status-pos gx-d-block"
                    onClick={handleSeeNotification}
                  >
                    <i className="icon icon-notification" />
                    {!notification.allSaw && (
                      <span className="gx-status gx-status-rtl gx-small gx-orange" />
                    )}
                  </span>
                </Popover>
              </li>

              {/* <li className="gx-msg">
                <Popover
                  overlayClassName="gx-popover-horizantal"
                  placement="bottomRight"
                  content={<MailNotification />}
                  trigger="click"
                >
                  <span className="gx-pointer gx-status-pos gx-d-block">
                    <i className="icon icon-chat-new" />
                    <span className="gx-status gx-status-rtl gx-small gx-orange" />
                  </span>
                </Popover>
              </li> */}
              <li className="gx-language">
                <Popover
                  overlayClassName="gx-popover-horizantal"
                  placement="bottomRight"
                  content={languageMenu()}
                  trigger="click"
                >
                  <span className="gx-pointer gx-flex-row gx-align-items-center">
                    <i className={`flag flag-24 flag-${locale.icon}`} />
                  </span>
                </Popover>
              </li>
              {authUser && (
                <li className="gx-user-nav gx-ml-0">
                  <UserInfo />
                </li>
              )}
            </ul>
          </div>
        </div>
      </Header>
    </div>
  );
};

const mapStateToProps = ({ settings }) => {
  const { locale, navCollapsed } = settings;
  return { locale, navCollapsed };
};
export default connect(mapStateToProps, {
  toggleCollapsedSideNav,
  switchLanguage,
})(InsideHeader);
