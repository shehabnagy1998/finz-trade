import React from "react";
import { Col, Row, Tabs, Typography } from "antd";
import Widget from "components/Widget";
import { aboutList } from "../../../routes/Profile/data";
import AboutItem from "./AboutItem";
import { useSelector } from "react-redux";

const TabPane = Tabs.TabPane;
const { Text } = Typography;

const About = ({ isMyProfile }) => {
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
            {strategies.following.length >= 1 ? (
              strategies.following.map((about, index) => (
                <AboutItem
                  key={index}
                  data={about}
                  type="following"
                  isMyProfile={isMyProfile}
                />
              ))
            ) : (
              <div className="gx-text-center gx-mt-3">
                <Text className="gx-text-orange gx-fs-lg">
                  No Following Strategies
                </Text>
              </div>
            )}
          </div>
        </TabPane>
        <TabPane tab="Watching" key="2">
          <div className="gx-mb-2">
            {strategies.watching.length >= 1 ? (
              strategies.watching.map((about, index) => (
                <AboutItem
                  key={index}
                  data={about}
                  type="watching"
                  isMyProfile={isMyProfile}
                />
              ))
            ) : (
              <div className="gx-text-center gx-mt-3">
                <Text className="gx-text-orange gx-fs-lg">
                  No Watching Strategies
                </Text>
              </div>
            )}
          </div>
        </TabPane>
      </Tabs>
    </Widget>
  );
};

export default About;
