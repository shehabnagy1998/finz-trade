import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  Modal,
  Button,
  Input,
  Select,
  Row,
  Col,
  message,
  notification,
  Form,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import addPaymentSource from "../../../appRedux/actions/API/addPaymentSource";
import { getUserInfo } from "../../../appRedux/actions/Auth";
const { Option } = Select;
const FormItem = Form.Item;

const openNotificationError = (msg) => {
  notification["error"]({
    message: "Payment",
    description: msg,
  });
};

const PaymentModal = ({ isVisible, setIsVisible, form }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [state, setState] = useState({
    credit: false,
  });
  const dispatch = useDispatch();
  const pageLoaders = useSelector(({ Api }) => Api.pageLoaders);
  const stripe = useStripe();
  const elements = useElements();

  const handleCancel = (e) => {
    setIsVisible(false);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        if (!state.credit) {
          openNotificationError("you didn't enter credit card data");
          return;
        }

        setConfirmLoading(true);
        const { paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement),
          billing_details: {
            address: {
              city: values.city,
              country: values.country,
              line1: values.line1,
            },
            name: values.name,
          },
        });
        if (!paymentMethod) {
          openNotificationError("please check your information");
          setConfirmLoading(false);
          return;
        }

        await dispatch(addPaymentSource(paymentMethod.id));
        await dispatch(getUserInfo());
        setIsVisible(false);
      }
    });
  };

  const { getFieldDecorator } = form;

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 24 },
  };

  return (
    <Modal
      visible={isVisible}
      title="Add Card"
      onCancel={handleCancel}
      footer={null}
      bodyStyle={{ paddingBottom: 0 }}
    >
      <Form onSubmit={handleAdd} className="gx-w-100" {...layout}>
        <FormItem>
          {getFieldDecorator("name", {
            rules: [
              { required: true, message: "Please input card holder name!" },
            ],
          })(<Input placeholder="Card holder name" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("country", {
            rules: [
              { required: true, message: "Please input card holder country!" },
            ],
          })(<Input placeholder="Card holder country" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("city", {
            rules: [
              { required: true, message: "Please input card holder city!" },
            ],
          })(<Input placeholder="Card holder city" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("line1", {
            rules: [
              { required: true, message: "Please input card holder address!" },
            ],
          })(<Input placeholder="Card holder address" />)}
        </FormItem>
        <FormItem>
          <CardElement
            onChange={(e) => setState({ credit: e.complete })}
            className="ant-input gx-pt-2"
          />
        </FormItem>

        <FormItem className="">
          <div className="gx-d-flex gx-align-items gx-justify-content-end gx-mt-3">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button htmlType="submit" type="primary" loading={confirmLoading}>
              Ok
            </Button>
          </div>
        </FormItem>
      </Form>
    </Modal>
  );
};

const WrappedPaymentForm = Form.create()(PaymentModal);

export default WrappedPaymentForm;
