import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Radio,
  Pagination,
  Collapse,
  Tag,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import OrderItem from "./OrderItem";
import getSignals from "../../appRedux/actions/API/getSignals";
import CircularProgress from "../../components/CircularProgress";
import { Link } from "react-router-dom";
import IntlMessages from "../../util/IntlMessages";

const { Title, Text } = Typography;
const { Panel } = Collapse;

const radioStyle = {
  display: "block",
  height: "35px",
  lineHeight: "30px",
  textTransform: "capitalize",
};

const Orders = () => {
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const { signals, pageLoaders } = useSelector(({ Api }) => Api);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSignals(page));
  }, []);

  const handleChangeFilter = async (e) => {
    let val = e.target.value;
    if (val === "all") await dispatch(getSignals(1));
    else await dispatch(getSignals(1, val));
    setFilter(val);
    setPage(1);
  };

  const handleChangePagination = async (num) => {
    if (filter === "all") await dispatch(getSignals(num));
    else await dispatch(getSignals(num, filter));
    setPage(num);
  };

  return (
    <>
      {pageLoaders.getStrategies ||
      pageLoaders.getPaymentSource ||
      pageLoaders.getUserInfo ||
      pageLoaders.getSignals ? (
        <CircularProgress />
      ) : (
        <div className="gx-main-content">
          <Row>
            <Col md={6} xs={24}>
              <Card title="Filter">
                <Radio.Group value={filter} onChange={handleChangeFilter}>
                  <Radio style={radioStyle} value={"all"}>
                    <IntlMessages id="all" />
                  </Radio>
                  <Radio style={radioStyle} value={"win"}>
                    <IntlMessages id="win" />
                  </Radio>
                  <Radio style={radioStyle} value={"lose"}>
                    <IntlMessages id="lose" />
                  </Radio>
                  <Radio style={radioStyle} value={"execute"}>
                    <IntlMessages id="pending" />
                  </Radio>
                </Radio.Group>
              </Card>
            </Col>
            <Col md={18} xs={24}>
              <Title level={4} className="gx-text-capitalize">
                {filter} <IntlMessages id="orders" />
              </Title>
              {signals.list.length >= 1 ? (
                <>
                  <Collapse accordion>
                    {signals.list &&
                      signals.list.length >= 1 &&
                      signals.list.map((item, index) => (
                        <Panel
                          key={index}
                          showArrow={false}
                          header={<OrderItem key={index} order={item} />}
                        >
                          <Row className="">
                            <Col md={7} xs={12}>
                              <div className="gx-flex-column">
                                <Text className="gx-text-muted gx-fs-md gx-mb-2">
                                  <IntlMessages id="initialPrice" />
                                </Text>
                                <Text className="gx-fs-lg" ellipsis>
                                  {item.initialPrice}
                                </Text>
                              </div>
                            </Col>
                            <Col md={7} xs={12}>
                              <div className="gx-flex-column">
                                <Text className="gx-text-muted gx-fs-md gx-mb-2">
                                  <IntlMessages id="closePrice" />
                                </Text>
                                <Text className="gx-fs-lg" ellipsis>
                                  {item.closePrice}
                                </Text>
                              </div>
                            </Col>

                            <Col md={7} xs={12} className="gx-mt-3 gx-mt-md-0">
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
                            <Col
                              md={3}
                              xs={12}
                              className="gx-d-flex gx-justify-content-md-end gx-align-items-center gx-mt-3 gx-mt-md-0"
                            >
                              <Tag color="#8c8c8c" className="gx-text-center">
                                {item.side.toUpperCase()}
                              </Tag>
                            </Col>
                          </Row>
                          {/* <Row>
                          <Col xs={8}>
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
                          </Col> 
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
                        </Row>*/}
                        </Panel>
                      ))}
                  </Collapse>

                  <div className="gx-text-right gx-my-2">
                    <Pagination
                      onChange={handleChangePagination}
                      defaultCurrent={page}
                      current={page}
                      defaultPageSize={5}
                      total={signals.count}
                    />
                  </div>
                </>
              ) : (
                <div className="gx-p-5 gx-text-center">
                  <Text className="gx-fs-xl">
                    <IntlMessages id="noOrders" />
                  </Text>
                </div>
              )}
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default Orders;
