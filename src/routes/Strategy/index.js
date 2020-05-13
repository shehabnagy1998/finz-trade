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

const Strategy = ({ match }) => {
  const pageId = match.params.id;
  const dispatch = useDispatch();
  const { strategy, pageLoaders, strategies } = useSelector(({ Api }) => Api);
  const { userInfo } = useSelector(({ auth }) => auth);
  const [strategyEditItem, setStrategyEditItem] = useState({});
  const history = useHistory();

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

  return (
    <>
      {pageLoaders.getStrategies ||
      pageLoaders.getStrategyById ||
      pageLoaders.getRecentOrders ||
      pageLoaders.getUserInfo ? (
        <CircularProgress />
      ) : strategy.data._id ? (
        <>
          <Card>
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
              <div className="gx-d-flex">
                <Tag color="#108ee9" className="gx-mb-0">
                  Cost {strategy.data.cost}
                </Tag>
                <Tag color="#87d068" className="gx-mb-0">
                  {strategy.data.wonOrders} Won Orders
                </Tag>
                <Tag color="#f50" className="gx-mb-0">
                  {strategy.data.lostOrders} Lost Orders
                </Tag>
              </div>
            </div>
            <div className="gx-my-4">
              <Text className="gx-fs-lg gx-overflow-break">
                {strategy.data.description}
              </Text>
            </div>
            {userInfo.username === strategy.data.username ? (
              <div className="gx-flex-row gx-justify-content-center gx-justify-content-md-start">
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
                    })
                  }
                >
                  Edit
                </Button>
              </div>
            ) : (
              <div className="gx-flex-row gx-justify-content-center gx-justify-content-md-start">
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
                <Button>
                  <i className="icon gx-mr-2 icon-add" />
                  Follow
                </Button>
                <Popover content={shareContent} trigger="hover">
                  <Button>
                    <i className="icon gx-mr-2 icon-sent" />
                    Share
                  </Button>
                </Popover>
              </div>
            )}
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
