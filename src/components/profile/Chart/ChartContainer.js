import React from "react";
import { Row, Col } from "antd";
import { useSelector } from "react-redux";
import AreaChart from "./AreaChart";
import BarChart from "./BarChart";

const ChartContainer = ({ profileInfo }) => {
  return (
    <div>
      <Row>
        {profileInfo.stats.rios && profileInfo.stats.rios.length >= 1 && (
          <Col xs={24}>
            <AreaChart
              name={"rios"}
              data={profileInfo.stats.rios}
              cName="Rios"
            />
          </Col>
        )}
        {profileInfo.stats.winingRates &&
          profileInfo.stats.winingRates.length >= 1 && (
            <Col xs={24}>
              <BarChart
                name={"winingRates"}
                data={profileInfo.stats.winingRates}
                cName="Winning Rates (%)"
              />
            </Col>
          )}
      </Row>
    </div>
  );
};

export default ChartContainer;
