import React from "react";
import { Col, Row, Tabs, Typography } from "antd";
import Widget from "components/Widget";
import AboutItem from "./AboutItem";
import { useSelector } from "react-redux";
import IntlMessages from "util/IntlMessages";

const TabPane = Tabs.TabPane;
const { Text } = Typography;

const Watchlist = ({}) => {
  const strategies = useSelector(({ Api }) => Api.strategies);
  document.title = "FinzTrade - Watchlist";
  document.getElementsByTagName("META")[0].content = "";
  return (
    <Widget
      title="Watchlist"
      styleName="gx-card-tabs gx-card-tabs-right gx-card-profile"
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="Following" key="1">
          <div className="gx-mb-2">
            {strategies.following.length >= 1 ? (
              strategies.following.map((about, index) => (
                <AboutItem key={index} data={about} type="following" />
              ))
            ) : (
              <div className="gx-text-center gx-mt-3">
                <Text className="gx-text-orange gx-fs-lg">
                  <IntlMessages id="noFollowingStrategies" />
                </Text>
              </div>
            )}
          </div>
        </TabPane>
        <TabPane tab="Watching" key="2">
          <div className="gx-mb-2">
            {strategies.watching.length >= 1 ? (
              strategies.watching.map((about, index) => (
                <AboutItem key={index} data={about} type="watching" />
              ))
            ) : (
              <div className="gx-text-center gx-mt-3">
                <Text className="gx-text-orange gx-fs-lg">
                  <IntlMessages id="noWatchingStrategies" />
                </Text>
              </div>
            )}
          </div>
        </TabPane>
      </Tabs>
    </Widget>
  );
};

export default Watchlist;
