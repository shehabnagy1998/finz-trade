import React from "react";
import { connect, useSelector } from "react-redux";
import { Typography, Progress } from "antd";
import moment from "moment";
import { round } from "lodash";
import IntlMessages from "../../../util/IntlMessages";

const { Text } = Typography;

const SubscriptionData = () => {
  const { userInfo } = useSelector(({ auth }) => auth);
  var start = parseInt(userInfo.subscription.current_period_start) * 1000;
  var now = moment.now();
  var end = parseInt(userInfo.subscription.current_period_end) * 1000;
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
    <div className="gx-flex-column">
      <Text className="gx-mb-2">
        <IntlMessages
          id="subscriptionText"
          values={{ val: userInfo.plan.name.toUpperCase() }}
        />
      </Text>
      <div className="gx-d-flex">
        <Progress
          className="gx-w-50 gx-mr-3"
          percent={percent}
          showInfo={false}
          strokeColor={getColor()}
        />
        <Text>
          <IntlMessages id="daysLeft" values={{ val: timeLeft }} />
        </Text>
      </div>
    </div>
  );
};

export default SubscriptionData;
