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
import OrderItem from "./OrderItem";

import EditModal from "../../components/StrategyModal/Edit";
import { useHistory } from "react-router-dom";

import OrderSignalsModal from "../../components/OrderSignalsModal";
import StrategyCard from "../../components/StrategyCard";

const Strategy = ({ match }) => {
  const pageId = match.params.id;
  const dispatch = useDispatch();
  const { strategy, pageLoaders, strategies } = useSelector(({ Api }) => Api);
  const { Title, Text } = Typography;

  const [strategyEditItem, setStrategyEditItem] = useState({});

  useEffect(() => {
    if (strategies.all.length >= 1) dispatch(getStrategyById(pageId));
  }, [pageId, strategies]);

  console.log(strategy);

  return (
    <>
      {pageLoaders.getStrategies ||
      pageLoaders.getStrategyById ||
      pageLoaders.getRecentOrders ||
      pageLoaders.getUserInfo ? (
        <CircularProgress />
      ) : strategy.data._id ? (
        <>
          <StrategyCard
            strategy={strategy.data}
            setStrategyEditItem={setStrategyEditItem}
          />
          <Row>
            {/* <Col xs={24} md={8}>
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
            </Col> */}
            <Col xs={24}>
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
      <OrderSignalsModal />
    </>
  );
};

export default Strategy;
