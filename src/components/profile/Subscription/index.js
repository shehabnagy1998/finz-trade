import React, { useState } from "react";
import { Typography, Button, Modal, Avatar, Progress } from "antd";
import Widget from "../../Widget/index";
import { useSelector, useDispatch } from "react-redux";
import { round } from "lodash";
import moment from "moment";

const { Text } = Typography;

const Subscription = () => {
  const { user } = useSelector(({ Api }) => Api);
  var start = parseInt(user.subscription.current_period_start) * 1000;
  var now = moment.now();
  var end = parseInt(user.subscription.current_period_end) * 1000;
  const allTime =
    moment
      .duration(moment(new Date(end)).diff(moment(new Date(start))))
      .asDays() - 1;
  const timeLeft =
    round(moment.duration(moment(new Date(end)).diff(now)).asDays()) - 1;

  const percent = (((allTime - timeLeft) / allTime) * 100).toFixed(2);

  const getColor = (_) => {
    if (timeLeft > 10) return "green";
    else if (timeLeft <= 10 && timeLeft > 5) return "orange";
    else return "red";
  };

  return (
    <Widget styleName="gx-card-profile-sm">
      <div className="gx-d-flex gx-align-items-center gx-my-3">
        <i className="icon icon-datepicker gx-mr-2 gx-center" />
        <Text className="gx-fs-xl">Subscription</Text>
      </div>
      <div className="gx-flex-column">
        <Text className="gx-mb-2">
          You Are {user.plan.name.toUpperCase()} Subscriber
        </Text>
        <div className="gx-d-flex">
          <Progress
            className="gx-w-50 gx-mr-3"
            percent={percent}
            showInfo={false}
            strokeColor={getColor()}
          />
          <Text>{timeLeft} days left</Text>
        </div>
        {/* <Text className="gx-mb-2">
          Plan Started At:{" "}
          <DisplayDate date={user.subscription.current_period_start} />
        </Text>
        <Text>
          Plan Will End At:{" "}
          <DisplayDate date={user.subscription.current_period_end} />
        </Text> */}
      </div>
    </Widget>
  );
};

export default Subscription;
