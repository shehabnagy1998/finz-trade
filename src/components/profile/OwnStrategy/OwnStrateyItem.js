import React from "react";
import { Avatar, Typography, Button, Progress, Menu, Dropdown } from "antd";
import DisplayDate from "../../wall/DisplayDate";
import { CDN } from "../../../constants/API";
import { MoreOutlined } from "@ant-design/icons";

const { Text } = Typography;

const OwnStrateyItem = ({ item }) => {
  const MyMenu = (
    <Menu>
      <Menu.Item>Edit</Menu.Item>
      <Menu.Item>Delete</Menu.Item>
    </Menu>
  );

  const calcPercent =
    (item.wonOrders / (item.wonOrders + item.lostOrders)) * 100;
  const percent = calcPercent >= 1 ? calcPercent.toFixed(1) : 0;
  return (
    <div className="gx-my-4">
      <div className="gx-flex-row gx-justify-content-between">
        <div className="gx-d-flex">
          <Avatar
            className="gx-mr-3 gx-size-50 gx-flex-shrink-0"
            src={CDN + item.pic}
          />
          <div className="gx-flex-column">
            <Text className="gx-fs-lg gx-fs-md-xl gx-mb-1">{item.title}</Text>
            <Text className="gx-fs-md gx-text-muted">
              <DisplayDate date={item.addedIn} />
            </Text>
          </div>
        </div>
        <div className="gx-d-flex gx-mt-3 gx-mt-lg-0 gx-justify-content-center">
          <Dropdown overlay={MyMenu} placement="bottomRight">
            <MoreOutlined />
          </Dropdown>
        </div>
      </div>
      <div className="gx-my-3">
        <Text className="gx-fs-lg gx-overflow-break">{item.description}</Text>
      </div>
      <div className="gx-text-center">
        <Progress
          percent={percent}
          className="gx-w-75"
          format={(p) => `win ${percent}%`}
        />
      </div>
    </div>
  );
};

export default OwnStrateyItem;
