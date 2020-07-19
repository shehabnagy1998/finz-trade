import React, { useState } from "react";
import { Button, Typography } from "antd";
import { useSelector } from "react-redux";
import Auxiliary from "util/Auxiliary";
import { CDN } from "../../../constants/API";
import IntlMessages from "../../../util/IntlMessages";
import NoProfileImg from "assets/images/noProfile.jpg";
import { useIntl } from "react-intl";

const Profile = (props) => {
  const [isFollow, setIsFollow] = useState(false);
  const { formatMessage } = useIntl();

  const handleToggle = () => {
    setIsFollow((previousState) => ({
      isFollow: !previousState.isFollow,
    }));
  };

  const user = useSelector(({ auth }) => auth.userInfo);
  const { Text } = Typography;

  return (
    <Auxiliary>
      <div className="gx-profileon">
        <div className="gx-profileon-thumb gx-profileon-thumb-htctrcrop">
          <img src={user.pic ? CDN + user.pic : NoProfileImg} alt="" />
        </div>
        <div className="gx-profileon-content">
          <p className="gx-profileon-title">{user.name}</p>
          <Text
            className={`gx-text-capitalize ${
              user.subscribed ? "gx-text-teal" : "gx-text-red"
            }`}
          >
            {user.subscribed ? (
              formatMessage({ id: "subscribed" }) + " - " + user.plan.name
            ) : (
              <IntlMessages id="free" />
            )}
          </Text>
        </div>
      </div>

      <div className="gx-follower gx-text-center">
        <ul className="gx-follower-list">
          <li>
            <span className="gx-follower-title">{user.following}</span>
            <span>
              <IntlMessages id="following" />
            </span>
          </li>
          <li>
            <span className="gx-follower-title">{user.watching}</span>
            <span>
              <IntlMessages id="watching" />
            </span>
          </li>
          <li>
            <span className="gx-follower-title">{user.orders}</span>
            <span>
              <IntlMessages id="orders" />
            </span>
          </li>
        </ul>
      </div>
    </Auxiliary>
  );
};

export default Profile;
