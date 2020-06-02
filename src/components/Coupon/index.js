import React, { useEffect, useState } from "react";
import {
  Badge,
  Typography,
  Button,
  Switch,
  Spin,
  Card,
  Input,
  Form,
  notification,
} from "antd";
import Widget from "../Widget/index";
import { useSelector, useDispatch } from "react-redux";
import editUserSettings from "../../appRedux/actions/API/editUserSettings";
import applyCoupon from "../../appRedux/actions/API/applyCoupon";
import IntlMessages from "util/IntlMessages";
import { useIntl } from "react-intl";

const { Title, Text } = Typography;
const FormItem = Form.Item;

const Coupon = ({ form }) => {
  const { getFieldDecorator } = form;

  const { pageLoaders } = useSelector(({ Api }) => Api);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      console.log("values", values);
      if (!err) {
        dispatch(applyCoupon(values.coupon));
      }
    });
  };
  const { formatMessage } = useIntl();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 24 },
  };

  return (
    <Card className="gx-w-100">
      <div className=" gx-text-center">
        <Title>
          <IntlMessages id="enterCoupon" />
        </Title>
      </div>
      <div className="gx-text-center">
        <Form
          {...layout}
          onSubmit={handleSubmit}
          className="gx-signup-form gx-form-row0"
        >
          <FormItem>
            {getFieldDecorator("coupon", {
              rules: [
                { required: true, message: <IntlMessages id="couponError" /> },
              ],
            })(<Input placeholder={formatMessage({ id: "coupon" })} />)}
          </FormItem>

          <FormItem>
            <div className="gx-text-center">
              <Button
                type="primary"
                onClick={handleSubmit}
                loading={pageLoaders.applyCoupon}
              >
                <IntlMessages id="enter" />
              </Button>
            </div>
          </FormItem>
        </Form>
      </div>
    </Card>
  );
};

const WrappedCouponForm = Form.create()(Coupon);

export default WrappedCouponForm;
