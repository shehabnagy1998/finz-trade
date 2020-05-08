import React, { useState } from "react";
import { Col, Row, Radio } from "antd";
import PricingItem from "../pricingItem";
import { useSelector } from "react-redux";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const Basic = () => {
  const pricingTable = useSelector(({ Api }) => Api.pricingTable);
  const [period, setPeriod] = useState("yearly");

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
            <RadioButton value="yearly">Year</RadioButton>
            <RadioButton value="halfYearly">Half-Year</RadioButton>
            <RadioButton value="monthly">Month</RadioButton>
          </RadioGroup>
        </Col>

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
              footerStyle={item.name === "Profissional" ? "gx-btn-primary" : ""}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Basic;
