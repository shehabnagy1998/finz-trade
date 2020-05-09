import React, { useState, useEffect } from "react";
import { Row, Col, Card, Typography, Radio, Pagination } from "antd";
import { useSelector, useDispatch } from "react-redux";
import OrderItem from "./OrderItem";
import getSignals from "../../appRedux/actions/API/getSignals";
import CircularProgress from "../../components/CircularProgress";

const { Title, Text } = Typography;

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
            <Col md={6}>
              <Card title="Filter">
                <Radio.Group value={filter} onChange={handleChangeFilter}>
                  <Radio style={radioStyle} value={"all"}>
                    All
                  </Radio>
                  <Radio style={radioStyle} value={"win"}>
                    win
                  </Radio>
                  <Radio style={radioStyle} value={"lost"}>
                    lose
                  </Radio>
                  <Radio style={radioStyle} value={"execute"}>
                    execute
                  </Radio>
                </Radio.Group>
              </Card>
            </Col>
            <Col md={18}>
              <Title level={4} className="gx-text-capitalize">
                {filter} Orders
              </Title>
              {signals.list.length >= 1 ? (
                <>
                  {signals.list.map((item, index) => (
                    <OrderItem key={index} order={item} />
                  ))}
                  <div className="gx-text-right gx-mb-2">
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
                  <Text className="gx-fs-xl">No Orders Found</Text>
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
