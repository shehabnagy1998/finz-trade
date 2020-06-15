import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { REDUX_ORDER_SIGNALS } from "../../constants/API";
import { Modal, Button, Typography, Collapse, Card, Row, Col, Tag } from "antd";
import DisplayDate from "../wall/DisplayDate";
import { Link } from "react-router-dom";
import OrderItem from "./OrderItem";
import IntlMessages from "../../util/IntlMessages";

const OrderSignalsModal = ({}) => {
  const { Title, Text } = Typography;
  const { Panel } = Collapse;

  const { orderSignals } = useSelector(({ Api }) => Api);
  const dispatch = useDispatch();
  console.log(orderSignals);
  return (
    <Modal
      visible={orderSignals.count >= 1}
      title={`Latest Signals Of Order #${orderSignals.order._id}`}
      onCancel={(_) =>
        dispatch({
          type: REDUX_ORDER_SIGNALS,
          value: { list: [], count: 0, order: {} },
        })
      }
      footer={null}
    >
      {orderSignals.list.length >= 1 ? (
        <>
          <Collapse accordion>
            {orderSignals.list.map((item, index) => (
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
                          {item.strategyName}
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
              </Panel>
            ))}
          </Collapse>
        </>
      ) : (
        <div className="gx-p-5 gx-text-center">
          <Text className="gx-fs-xl">No Orders Found</Text>
        </div>
      )}
    </Modal>
  );
};

export default OrderSignalsModal;
