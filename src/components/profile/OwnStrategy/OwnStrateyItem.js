import React from "react";
import {
  Avatar,
  Typography,
  Button,
  Progress,
  Menu,
  Dropdown,
  Popconfirm,
  Tag,
} from "antd";
import DisplayDate from "../../wall/DisplayDate";
import { CDN } from "../../../constants/API";
import { MoreOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import deleteStrategy from "../../../appRedux/actions/API/deleteStrategy";
import { Link } from "react-router-dom";
import IntlMessages from "../../../util/IntlMessages";

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
        <IntlMessages id="edit" />
      </Menu.Item>
      <Menu.Item>
        <Popconfirm
          title="Are you sure you'd like to delete this strategy ?"
          onConfirm={(_) => dispatch(deleteStrategy(item._id))}
        >
          <IntlMessages id="delete" />
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  let profitFactor = item.wonMoney / item.lostMoney;
  let netProfit = item.wonMoney - item.lostMoney;
  const cashTypeColor =
    item.cashType === "off"
      ? "#ff4d4f"
      : item.cashType === "demo"
      ? "#faad14"
      : item.cashType === "live"
      ? "#52c41a"
      : "";

  const calcPercent =
    (item.wonOrders / (item.wonOrders + item.lostOrders)) * 100;
  const percent = calcPercent >= 1 ? calcPercent.toFixed(1) : 0;
  return (
    <div className="gx-my-4">
      <div className="gx-flex-row gx-justify-content-between">
        <Link to={`/strategy/${item._id}`}>
          <Avatar
            className="gx-mr-3 gx-mb-2 gx-size-50"
            // src={require("assets/images/carousel/wolf.jpg")}
            src={`${CDN}${item.pic}`}
          />
        </Link>
        <div className="gx-media-body">
          <Link to={`/strategy/${item._id}`}>
            <h5 className="gx-wall-user-title">{item.title}</h5>
          </Link>
          {item.tradeType && (
            <Text className="gx-fs-sm">{item.tradeType.toUpperCase()}</Text>
          )}
          {" . "}
          <Text className="gx-text-muted gx-fs-sm">
            <DisplayDate date={item.addedIn} />
          </Text>
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
      <div className="gx-flex-row gx-mb-2 gx-justify-content-between">
        <div>
          {item.stocks &&
            item.stocks.length >= 1 &&
            item.stocks.map((i, j) => (
              <Tag
                key={j}
                color="#8c8c8c"
                className="gx-mb-2 gx-mb-md-0 gx-text-center"
              >
                {i.toUpperCase()}
              </Tag>
            ))}
        </div>
        <Tag
          color={cashTypeColor}
          className="gx-mb-2 gx-mb-md-0 gx-text-center"
        >
          {item.cashType}
        </Tag>
      </div>
      <div className="gx-mb-2 gx-flex-row">
        <Tag color={"#825bf0"} className="gx-mb-2 gx-mb-md-0 gx-text-center">
          <IntlMessages id="profitFactor" />:{" "}
          {profitFactor ? profitFactor : "-"}
        </Tag>
        <Tag color={"#825bf0"} className="gx-mb-2 gx-mb-md-0 gx-text-center">
          <IntlMessages id="netProfit" />: {netProfit}
        </Tag>
      </div>
      <div>
        <Text>
          <IntlMessages
            id="ordersWonOf"
            values={{
              firstVal: item.wonOrders,
              secondVal: item.wonOrders + item.lostOrders,
            }}
          />
        </Text>
        <Progress percent={parseFloat(percent)} status="active" />
      </div>
    </div>
  );
};

export default OwnStrateyItem;
