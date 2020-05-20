import React, { useEffect, useState } from "react";

import { Col, Row, Card, Select } from "antd";
import StrategyList from "components/wall/StrategyList";
import CustomScrollbars from "util/CustomScrollbars";
import RecentOrders from "components/dashboard/CRM/RecentOrders";
import BuildingCard from "../../components/Widgets/BuildingCard";
import { useDispatch, useSelector } from "react-redux";
import getRecentOrders from "../../appRedux/actions/API/getRecentOrders";
import { sortBy } from "lodash";
import Profile from "components/wall/Profile/index";
import CircularProgress from "../../components/CircularProgress";

const Option = Select.Option;

const Index = ({ match }) => {
  const dispatch = useDispatch();
  const strategies = useSelector(({ Api }) => Api.strategies.others);
  const pageLoaders = useSelector(({ Api }) => Api.pageLoaders);
  const [items, setItems] = useState(strategies);
  const [sort, setSort] = useState("");

  useEffect(() => {
    dispatch(getRecentOrders());
  }, []);

  useEffect(() => {
    if (strategies.length >= 1) {
      let newItems = sortBy(strategies, (i) => i[sort]);
      setItems(newItems);
    }
  }, [strategies]);
  useEffect(() => {
    let newItems = sortBy(strategies, (i) => i[sort]);
    setItems(newItems);
  }, [sort]);

  return (
    <>
      {pageLoaders.getStrategies ||
      pageLoaders.getRecentOrders ||
      pageLoaders.getUserInfo ? (
        <CircularProgress />
      ) : (
        <div className="gx-main-content">
          <Row>
            <Col
              xl={6}
              lg={8}
              md={8}
              sm={10}
              xs={24}
              className="gx-d-none gx-d-sm-block"
            >
              <CustomScrollbars className="gx-wall-scroll">
                <Profile />
              </CustomScrollbars>
            </Col>
            <Col xl={12} lg={8} md={16} sm={14} xs={24}>
              {items.length >= 1 && (
                <CustomScrollbars className="gx-wall-scroll">
                  <div className="gx-wall-postlist">
                    <Card className="gx-card" title={"Sort By"}>
                      <Select
                        className="gx-w-100"
                        placeholder="choose the sort you want"
                        style={{ width: 120 }}
                        onChange={(value) => setSort(value)}
                      >
                        <Option value="addedIn">Newest</Option>
                        <Option value="wonOrders">Best</Option>
                        <Option value="watchers">Popular</Option>
                      </Select>
                    </Card>

                    <StrategyList items={items} />
                  </div>
                </CustomScrollbars>
              )}
            </Col>
            <Col
              xl={6}
              lg={8}
              md={6}
              sm={24}
              xs={24}
              className="gx-d-none gx-d-lg-block"
            >
              <CustomScrollbars className="gx-wall-scroll">
                <BuildingCard
                  noBadge={true}
                  title={"Download our app"}
                  text={"From Google Play"}
                  img={require("assets/images/google_play.png")}
                  link="https://play.google.com/store?hl=en"
                  classes="gx-mb-3"
                />
                <BuildingCard
                  noBadge={true}
                  title={"Download our app"}
                  text={"From App Store"}
                  img={require("assets/images/app_store.png")}
                  link="https://www.apple.com/ios/app-store/"
                />
                <RecentOrders shape="square" />
              </CustomScrollbars>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default Index;
