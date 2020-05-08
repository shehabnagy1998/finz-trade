import React, { useEffect, useState } from "react";
import { Badge, Typography, Button, Switch, Spin, Card, Input } from "antd";
import Widget from "../Widget/index";
import { useSelector, useDispatch } from "react-redux";
import editUserSettings from "../../appRedux/actions/API/editUserSettings";
import applyCoupon from "../../appRedux/actions/API/applyCoupon";

const { Title, Text } = Typography;

const Coupon = ({}) => {
  const { user, pageLoaders } = useSelector(({ Api }) => Api);
  const [coupon, setCoupon] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (_) => {
    dispatch(applyCoupon(coupon));
  };
  return (
    <Card className="gx-w-100">
      <div className=" gx-text-center">
        <Title>Enter coupon if you have one</Title>
      </div>
      <div className="gx-text-center">
        <Input
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="Enter your coupon code"
          className="gx-mb-3"
        />
        <Button
          type="primary"
          onClick={handleSubmit}
          loading={pageLoaders.applyCoupon}
        >
          Enter
        </Button>
      </div>
    </Card>
  );
};
export default Coupon;
