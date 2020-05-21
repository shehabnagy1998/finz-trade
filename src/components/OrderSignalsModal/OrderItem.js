import React from "react";
import { Card, Typography } from "antd";
import DisplayDate from "../../components/wall/DisplayDate";

const OrderItem = ({ order }) => {
  const { Title, Text } = Typography;

  const result = order.result;
  let formatedRes = result.split("@");
  const cardColor =
    order.status === "win"
      ? "teal"
      : order.status === "lose"
      ? "red"
      : order.status === "execute"
      ? "orange"
      : "";

  const cardIcon =
    order.status === "win"
      ? "growth"
      : order.status === "lose"
      ? "down"
      : order.status === "execute"
      ? "menu-right"
      : "";
  console.log(order);
  return (
    <Card className="gx-mb-0">
      <div className="gx-media gx-justify-content-between gx-flex-nowrap">
        <div className="gx-flex-column">
          <div className="gx-media gx-align-items-center">
            <i
              className={`gx-mr-2  gx-text-${cardColor} icon icon-${cardIcon} gx-fs-xxl`}
            />
            {order.result && (
              <Text className="">{`${
                formatedRes[0]
              } ${formatedRes[1].toUpperCase()}`}</Text>
            )}
          </div>
          <Text strong className="gx-fs-xl gx-text-capitalize ">
            {order.market}
          </Text>
        </div>
        <div className="gx-flex-column">
          <Text className="gx-fs-xl gx-mb-1" strong>
            {order.amount} LOT
          </Text>
          <Text className="gx-fs-lg ">
            <DisplayDate date={order.executedIn} />
          </Text>
        </div>
      </div>
    </Card>
  );
};

export default OrderItem;
