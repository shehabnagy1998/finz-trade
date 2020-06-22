import React, { useEffect, useState } from "react";
import { Col, Row, Card, Typography } from "antd";
// import Status from "../../components/profile/Status";
import Broker from "../../components/profile/Broker";

import Settings from "../../components/profile/Settings";
import Auxiliary from "../../util/Auxiliary";
import ProfileHeader from "../../components/profile/ProfileHeader";
import OwnStrategy from "../../components/profile/OwnStrategy";
import { useSelector, useDispatch } from "react-redux";
import Payments from "../../components/profile/Payments";
import CircularProgress from "../../components/CircularProgress";
import Subscription from "../../components/profile/Subscription";
import getBrokers from "../../appRedux/actions/API/getBrokers";
import getOtherUser from "../../appRedux/actions/API/getOtherUser";
import getStrategies from "../../appRedux/actions/API/getStrategies";
import Payout from "../../components/profile/Payout";
import InVoices from "../../components/profile/Invoices";
import IntlMessages from "../../util/IntlMessages";
import TableContainer from "../../components/profile/TableContainer/TableContainer";
import ChartContainer from "../../components/profile/Chart/ChartContainer";
import Status from "../../components/profile/Status";

const Profile = ({ match, history }) => {
  const { pageLoaders, paymentSource, otherUser } = useSelector(
    ({ Api }) => Api
  );
  const { userInfo } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();

  document.title = userInfo.username
    ? `FinzTrade - ${userInfo.username}`
    : "FinzTrade - Profile";
  document.getElementsByTagName("META")[0].content = "";

  const paramId = match.params.id;
  const { Title } = Typography;

  // useEffect(() => {
  //   const getFunc = async () => {
  //     if (paramId === userInfo.username && isMyProfile === null) {
  //       // setIsMyProfile(true);
  //       // await setProfileInfo(userInfo);
  //       // await dispatch(getStrategies());
  //     } else {
  //       // await dispatch(getOtherUser(paramId));
  //       // await dispatch(getStrategies(paramId));
  //       // setProfileInfo(otherUser);
  //       // history.push("/home");
  //     }
  //   };
  //   getFunc();
  //   return (_) => setIsMyProfile(null);
  // }, [paramId, userInfo]);

  useEffect(() => {
    dispatch(getBrokers());
  }, []);

  const dis1 = { xl: 16, lg: 14, md: 14, sm: 24, xs: 24 };
  const dis2 = { xs: 24 };
  let toView = true ? dis1 : dis2;

  return (
    <>
      {pageLoaders.getStrategies ||
      pageLoaders.deleteStrategy ||
      pageLoaders.getRecentOrders ||
      pageLoaders.getBrokers ||
      pageLoaders.getPaymentSource ||
      pageLoaders.getOtherUser ||
      pageLoaders.getUserInfo ? (
        <CircularProgress />
      ) : (
        <Auxiliary>
          {userInfo.username ? (
            <>
              <ProfileHeader profileInfo={userInfo} />
              <div className="gx-profile-content">
                <Row>
                  <Col {...toView}>
                    {userInfo.stats && (
                      <TableContainer profileInfo={userInfo} />
                    )}
                    {!true && <Status isMyProfile={true} />}
                    <OwnStrategy isMyProfile={true} />
                    {true && <InVoices />}
                  </Col>

                  <Col xl={8} lg={10} md={10} sm={24} xs={24}>
                    {userInfo.stats && (
                      <ChartContainer profileInfo={userInfo} />
                    )}
                    {true && <Broker />}
                    {true && <Settings />}
                    {true && <Payments />}
                    {true && <Payout />}
                    {true && <Subscription />}
                  </Col>
                </Row>
              </div>
            </>
          ) : (
            <Card className="gx-text-center">
              <Title className="gx-m-0" level={4}>
                <IntlMessages id="noAccount" />
              </Title>
            </Card>
          )}
        </Auxiliary>
      )}
    </>
  );
};

export default Profile;
