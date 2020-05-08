import React, { useEffect } from "react";
import { Card, Col, Row, Typography } from "antd";

import IntlMessages from "util/IntlMessages";
import ContainerHeader from "components/ContainerHeader/index";
import Basic from "./Basic/index";
import { useDispatch, useSelector } from "react-redux";
import getPricingTable from "../../appRedux/actions/API/getPricingTable";
import CircularProgress from "../../components/CircularProgress";
import Coupon from "../../components/Coupon";

const { Title, Text } = Typography;

const PricingTable = ({ match }) => {
  const dispatch = useDispatch();
  const pageLoaders = useSelector(({ Api }) => Api.pageLoaders);

  useEffect(() => {
    dispatch(getPricingTable());
  }, []);

  return (
    <>
      {pageLoaders.getPricingTable ? (
        <CircularProgress />
      ) : (
        <Row gutter={[16, 32]}>
          <Col span={24} className="gx-flex-column gx-align-items-center">
            <Title level={2}>Let's Get Started</Title>
            <Text className="gx-fs-lg">
              To get started, you will need to choose a plan for your needs. You
              can select monthly, annual or half-annual options and go with one
              of the listed plans below.
            </Text>
          </Col>

          <Coupon />

          <Col span={24}>
            <Card>
              <Basic />
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default PricingTable;
