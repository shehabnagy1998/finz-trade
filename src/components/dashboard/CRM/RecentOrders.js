import React, { useState, useEffect } from "react";
import { Avatar, Timeline, Typography } from "antd";
import WidgetHeader from "components/WidgetHeader/index";
import RecentOrderItem from "./RecentOrderItem";
import { useSelector } from "react-redux";
import Widget from "components/Widget/index";

const { Text } = Typography;

function getName(task, shape) {
  if (task.avatar === "") {
    let nameSplit = task.name.split(" ");
    if (task.name.split(" ").length === 1) {
      const initials = nameSplit[0].charAt(0).toUpperCase();
      return (
        <Avatar shape={shape} className="gx-size-40 gx-bg-primary">
          {initials}
        </Avatar>
      );
    } else {
      const initials =
        nameSplit[0].charAt(0).toUpperCase() +
        nameSplit[1].charAt(0).toUpperCase();
      return (
        <Avatar shape={shape} className="gx-size-40 gx-bg-cyan">
          {initials}
        </Avatar>
      );
    }
  } else {
    return <Avatar shape={shape} className="gx-size-40" src={task.avatar} />;
  }
}

const RecentOrders = (props) => {
  const [limit, setLimit] = useState(3);
  const [shape, setShape] = useState(props.shape);
  const rcentOrders = useSelector(({ Api }) => Api.recentOrders);

  useEffect(() => {
    setShape(props.shape);
    if (window.innerWidth < 575) {
      setLimit(1);
    }
  }, [props.shape]);

  const onLoadMore = () => {
    setLimit(limit + 1);
  };

  return (
    <div className="gx-entry-sec">
      <WidgetHeader title="Recent Orders" />
      {rcentOrders.length >= 1 ? (
        rcentOrders.map((order, index) => (
          <RecentOrderItem key={index} order={order} />
        ))
      ) : (
        <Widget styleName={`gx-card-full gx-p-3 `}>
          <div className="gx-media gx-align-items-center">
            <i
              className={`gx-mr-2 gx-mr-xxl-3 icon icon-error gx-fs-xl gx-text-red`}
            />
            <Text strong type="danger">
              No orders have been made
            </Text>
          </div>
        </Widget>
      )}
    </div>
  );
};

export default RecentOrders;
