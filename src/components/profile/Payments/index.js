import React, { useState } from "react";
import { Typography, Button, Modal, Avatar } from "antd";
import Widget from "../../Widget/index";
import PaymentModal from "./PaymentModal";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { useSelector, useDispatch } from "react-redux";
import deletePaymentSource from "../../../appRedux/actions/API/deletePaymentSource";
import { getUserInfo } from "../../../appRedux/actions/Auth";
import Cards from "react-credit-cards";

const { Text } = Typography;

const Payments = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { pageLoaders, paymentSource } = useSelector(({ Api }) => Api);
  const { userInfo } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();

  const handleDelete = async (_) => {
    await dispatch(deletePaymentSource(userInfo.mainPaymentSourceId));
    await dispatch(getUserInfo());
  };

  const stripePromise = loadStripe("pk_test_A4NpuY8IglXSz4BGF0xQIkXE");
  console.log(paymentSource);
  return (
    <Widget styleName="gx-card-profile-sm">
      <div className="gx-d-flex gx-align-items-center gx-justify-content-between gx-mt-2 gx-mb-3">
        <div className="gx-d-flex gx-align-items-center gx-my-3">
          {/* <i className="icon icon-card gx-mr-2 gx-center" /> */}
          <Text className="gx-fs-xl">Payment</Text>
        </div>
        {userInfo.mainPaymentSourceId ? (
          <Button
            icon={"delete"}
            shape="circle"
            className="gx-m-0"
            onClick={handleDelete}
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

      {userInfo.mainPaymentSourceId && paymentSource.card ? (
        <div className="gx-flex-row ">
          <Cards
            expiry={`${
              paymentSource.card.exp_month.toString().length >= 2
                ? paymentSource.card.exp_month
                : "0" + paymentSource.card.exp_month.toString()
            }/${paymentSource.card.exp_year}`}
            name={paymentSource.billing_details.name}
            number={`${paymentSource.card.last4}xxxxxxxxxxxxx`}
          />
        </div>
      ) : (
        <div className="gx-text-center">
          <Text className="gx-text-orange gx-fs-lg gx-text-capitalize">
            You didn't add any credit card
          </Text>
        </div>
      )}
      <Elements stripe={stripePromise}>
        <PaymentModal isVisible={isVisible} setIsVisible={setIsVisible} />
      </Elements>
    </Widget>
  );
};

export default Payments;
