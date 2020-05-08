import React from "react";
import { Col, Row, Tabs } from "antd";
import Widget from "components/Widget";
import { aboutList } from "../../../routes/Profile/data";
import AboutItem from "./AboutItem";
import { useSelector } from "react-redux";

const TabPane = Tabs.TabPane;

const About = () => {
  const strategies = useSelector(({ Api }) => Api.strategies);
  console.log(strategies);

  return (
    <Widget
      title="Status"
      styleName="gx-card-tabs gx-card-tabs-right gx-card-profile"
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="Following" key="1">
          <div className="gx-mb-2">
            {strategies.following.map((about, index) => (
              <AboutItem key={index} data={about} type="following" />
            ))}
          </div>
        </TabPane>
        <TabPane tab="Watching" key="2">
          <div className="gx-mb-2">
            {strategies.watching.map((about, index) => (
              <AboutItem key={index} data={about} type="watching" />
            ))}
          </div>
        </TabPane>
      </Tabs>
    </Widget>
  );
};

export default About;
