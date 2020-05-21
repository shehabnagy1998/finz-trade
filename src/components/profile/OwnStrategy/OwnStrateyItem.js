import React from "react";
import {
  Avatar,
  Typography,
  Button,
  Progress,
  Menu,
  Dropdown,
  Popconfirm,
} from "antd";
import DisplayDate from "../../wall/DisplayDate";
import { CDN } from "../../../constants/API";
import { MoreOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import deleteStrategy from "../../../appRedux/actions/API/deleteStrategy";
import { Link } from "react-router-dom";

const { Text } = Typography;

const OwnStrateyItem = ({ item, setStrategyEditItem, isMyProfile }) => {
  const dispatch = useDispatch();
  const MyMenu = (
    <Menu>
      <Menu.Item
        onClick={(_) =>
          setStrategyEditItem({
            _id: item._id,
            title: item.title,
            description: item.description,
            cost: item.cost,
            pic: item.pic,
            stocks: item.stocks,
            tradeType: item.tradeType,
            public: item.public,
          })
        }
      >
        Edit
      </Menu.Item>
      <Menu.Item>
        <Popconfirm
          title="Are you sure you'd like to delete this strategy ?"
          onConfirm={(_) => dispatch(deleteStrategy(item._id))}
        >
          Delete
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  const calcPercent =
    (item.wonOrders / (item.wonOrders + item.lostOrders)) * 100;
  const percent = calcPercent >= 1 ? calcPercent.toFixed(1) : 0;
  return (
    <div className="gx-my-4">
      <div className="gx-flex-row gx-justify-content-between">
        <div className="gx-d-flex">
          <Link to={`/strategy/${item._id}`}>
            <Avatar
              className="gx-mr-3 gx-size-50 gx-flex-shrink-0"
              src={CDN + item.pic}
            />
          </Link>
          <div className="gx-flex-column">
            <Link to={`/strategy/${item._id}`}>
              <Text className="gx-fs-lg gx-fs-md-xl gx-mb-1">{item.title}</Text>
            </Link>
            <Text className="gx-fs-sm gx-text-muted">
              <DisplayDate date={item.addedIn} />
            </Text>
          </div>
        </div>
        <div className="gx-d-flex gx-mt-3 gx-mt-lg-0 gx-justify-content-center">
          {isMyProfile && (
            <Dropdown overlay={MyMenu} placement="bottomRight">
              <MoreOutlined />
            </Dropdown>
          )}
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
