import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Card,
  Avatar,
  Tag,
  Progress,
  Button,
  Popconfirm,
  Popover,
  Modal,
} from "antd";
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import deleteStrategy from "../../appRedux/actions/API/deleteStrategy";
import toggleWatchStrategy from "../../appRedux/actions/API/toggleWatchStrategy";
import { CDN } from "../../constants/API";
import toggleFollowStrategy from "../../appRedux/actions/API/toggleFollowStrategy";
import subscribePlan from "../../appRedux/actions/API/subscribePlan";
import { Link, useHistory } from "react-router-dom";
import DisplayDate from "../wall/DisplayDate";
import IntlMessages from "../../util/IntlMessages";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const StrategyCard = ({ strategy, setStrategyEditItem }) => {
  const { Title, Text } = Typography;
  const { userInfo } = useSelector(({ auth }) => auth);
  const { pageLoaders } = useSelector(({ Api }) => Api);

  const history = useHistory();
  const [isPopVisible, setIsPopVisible] = useState(false);
  const ButtonGroup = Button.Group;
  const dispatch = useDispatch();
  const calcPercent =
    (strategy.wonOrders / (strategy.wonOrders + strategy.lostOrders)) * 100;
  const percent = calcPercent >= 1 ? calcPercent.toFixed(1) : 0;

  const handleDelete = async (_) => {
    await dispatch(deleteStrategy(strategy._id));
    history.push(`/profile/${userInfo.username}`);
  };

  const shareLink = `${window.location.origin}/strategy/${strategy._id}`;
  const cashTypeColor =
    strategy.cashType === "off"
      ? "#ff4d4f"
      : strategy.cashType === "demo"
      ? "#faad14"
      : strategy.cashType === "live"
      ? "#52c41a"
      : "";
  const shareContent = (
    <div className="gx-media gx-align-items-center">
      <div className="gx-mx-2 gx-icon-scale gx-size-30">
        <FacebookShareButton url={shareLink}>
          <FacebookIcon className="gx-img-fluid" />
        </FacebookShareButton>
      </div>
      <div className="gx-mx-2 gx-icon-scale gx-size-30">
        <TwitterShareButton url={shareLink}>
          <TwitterIcon className="gx-img-fluid" />
        </TwitterShareButton>
      </div>
      <div className="gx-mx-2 gx-icon-scale gx-size-30">
        <TelegramShareButton url={shareLink}>
          <TelegramIcon className="gx-img-fluid" />
        </TelegramShareButton>
      </div>
      <div className="gx-mx-2 gx-icon-scale gx-size-30">
        <WhatsappShareButton url={shareLink}>
          <WhatsappIcon className="gx-img-fluid" />
        </WhatsappShareButton>
      </div>
    </div>
  );

  const [isLoading, setIsLoading] = useState(false);
  const handleFollow = async (resolve) => {
    setIsLoading(true);
    setIsPopVisible(false);
    await dispatch(
      toggleFollowStrategy(strategy._id, "one", strategy.stripeId)
    );
    resolve();
    setIsLoading(false);
  };

  const handlePopVisibleChange = (visible) => {
    // Determining condition before show the popconfirm.
    let isExist = strategy.followersIds.includes(userInfo.username);
    if (isExist) {
      handleFollow(); // next step
    } else {
      showPromiseConfirm(); // show the popconfirm
    }
  };

  let profitFactor = strategy.wonMoney / strategy.lostMoney;
  let netProfit = strategy.wonMoney - strategy.lostMoney;

  const { confirm } = Modal;

  function showPromiseConfirm() {
    confirm({
      title: "Do you want to follow this strategy?",
      icon: <ExclamationCircleOutlined />,
      content: `This will cost you $${strategy.cost} monthly and can't be refunded Consectetur duis sit culpa deserunt consequat cupidatat mollit amet ea in excepteur aliqua tempor incididunt. Officia enim laborum quis laboris. Quis ea laborum sunt dolore do tempor commodo eu adipisicing velit.`,
      onOk() {
        return new Promise(async (resolve, reject) => {
          // setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          handleFollow(resolve);
        }).catch(() => console.log("Oops errors!"));
      },
      onCancel() {},
    });
  }

  return (
    <Card className="gx-card">
      <div className="gx-media gx-wall-user-info gx-flex-nowrap gx-align-items-center">
        <Link to={`/strategy/${strategy._id}`}>
          <Avatar
            className="gx-mr-3 gx-mb-2 gx-size-50"
            // src={require("assets/images/carousel/wolf.jpg")}
            src={`${CDN}${strategy.pic}`}
          />
        </Link>
        <div className="gx-media-body">
          <Link to={`/strategy/${strategy._id}`}>
            <h5 className="gx-wall-user-title">{strategy.title}</h5>
          </Link>
          {strategy.tradeType && (
            <Text className="gx-fs-sm">{strategy.tradeType.toUpperCase()}</Text>
          )}
          {" . "}
          <Text className="gx-text-muted gx-fs-sm">
            <DisplayDate date={strategy.addedIn} />
          </Text>
        </div>

        <ul className="gx-follower-list">
          <li className="gx-text-center gx-px-2">
            <span className="gx-follower-title gx-fs-lg gx-font-weight-medium">
              <i className="icon icon-team" />
            </span>
            <span className="gx-fs-sm">{strategy.followers}</span>
          </li>
          <li className="gx-text-center gx-px-2">
            <span className="gx-follower-title gx-fs-lg gx-font-weight-medium">
              <i className="icon icon-view-o" />
            </span>
            <span className="gx-fs-sm">{strategy.watchers}</span>
          </li>
          <li className="gx-text-center gx-px-2">
            <span className="gx-follower-title gx-fs-lg gx-font-weight-medium">
              <i className="icon icon-revenue-new" />
            </span>
            <span className="gx-fs-sm">${strategy.cost}</span>
          </li>
        </ul>
      </div>
      <p className="gx-overflow-break">{strategy.description}</p>
      <div className="gx-flex-row gx-mb-2 gx-justify-content-between">
        <div>
          {strategy.stocks &&
            strategy.stocks.length >= 1 &&
            strategy.stocks.map((i, j) => (
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
          {strategy.cashType}
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
              firstVal: strategy.wonOrders,
              secondVal: strategy.wonOrders + strategy.lostOrders,
            }}
          />
        </Text>
        <Progress percent={parseFloat(percent)} status="active" />
      </div>

      <ButtonGroup className={"gx-flex-column gx-flex-md-row gx-mt-2"}>
        {userInfo.username === strategy.username ? (
          <>
            <Popconfirm
              onConfirm={handleDelete}
              title="Are you sure you want to delete this strategy ?"
              okText="Yes"
              cancelText="No"
            >
              <Button
                icon="delete"
                type="danger"
                loading={pageLoaders.deleteStrategy}
                block
              >
                <IntlMessages id="delete" />
              </Button>
            </Popconfirm>
            <Button
              icon="edit"
              type="primary"
              block
              onClick={(_) =>
                setStrategyEditItem({
                  _id: strategy._id,
                  title: strategy.title,
                  description: strategy.description,
                  cost: strategy.cost,
                  pic: strategy.pic,
                  stocks: strategy.stocks,
                  tradeType: strategy.tradeType,
                  public: strategy.public,
                })
              }
            >
              <IntlMessages id="edit" />
            </Button>
          </>
        ) : (
          <>
            <Button
              block
              loading={pageLoaders.toggleWatchStrategy === strategy._id}
              onClick={(_) =>
                dispatch(toggleWatchStrategy(strategy._id, "one"))
              }
              type={
                strategy.watchersIds.includes(userInfo.username)
                  ? "primary"
                  : "default"
              }
            >
              <i className="icon gx-mr-2 icon-notification" />
              <IntlMessages id="watch" />
            </Button>
            {/* <Popconfirm
              title={`This will cost you $${strategy.cost} monthly and can't be refunded ?`}
              visible={isPopVisible}
              onVisibleChange={handlePopVisibleChange}
              onConfirm={handleFollow}
              onCancel={(_) => setIsPopVisible(false)}
            >
              <Button
                block
                loading={isLoading}
                type={
                  strategy.followersIds.includes(userInfo.username)
                    ? "primary"
                    : "default"
                }
              >
                <i className="icon gx-mr-2 icon-add" />
                <IntlMessages
                  id="followWith"
                  values={{ val: `${strategy.cost}$` }}
                />
              </Button>
            </Popconfirm> */}
            <Button
              block
              // loading={isLoading}
              onClick={handlePopVisibleChange}
              type={
                strategy.followersIds.includes(userInfo.username)
                  ? "primary"
                  : "default"
              }
            >
              <i className="icon gx-mr-2 icon-add" />
              <IntlMessages
                id="followWith"
                values={{ val: `${strategy.cost}$` }}
              />
            </Button>
            <Popover content={shareContent} trigger="hover">
              <Button block>
                <i className="icon gx-mr-2 icon-sent" />
                <IntlMessages id="share" />
              </Button>
            </Popover>
          </>
        )}
      </ButtonGroup>
    </Card>
  );
};

export default StrategyCard;
