import React, { useState } from "react";
import { Typography, Button, Modal, Avatar, Progress } from "antd";
import Widget from "../../Widget/index";
import { useSelector, useDispatch } from "react-redux";
import SubscriptionData from "./SubscriptionData";
import { Link } from "react-router-dom";
import IntlMessages from "../../../util/IntlMessages";

const { Text } = Typography;

const Subscription = () => {
  const { userInfo } = useSelector(({ auth }) => auth);

  return (
    <Widget styleName="gx-card-profile-sm">
      <div className="gx-d-flex gx-align-items-center gx-my-3">
        <i className="icon icon-datepicker gx-mr-2 gx-center" />
        <Text className="gx-fs-xl">
          <IntlMessages id="subscription" />
        </Text>
      </div>
      {userInfo.plan.name ? (
        <SubscriptionData />
      ) : (
        <div className="gx-text-center">
          <Text className="gx-fs-lg">
            <IntlMessages id="noSubscription1" />
            <Link to="/pricing" className="gx-text-orange ">
              <IntlMessages id="noSubscription2" />
            </Link>
          </Text>
        </div>
      )}
    </Widget>
  );
};

export default Subscription;
