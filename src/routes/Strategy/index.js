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
  Collapse,
} from "antd";
import OrderItem from "./OrderItem";

import EditModal from "../../components/StrategyModal/Edit";
import { useHistory, Link } from "react-router-dom";

import OrderSignalsModal from "../../components/OrderSignalsModal";
import StrategyCard from "../../components/StrategyCard";
import TableContainer from "./TableContainer/TableContainer";
import ChartContainer from "./Chart/ChartContainer";
import IntlMessages from "../../util/IntlMessages";
const { Panel } = Collapse;

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
            {strategy.orders.length >= 2 && (
              <>
                {" "}
                <Col xs={24} md={14}>
                  <TableContainer />
                </Col>
                <Col
                  xs={24}
                  md={10}
                  className="gx-d-flex gx-align-items-center"
                >
                  <ChartContainer />
                </Col>
              </>
            )}
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
                    <Collapse accordion>
                      <Panel
                        key={index}
                        showArrow={false}
                        header={<OrderItem key={index} order={item} />}
                      >
                        <Row className="gx-mb-5">
                          <Col md={8}>
                            <div className="gx-flex-column">
                              <Text className="gx-text-muted gx-fs-md gx-mb-2">
                                <IntlMessages id="initialPrice" />
                              </Text>
                              <Text className="gx-fs-lg" ellipsis>
                                {item.initialPrice}
                              </Text>
                            </div>
                          </Col>
                          <Col md={8}>
                            <div className="gx-flex-column">
                              <Text className="gx-text-muted gx-fs-md gx-mb-2">
                                <IntlMessages id="closePrice" />
                              </Text>
                              <Text className="gx-fs-lg" ellipsis>
                                {item.closePrice}
                              </Text>
                            </div>
                          </Col>
                          <Col
                            md={8}
                            className="gx-d-flex gx-justify-content-end gx-align-items-center"
                          >
                            <Tag color="#8c8c8c" className="gx-text-center">
                              {item.side.toUpperCase()}
                            </Tag>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={8}>
                            <Link to={`/strategy/${item.strategyId}`}>
                              <div className="gx-flex-column">
                                <Text className="gx-text-muted gx-fs-md gx-mb-2">
                                  <IntlMessages id="stategy" />
                                </Text>
                                <Text className="gx-link gx-fs-lg" ellipsis>
                                  {item.strategyId}
                                </Text>
                              </div>
                            </Link>
                          </Col>
                          {/* <Col xs={8}>
                            <Link to={`/profile/${item.investorId}`}>
                              <div className="gx-flex-column">
                                <Text className="gx-text-muted gx-fs-md gx-mb-2">
                                  <IntlMessages id="investor" />
                                </Text>
                                <Text className="gx-link gx-fs-lg" ellipsis>
                                  {item.investorId ? item.investorId : "-"}
                                </Text>
                              </div>
                            </Link>
                          </Col> */}
                          <Col xs={8}>
                            <Link to={`/profile/${item.managerId}`}>
                              <div className="gx-flex-column">
                                <Text className="gx-text-muted gx-fs-md gx-mb-2">
                                  <IntlMessages id="manger" />
                                </Text>
                                <Text className="gx-link gx-fs-lg" ellipsis>
                                  {item.managerId}
                                </Text>
                              </div>
                            </Link>
                          </Col>
                        </Row>
                      </Panel>
                    </Collapse>
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
