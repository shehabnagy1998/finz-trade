import React, { useState } from "react";
import { Typography, Button, Modal, Avatar } from "antd";
import Widget from "../../Widget/index";
import PayoutModal from "./PayoutModal";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { useSelector, useDispatch } from "react-redux";
import deletePaymentSource from "../../../appRedux/actions/API/deletePaymentSource";
import { getUserInfo } from "../../../appRedux/actions/Auth";
import Cards from "react-credit-cards";
import IntlMessages from "../../../util/IntlMessages";

const { Text } = Typography;

const Payout = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { pageLoaders, paymentSource } = useSelector(({ Api }) => Api);
  const { userInfo } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();

  return (
    <Widget styleName="gx-card-profile-sm">
      <div className="gx-d-flex gx-align-items-center gx-justify-content-between gx-mt-2 gx-mb-3">
        <div className="gx-d-flex gx-align-items-center gx-my-3">
          {/* <i className="icon icon-card gx-mr-2 gx-center" /> */}
          <Text className="gx-fs-xl">
            <IntlMessages id="payout" />
          </Text>
        </div>
        {userInfo.payout ? (
          <Button
            icon={"edit"}
            shape="circle"
            className="gx-m-0"
            onClick={(_) => setIsVisible(true)}
            loading={pageLoaders.deletePaymentSource}
          />
        ) : (
          <div className="gx-d-flex">
            <Button
              shape="circle"
              icon="plus"
              className="gx-m-0"
              onClick={(_) => setIsVisible(true)}
            />
          </div>
        )}
      </div>

      {userInfo.payout ? (
        <div className="gx-flex-column">
          <div className="gx-d-flex gx-justify-content-between">
            <Text>
              <IntlMessages id="accountName" />:
            </Text>
            <Text>{userInfo.payout.accountName}</Text>
          </div>
          <div className="gx-d-flex gx-justify-content-between">
            <Text>
              <IntlMessages id="accountNum" />:
            </Text>
            <Text>{userInfo.payout.accountNumber}</Text>
          </div>
          <div className="gx-d-flex gx-justify-content-between">
            <Text>
              <IntlMessages id="bankName" />:
            </Text>
            <Text>{userInfo.payout.bankName}</Text>
          </div>
        </div>
      ) : (
        <div className="gx-text-center">
          <Text className="gx-text-orange gx-fs-lg gx-text-capitalize">
            You didn't add any payout data
          </Text>
        </div>
      )}
      <PayoutModal isVisible={isVisible} setIsVisible={setIsVisible} />
    </Widget>
  );
};

export default Payout;
