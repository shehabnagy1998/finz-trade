import React, { useState } from "react";
import { Col, Row, Radio } from "antd";
import PricingItem from "../pricingItem";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import IntlMessages from "util/IntlMessages";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const Basic = () => {
  const pricingTable = useSelector(({ Api }) => Api.pricingTable);
  const [period, setPeriod] = useState("yearly");
  const stripePromise = loadStripe("pk_test_A4NpuY8IglXSz4BGF0xQIkXE");

  return (
    <div className="gx-price-tables gx-pt-default">
      <Row gutter={[16, 32]}>
        <Col span={24} className="gx-d-flex gx-justify-content-center">
          <RadioGroup
            buttonStyle="solid"
            defaultValue={period}
            onChange={(e) => setPeriod(e.target.value)}
            size="large"
          >
            <RadioButton value="yearly">
              <IntlMessages id="yearly" />
            </RadioButton>
            <RadioButton value="halfYearly">
              <IntlMessages id="biyearly" />
            </RadioButton>
            <RadioButton value="monthly">
              <IntlMessages id="monthly" />
            </RadioButton>
          </RadioGroup>
        </Col>

        <Elements stripe={stripePromise}>
          {pricingTable.map((item, index) => (
            <Col xl={8} lg={24} md={8} xs={24} key={index}>
              <PricingItem
                item={item}
                period={period}
                key={index}
                styleName={
                  item.name === "Profissional"
                    ? "gx-package gx-bg-primary-light gx-highlight gx-border-0"
                    : "gx-package"
                }
                headerStyle={
                  item.name === "Profissional"
                    ? "gx-package-header gx-bg-primary gx-text-white"
                    : "gx-package-header gx-bg-primary gx-text-white"
                }
                itemStyle={
                  item.name === "Profissional"
                    ? "gx-package-body gx-text-white"
                    : "gx-package-body"
                }
                footerStyle={
                  item.name === "Profissional" ? "gx-btn-primary" : ""
                }
              />
            </Col>
          ))}
        </Elements>
      </Row>
    </div>
  );
};

export default Basic;
