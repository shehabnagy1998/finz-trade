import React, { useState } from "react";
import { Button, Typography } from "antd";
import { useSelector } from "react-redux";
import Auxiliary from "util/Auxiliary";
import { CDN } from "../../../constants/API";

const Profile = (props) => {
  const [isFollow, setIsFollow] = useState(false);

  const authUser = useSelector(({ auth }) => auth.authUser);

  const handleToggle = () => {
    setIsFollow((previousState) => ({
      isFollow: !previousState.isFollow,
    }));
  };

  const user = useSelector(({ Api }) => Api.user);
  const { Text } = Typography;

  return (
    <Auxiliary>
      <div className="gx-profileon">
        <div className="gx-profileon-thumb gx-profileon-thumb-htctrcrop">
          <img src={CDN + user.pic} alt="" />
        </div>
        <div className="gx-profileon-content">
          <p className="gx-profileon-title">{user.name}</p>
          <Text
            className={`gx-text-capitalize ${
              user.subscribed ? "gx-text-teal" : "gx-text-red"
            }`}
          >
            {user.subscribed ? "subscribed" : "not subscribed"}
          </Text>
        </div>
      </div>

      <div className="gx-follower gx-text-center">
        <ul className="gx-follower-list">
          <li>
            <span className="gx-follower-title">{user.following}</span>
            <span>Following</span>
          </li>
          <li>
            <span className="gx-follower-title">{user.watching}</span>
            <span>Watching</span>
          </li>
          <li>
            <span className="gx-follower-title">{user.orders}</span>
            <span>Orders</span>
          </li>
        </ul>
      </div>
    </Auxiliary>
  );
};

export default Profile;
