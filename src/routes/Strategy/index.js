import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import getStrategyById from "../../appRedux/actions/API/getStrategyById";
import CircularProgress from "../../components/CircularProgress";
import {
  Row,
  Card,
  Avatar,
  Typography,
  Button,
  Tag,
  Col,
  Popover,
  Popconfirm,
  Progress,
} from "antd";
import { CDN } from "../../constants/API";
import DisplayDate from "../../components/wall/DisplayDate";
import StrategyLists from "./StrategyLists";
import OrderItem from "./OrderItem";
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
import EditModal from "../../components/StrategyModal/Edit";
import { useHistory } from "react-router-dom";
import toggleFollowStrategy from "../../appRedux/actions/API/toggleFollowStrategy";
import subscribePlan from "../../appRedux/actions/API/subscribePlan";
import { Link } from "react-router-dom";

const Strategy = ({ match }) => {
  const pageId = match.params.id;
  const dispatch = useDispatch();
  const { strategy, pageLoaders, strategies } = useSelector(({ Api }) => Api);
  const { userInfo } = useSelector(({ auth }) => auth);
  const [strategyEditItem, setStrategyEditItem] = useState({});
  const history = useHistory();
  const [isPopVisible, setIsPopVisible] = useState(false);
  const ButtonGroup = Button.Group;

  useEffect(() => {
    if (strategies.all.length >= 1) dispatch(getStrategyById(pageId));
  }, [pageId, strategies]);

  const { Title, Text } = Typography;

  const handleDelete = async (_) => {
    await dispatch(deleteStrategy(strategy.data._id));
    history.push(`/profile/${userInfo.username}`);
  };

  const shareContent = (
    <div className="gx-media gx-align-items-center">
      <div className="gx-mx-2 gx-icon-scale gx-size-30">
        <FacebookShareButton
          url={`http://finztrade.com/strategy/${strategy.data._id}`}
        >
          <FacebookIcon className="gx-img-fluid" />
        </FacebookShareButton>
      </div>
      <div className="gx-mx-2 gx-icon-scale gx-size-30">
        <TwitterShareButton
          url={`http://finztrade.com/strategy/${strategy.data._id}`}
        >
          <TwitterIcon className="gx-img-fluid" />
        </TwitterShareButton>
      </div>
      <div className="gx-mx-2 gx-icon-scale gx-size-30">
        <TelegramShareButton
          url={`http://finztrade.com/strategy/${strategy.data._id}`}
        >
          <TelegramIcon className="gx-img-fluid" />
        </TelegramShareButton>
      </div>
      <div className="gx-mx-2 gx-icon-scale gx-size-30">
        <WhatsappShareButton
          url={`http://finztrade.com/strategy/${strategy.data._id}`}
        >
          <WhatsappIcon className="gx-img-fluid" />
        </WhatsappShareButton>
      </div>
    </div>
  );

  const [isLoading, setIsLoading] = useState(false);
  const handleFollow = async (_) => {
    setIsLoading(true);
    setIsPopVisible(false);
    await dispatch(
      toggleFollowStrategy(strategy.data._id, "one", strategy.data.stripeId)
    );
    setIsLoading(false);
  };

  const handlePopVisibleChange = (visible) => {
    console.log(visible);
    if (!visible) {
      setIsPopVisible(visible);
      return;
    }
    // Determining condition before show the popconfirm.
    let isExist = strategy.data.followersIds.includes(userInfo.username);
    if (isExist) {
      handleFollow(); // next step
    } else {
      setIsPopVisible(visible); // show the popconfirm
    }
  };

  console.log(strategy);

  const calcPercent =
    (strategy.data.wonOrders /
      (strategy.data.wonOrders + strategy.data.lostOrders)) *
    100;
  const percent = calcPercent >= 1 ? calcPercent.toFixed(1) : 0;

  return (
    <>
      {pageLoaders.getStrategies ||
      pageLoaders.getStrategyById ||
      pageLoaders.getRecentOrders ||
      pageLoaders.getUserInfo ? (
        <CircularProgress />
      ) : strategy.data._id ? (
        <>
          <Card className="gx-card">
            <div className="gx-media gx-wall-user-info gx-flex-nowrap gx-align-items-center">
              <Link to={`/strategy/${strategy.data._id}`}>
                <Avatar
                  className="gx-mr-3 gx-mb-2 gx-size-50"
                  // src={require("assets/images/carousel/wolf.jpg")}
                  src={`${CDN}${strategy.data.pic}`}
                />
              </Link>
              <div className="gx-media-body">
                <Link to={`/strategy/${strategy.data._id}`}>
                  <h5 className="gx-wall-user-title">{strategy.data.title}</h5>
                </Link>
                {strategy.data.tradeType && (
                  <Text className="gx-fs-sm">
                    {strategy.data.tradeType.toUpperCase()}
                  </Text>
                )}
                {" . "}
                <Text className="gx-text-muted gx-fs-sm">
                  <DisplayDate date={strategy.data.addedIn} />
                </Text>
              </div>

              <ul className="gx-follower-list">
                <li className="gx-text-center gx-px-2">
                  <span className="gx-follower-title gx-fs-lg gx-font-weight-medium">
                    <i className="icon icon-team" />
                  </span>
                  <span className="gx-fs-sm">{strategy.data.followers}</span>
                </li>
                <li className="gx-text-center gx-px-2">
                  <span className="gx-follower-title gx-fs-lg gx-font-weight-medium">
                    <i className="icon icon-view-o" />
                  </span>
                  <span className="gx-fs-sm">{strategy.data.watchers}</span>
                </li>
                <li className="gx-text-center gx-px-2">
                  <span className="gx-follower-title gx-fs-lg gx-font-weight-medium">
                    <i className="icon icon-revenue-new" />
                  </span>
                  <span className="gx-fs-sm">${strategy.data.cost}</span>
                </li>
              </ul>
            </div>
            <p className="gx-overflow-break">{strategy.data.description}</p>
            <div className="gx-flex-row gx-mb-2">
              {strategy.data.stocks &&
                strategy.data.stocks.map((i, j) => (
                  <Tag
                    key={j}
                    color="#8c8c8c"
                    className="gx-mb-2 gx-mb-md-0 gx-text-center"
                  >
                    {i.toUpperCase()}
                  </Tag>
                ))}
            </div>
            <div>
              <Text>
                <Text type="warning">{strategy.data.wonOrders}</Text> orders won
                of
                <Text type="warning">
                  {" "}
                  {strategy.data.wonOrders + strategy.data.lostOrders}
                </Text>
              </Text>
              <Progress percent={parseFloat(percent)} status="active" />
            </div>

            <ButtonGroup className={"gx-flex-column gx-flex-md-row gx-mt-2"}>
              {userInfo.username === strategy.data.username ? (
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
                      Delete
                    </Button>
                  </Popconfirm>
                  <Button
                    icon="edit"
                    type="primary"
                    block
                    onClick={(_) =>
                      setStrategyEditItem({
                        _id: strategy.data._id,
                        title: strategy.data.title,
                        description: strategy.data.description,
                        cost: strategy.data.cost,
                        pic: strategy.data.pic,
                        stocks: strategy.data.stocks,
                        tradeType: strategy.data.tradeType,
                        public: strategy.data.public,
                      })
                    }
                  >
                    Edit
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    block
                    loading={
                      pageLoaders.toggleWatchStrategy === strategy.data._id
                    }
                    onClick={(_) =>
                      dispatch(toggleWatchStrategy(strategy.data._id, "one"))
                    }
                    type={
                      strategy.data.watchersIds.includes(userInfo.username)
                        ? "primary"
                        : "default"
                    }
                  >
                    <i className="icon gx-mr-2 icon-notification" />
                    Watch
                  </Button>
                  <Popconfirm
                    title={`This will cost you ${strategy.data.cost}$ monthly and can't be refunded ?`}
                    visible={isPopVisible}
                    onVisibleChange={handlePopVisibleChange}
                    onConfirm={handleFollow}
                    onCancel={(_) => setIsPopVisible(false)}
                  >
                    <Button
                      block
                      loading={isLoading}
                      type={
                        strategy.data.followersIds.includes(userInfo.username)
                          ? "primary"
                          : "default"
                      }
                    >
                      <i className="icon gx-mr-2 icon-add" />
                      Follow with {strategy.data.cost}$
                    </Button>
                  </Popconfirm>
                  <Popover content={shareContent} trigger="hover">
                    <Button block>
                      <i className="icon gx-mr-2 icon-sent" />
                      Share
                    </Button>
                  </Popover>
                </>
              )}
            </ButtonGroup>
          </Card>
          <Row>
            <Col xs={24} md={8}>
              <StrategyLists
                title={"Followers"}
                items={strategy.followers}
                icon={<i className="icon gx-mr-2 icon-add" />}
              />
            </Col>
            <Col xs={24} md={8}>
              <StrategyLists
                title={"Watchers"}
                items={strategy.watchers}
                icon={<i className="icon gx-mr-2 icon-notification" />}
              />
            </Col>
            <Col xs={24} md={8}>
              <Card
                title={
                  <Text>
                    <i className="icon icon-shopping-cart gx-mr-2" /> Orders
                    List
                  </Text>
                }
              >
                {strategy.orders && strategy.orders.length >= 1 ? (
                  strategy.orders.map((item, index) => (
                    <OrderItem order={item} />
                  ))
                ) : (
                  <div className="gx-text-center">
                    <Text className="gx-text-orange">No Orders</Text>
                  </div>
                )}
              </Card>
            </Col>
          </Row>
          <EditModal setItem={setStrategyEditItem} item={strategyEditItem} />
        </>
      ) : (
        <Card className="gx-text-center gx-text-capitalize">
          <Title level={3}>There is no strategy with this ID</Title>
        </Card>
      )}
    </>
  );
};

