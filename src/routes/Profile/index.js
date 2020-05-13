import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import Status from "../../components/profile/Status";
import Broker from "../../components/profile/Broker";

import { friendList } from "./data";
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

const Profile = ({ match }) => {
  const { pageLoaders, paymentSource, otherUser } = useSelector(
    ({ Api }) => Api
  );
  const { userInfo } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();

  const paramId = match.params.id;
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [profileInfo, setProfileInfo] = useState({});

  useEffect(() => {
    const getFunc = async () => {
      if (paramId === userInfo.username) {
        setIsMyProfile(true);
        setProfileInfo(userInfo);
      } else {
        await dispatch(getOtherUser(paramId));
        console.log(otherUser);
        setProfileInfo(otherUser);
      }
    };
    getFunc();
  }, [paramId, userInfo]);

  useEffect(() => {
    dispatch(getBrokers());
  }, []);

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
          <ProfileHeader profileInfo={profileInfo} />
          <div className="gx-profile-content">
            <Row>
              <Col xl={16} lg={14} md={14} sm={24} xs={24}>
                <Status />
                {isMyProfile && <OwnStrategy />}
              </Col>

              <Col xl={8} lg={10} md={10} sm={24} xs={24}>
                <Broker />
                {isMyProfile && <Settings />}
                {isMyProfile && <Payments />}
                {isMyProfile && <Subscription />}
              </Col>
            </Row>
          </div>
        </Auxiliary>
      )}
    </>
  );
};

export default Profile;
