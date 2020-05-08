import React, { useState } from "react";
import { Typography, Button, Modal, Avatar } from "antd";
import Widget from "../../Widget/index";
import PaymentModal from "./PaymentModal";
import { Elements } from "react-stripe-elements";
import { useSelector, useDispatch } from "react-redux";
import deletePaymentSource from "../../../appRedux/actions/API/deletePaymentSource";
import getUserInfo from "../../../appRedux/actions/API/getUserInfo";
import Cards from "react-credit-cards";

const { Text } = Typography;

const Payments = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { user, pageLoaders, paymentSource } = useSelector(({ Api }) => Api);
  const dispatch = useDispatch();

  const handleDelete = async (_) => {
    await dispatch(deletePaymentSource(user.mainPaymentSourceId));
    await dispatch(getUserInfo());
  };

  const selectImg = (val) => {
    switch (val.toLowerCase()) {
      case "visa":
        return (
          <Avatar
            shape="square"
            src={require(`assets/images/widget/visa.png`)}
          />
        );
      case "mastercard":
        return (
          <Avatar
            shape="square"
            src={require(`assets/images/widget/mastercard.png`)}
          />
        );
      case "discover":
        return (
          <Avatar
            shape="square"
            src={require(`assets/images/widget/discover.png`)}
          />
        );
      case "american-express":
        return (
          <Avatar
            shape="square"
            src={require(`assets/images/widget/american-express.png`)}
          />
        );
      case "paypal":
        return (
          <Avatar
            shape="square"
            src={require(`assets/images/widget/paypal.png`)}
          />
        );

      default:
        return null;
    }
  };

  console.log(paymentSource);

  return (
    <Widget styleName="gx-card-profile-sm">
      <div className="gx-d-flex gx-align-items-center gx-justify-content-between gx-mt-2 gx-mb-3">
        <div className="gx-d-flex gx-align-items-center gx-my-3">
          <i className="icon icon-card gx-mr-2 gx-center" />
          <Text className="gx-fs-xl">Payment</Text>
        </div>
        {user.mainPaymentSourceId ? (
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

      {user.mainPaymentSourceId ? (
        <div className="gx-flex-row ">
          <Cards
            expiry={`${
              paymentSource.exp_month.length >= 2
                ? paymentSource.exp_month
                : "0" + paymentSource.exp_month.toString()
            }/${paymentSource.exp_year}`}
            name={paymentSource.name}
            number={`${paymentSource.last4}xxxxxxxxxxxxx`}
          />
        </div>
      ) : (
        <div className="gx-flex-column">
          <Text>You dont have payment method, Try add one now</Text>
        </div>
      )}
      <Elements>
        <PaymentModal isVisible={isVisible} setIsVisible={setIsVisible} />
      </Elements>
    </Widget>
  );
};

export default Payments;
