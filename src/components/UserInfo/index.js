import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Popover } from "antd";
import { userSignOut } from "appRedux/actions/Auth";
import { Link } from "react-router-dom";
import { CDN } from "../../constants/API";

const UserInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.userInfo);

  const userMenuOptions = (
    <ul className="gx-user-popover">
      <li>
        <Link className="gx-text-black-grey" to={`/profile/${user.username}`}>
          My Account
        </Link>
      </li>
      <li onClick={() => dispatch(userSignOut())}>Logout</li>
    </ul>
  );

  return (
    <Popover
      overlayClassName="gx-popover-horizantal"
      placement="bottomRight"
      content={userMenuOptions}
      trigger="click"
    >
      <Avatar src={CDN + user.pic} className="gx-avatar gx-pointer" alt="" />
    </Popover>
  );
};

export default UserInfo;
