import React from "react";

import Widget from "components/Widget/index";
import DisplayDate from "../../wall/DisplayDate";
import { Typography, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import getOrderSignals from "../../../appRedux/actions/API/getOrderSignals";
import IntlMessages from "../../../util/IntlMessages";
import { Link } from "react-router-dom";

const RecentOrdersItem = ({ order }) => {
  const { Text } = Typography;
  console.log(order);

  const result = order.result;
  let formatedRes = result.split("@");
  formatedRes[0] = formatedRes[0] ? formatedRes[0] : "";
  formatedRes[1] = formatedRes[1] ? formatedRes[1] : "";
  const dispatch = useDispatch();
  const { pageLoaders } = useSelector(({ Api }) => Api);

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
  return (
    <Spin spinning={pageLoaders.getOrderSignals === order._id || false}>
      <Widget styleName={`gx-card-full gx-p-3 gx-my-2`}>
        <div className="gx-media gx-justify-content-between gx-align-items-center gx-flex-nowrap">
          <div className="gx-flex-column">
            <div className="gx-media gx-align-items-center gx-flex-nowrap">
              <i
                className={`gx-mr-2 gx-text-${cardColor} icon icon-${cardIcon} gx-fs-xl`}
              />
              {order.result && (
                <Text className="">{`${
                  formatedRes[0]
                } ${formatedRes[1].toUpperCase()}`}</Text>
              )}
            </div>
            <Text strong className="gx-text-capitalize ">
              {order.market}
            </Text>
            <Text
              className="gx-link gx-fs-sm"
              onClick={(_) => dispatch(getOrderSignals(order))}
            >
              <IntlMessages id="showSignals" />
            </Text>
          </div>
          <div className="gx-flex-column">
            <Text className=" gx-fs-lg gx-mb-1" strong>
              {order.amount} LOT
            </Text>
            <Text className="gx-fs-xs">
              <IntlMessages id="executionTime" />:{" "}
              <DisplayDate date={order.executedIn} />
            </Text>
            <Text className="gx-fs-xs">
              <IntlMessages id="closeTime" />:{" "}
              <DisplayDate date={order.closedIn} />
            </Text>
            <Link to={`/strategy/${order.strategyId}`}>
              <Text className="gx-fs-xs gx-link">
                <IntlMessages id="strategy" />: {order.strategyName}
              </Text>
            </Link>
          </div>
        </div>
      </Widget>
    </Spin>
  );
};

export default RecentOrdersItem;
