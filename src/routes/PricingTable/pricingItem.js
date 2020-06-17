import React, { useState, useEffect } from "react";
import { Button, Typography, notification, Modal } from "antd";

import IntlMessages from "util/IntlMessages";
import subscribePlan from "../../appRedux/actions/API/subscribePlan";
import { getUserInfo } from "../../appRedux/actions/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useStripe } from "@stripe/react-stripe-js";
import confirmSubscribePlan from "../../appRedux/actions/API/confirmSubscribePlan";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const openNotificationError = (msg) => {
  notification["error"]({
    message: "Subscription",
    description: msg,
  });
};

const { confirm } = Modal;

const PriceItem = ({
  item,
  styleName,
  headerStyle,
  itemStyle,
  footerStyle,
  period,
}) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [stripeConfirm, setStripeConfirm] = useState(null);
  const { coupon, pageTemps } = useSelector(({ Api }) => Api);
  const { userInfo } = useSelector(({ auth }) => auth);
  const history = useHistory();
  const stripe = useStripe();
  const { Text } = Typography;
  const handleSubscribe = async (_) => {
    if (!userInfo.mainPaymentSourceId) {
      openNotificationError(
        "please add payment method first then subscribe to a plan"
      );
      history.push(`/profile/${userInfo.username}`);
      return;
    }
    try {
      setLoader(true);
      await dispatch(subscribePlan(item[`${period}StripeId`]));
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const myMethod = async (_) => {
      setLoader(true);

      const confirm = await stripe.confirmCardPayment(pageTemps.clientSecret);
      setStripeConfirm(confirm.paymentIntent);
      setLoader(false);
    };

    if (pageTemps.clientSecret) myMethod();
  }, [pageTemps.clientSecret]);
  useEffect(() => {
    const myMethod = async (_) => {
      setLoader(true);
      await dispatch(confirmSubscribePlan(stripeConfirm.id));
      await dispatch(getUserInfo());
      setStripeConfirm(null);
      setLoader(false);
    };

    if (stripeConfirm) myMethod();
  }, [stripeConfirm]);

  const getDiscount = (_) => {
    let oldValue = parseFloat(item[`${period}Cost`]),
      newValue = 0;

    if (coupon.amount_off) newValue = oldValue - parseFloat(coupon.amount_off);
    else newValue = oldValue - oldValue * (coupon.percent_off / 100);

    if (newValue)
      return (
        <div className="gx-d-flex gx-align-items-center gx-justify-content-center gx-text-white">
          <Text strong className="gx-price gx-fs-xxl gx-mr-2 gx-text-white">
            {newValue}$
          </Text>
          <Text className="gx-price gx-fs-lg gx-text-white" delete>
            {oldValue}$
          </Text>
        </div>
      );
    else return <h2 className="gx-price">{oldValue}$</h2>;
  };

  function showConfirm() {
    confirm({
      title: `Do you want to subscribe to ${item.name}`,
      icon: <ExclamationCircleOutlined />,
      content: "you will be charged with this plan price",
      onOk() {
        handleSubscribe();
      },
      onCancel() {},
    });
  }

  return (
    <div className={`${styleName}`}>
      <div className={`${headerStyle}`}>
        {getDiscount()}
        <p className="gx-letter-spacing-base gx-text-white gx-text-uppercase gx-mb-0">
          {item.name}
        </p>
      </div>

      <div className={`${itemStyle}`}>
        <ul className="gx-package-items">
          <li className="gx-d-flex">
            <span>{item.maxFollowers}</span>
            <span className="gx-ml-3">
              <IntlMessages id="maxFollowers" />
            </span>
          </li>

          <li className="gx-d-flex">
            <span>{item.maxWatchers}</span>
            <span className="gx-ml-3">
              <IntlMessages id="maxWatchers" />
            </span>
          </li>

          <li className="gx-d-flex">
            <span>{item.maxStrategiesAdd}</span>
            <span className="gx-ml-3">
              <IntlMessages id="maxStrategiesAdd" />
            </span>
          </li>

          <li className="gx-d-flex">
            <span>{item.maxStrategiesFollow}</span>
            <span className="gx-ml-3">
              <IntlMessages id="maxStrategiesFollow" />
            </span>
          </li>

          <li className="gx-d-flex">
            <span>{item.maxStrategiesWatch}</span>
            <span className="gx-ml-3">
              <IntlMessages id="maxStrategiesWatch" />
            </span>
          </li>

          <li className="gx-d-flex">
            <span>{item.maxBrokersHave}</span>
            <span className="gx-ml-3">
              <IntlMessages id="maxBrokers" />
            </span>
          </li>
        </ul>

        <div className="gx-package-footer">
          <Button
            type="primary"
            className={`${footerStyle}`}
            onClick={showConfirm}
            loading={loader}
          >
            <IntlMessages id="buyNow" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PriceItem;
