import React from "react";
import Auxiliary from "util/Auxiliary";
import { Avatar, Typography, Button, Progress, Tag } from "antd";
import { CDN } from "../../constants/API";
import { useDispatch, useSelector } from "react-redux";
import toggleWatchStrategy from "../../appRedux/actions/API/toggleWatchStrategy";
import { Link } from "react-router-dom";
import IntlMessages from "util/IntlMessages";
import DisplayDate from "../../components/wall/DisplayDate";

const AboutItem = ({ data, type }) => {
  const { Text } = Typography;
  const dispatch = useDispatch();
  const { pageLoaders } = useSelector(({ Api }) => Api);

  const btnText =
    type === "following" ? (
      <IntlMessages id="unFollow" />
    ) : (
      <IntlMessages id="unWatch" />
    );
  const btnMethod = (id) =>
    type === "following"
      ? "Un-Follow"
      : dispatch(toggleWatchStrategy(id, "all"));
  const cashTypeColor =
    data.cashType === "off"
      ? "#ff4d4f"
      : data.cashType === "demo"
      ? "#faad14"
      : data.cashType === "live"
      ? "#52c41a"
      : "";

  let calcPercent = (data.wonOrders / (data.wonOrders + data.lostOrders)) * 100;
  let percent = calcPercent >= 1 ? calcPercent.toFixed(1) : 0;
  let profitFactor = data.wonMoney / data.lostMoney;
  let netProfit = data.wonMoney - data.lostMoney;

  return (
    <Auxiliary>
      <div className="gx-my-4">
        <div className="gx-d-flex gx-flex-column gx-flex-lg-row gx-justify-content-between gx-align-items-center">
          <div className="gx-flex-grow-1">
            <div className="gx-media gx-wall-user-info gx-flex-nowrap gx-align-items-center">
              <Link to={`/strategy/${data._id}`}>
                <Avatar
                  className="gx-mr-3 gx-mb-2 gx-size-50"
                  // src={require("assets/images/carousel/wolf.jpg")}
                  src={`${CDN}${data.pic}`}
                />
              </Link>
              <div className="gx-media-body">
                <Link to={`/strategy/${data._id}`}>
                  <h5 className="gx-wall-user-title">{data.title}</h5>
                </Link>
                {data.tradeType && (
                  <Text className="gx-fs-sm">
                    {data.tradeType.toUpperCase()}
                  </Text>
                )}
                {" . "}
                <Text className="gx-text-muted gx-fs-sm">
                  <DisplayDate date={data.addedIn} />
                </Text>
              </div>
            </div>
            <p className="gx-overflow-break">{data.description}</p>
            <div className="gx-flex-row gx-mb-2 gx-justify-content-between">
              <div>
                {data.stocks &&
                  data.stocks.length >= 1 &&
                  data.stocks.map((i, j) => (
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
                {data.cashType}
              </Tag>
            </div>
            <div className="gx-mb-2 gx-flex-row">
              <Tag
                color={"#825bf0"}
                className="gx-mb-2 gx-mb-md-0 gx-text-center"
              >
                <IntlMessages id="profitFactor" />:{" "}
                {profitFactor ? profitFactor : "-"}
              </Tag>
              <Tag
                color={"#825bf0"}
                className="gx-mb-2 gx-mb-md-0 gx-text-center"
              >
                <IntlMessages id="netProfit" />: {netProfit}
              </Tag>
            </div>
            <div>
              <Text>
                <IntlMessages
                  id="ordersWonOf"
                  values={{
                    firstVal: data.wonOrders,
                    secondVal: data.wonOrders + data.lostOrders,
                  }}
                />
              </Text>
              <Progress percent={parseFloat(percent)} status="active" />
            </div>
          </div>
          <Button
            size="default"
            className="gx-mt-3 gx-mt-lg-0 gx-ml-lg-3"
            shape="round"
            onClick={(_) => btnMethod(data._id)}
            loading={pageLoaders.toggleWatchStrategy === data._id}
          >
            {btnText}
          </Button>
        </div>
      </div>
    </Auxiliary>
  );
};

export default AboutItem;
