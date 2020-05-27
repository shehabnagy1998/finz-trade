import React from "react";
import { Row, Col } from "antd";
import { useSelector } from "react-redux";
import AreaChart from "./AreaChart";
import BarChart from "./BarChart";

const ChartContainer = () => {
  const strategy = useSelector(({ Api }) => Api.strategy);

  return (
    <div>
      <Row>
        {strategy.stats.rios && strategy.stats.rios.length >= 1 && (
          <Col xs={24}>
            <AreaChart name={"rios"} data={strategy.stats.rios} cName="Rios" />
          </Col>
        )}
        {strategy.stats.winingRates && strategy.stats.winingRates.length >= 1 && (
          <Col xs={24}>
            <BarChart
              name={"winingRates"}
              data={strategy.stats.winingRates}
              cName="Winning Rates (%)"
            />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default ChartContainer;