export default Strategy;

{
  /* <Card>
  <div className="gx-flex-column gx-flex-md-row gx-align-items-center">
    <Avatar
      className="gx-size-80 gx-flex-shrink-0 "
      src={CDN + strategy.data.pic}
    />
    <div className="gx-flex-grow-1 gx-flex-column gx-my-3 gx-my-md-0 gx-ml-md-3 gx-align-items-center gx-align-items-md-start">
      <Text className="gx-fs-lg" strong>
        {strategy.data.title}
      </Text>
      <Text className="gx-fs-sm gx-mt-2">
        <DisplayDate date={strategy.data.addedIn} />
      </Text>
    </div>
    <div className="gx-flex-column gx-flex-md-row">
      <Tag
        color="#108ee9"
        className="gx-mb-2 gx-mb-md-0 gx-text-center"
      >
        {`cost ${strategy.data.cost}`.toUpperCase()}
      </Tag>
      <Tag
        color="#87d068"
        className="gx-mb-2 gx-mb-md-0 gx-text-center"
      >
        {`Won Orders ${strategy.data.wonOrders}`.toUpperCase()}
      </Tag>
      <Tag color="#f50" className="gx-mb-2 gx-mb-md-0 gx-text-center">
        {`Lost Orders ${strategy.data.lostOrders}`.toUpperCase()}
      </Tag>
      <Tag color="#fa8c16" className="gx-mb-0 gx-text-center">
        {strategy.data.tradeType.toUpperCase()}
      </Tag>
    </div>
  </div>
  <div className="gx-my-4">
    <Text className="gx-fs-lg gx-overflow-break">
      {strategy.data.description}
    </Text>
  </div>
  <div className="gx-flex-column gx-flex-md-row gx-justify-content-between gx-align-items-center">
    <div className="gx-d-flex gx-justify-content-center">
      {userInfo.username === strategy.data.username ? (
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
            >
              Delete
                      </Button>
          </Popconfirm>
          <Button
            icon="edit"
            type="primary"
            onClick={(_) =>
              setStrategyEditItem({
                _id: strategy.data._id,
                title: strategy.data.title,
                description: strategy.data.description,
                cost: strategy.data.cost,
                pic: strategy.data.pic,
                stocks: strategy.data.stocks,
                tradeType: strategy.data.tradeType,
                public: strategy.data.public,
              })
            }
          >
            Edit
                    </Button>
        </>
      ) : (
          <>
            <Button
              loading={
                pageLoaders.toggleWatchStrategy === strategy.data._id
              }
              onClick={(_) =>
                dispatch(toggleWatchStrategy(strategy.data._id, "one"))
              }
              type={
                strategy.data.watchersIds.includes(userInfo.username)
                  ? "primary"
                  : "default"
              }
            >
              <i className="icon gx-mr-2 icon-notification" />
                      Watch
                    </Button>
            <Popconfirm
              title={`This will cost you ${strategy.data.cost}$ monthly and can't be refunded ?`}
              visible={isPopVisible}
              onVisibleChange={handlePopVisibleChange}
              onConfirm={handleFollow}
              onCancel={(_) => setIsPopVisible(false)}
            >
              <Button
                loading={isLoading}
                type={
                  strategy.data.followersIds.includes(userInfo.username)
                    ? "primary"
                    : "default"
                }
              >
                <i className="icon gx-mr-2 icon-add" />
                        Follow with {strategy.data.cost}$
                      </Button>
            </Popconfirm>
            <Popover content={shareContent} trigger="hover">
              <Button>
                <i className="icon gx-mr-2 icon-sent" />
                        Share
                      </Button>
            </Popover>
          </>
        )}
    </div>
    <div className="gx-flex-column gx-flex-md-row">
      {strategy.data.stocks &&
        strategy.data.stocks.map((i, j) => (
          <Tag
            key={j}
            color="#8c8c8c"
            className="gx-mb-2 gx-mb-md-0 gx-text-center"
          >
            {i.toUpperCase()}
          </Tag>
        ))}
    </div>
  </div>
</Card> */
}
