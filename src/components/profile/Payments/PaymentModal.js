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
import ALL_COUNTRIES from "../../../constants/Countries.json";
import IntlMessages from "../../../util/IntlMessages";
import { useIntl } from "react-intl";
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
  const { formatMessage } = useIntl();

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
        console.log(paymentMethod);
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
      title={<IntlMessages id="addCard" />}
      onCancel={handleCancel}
      footer={null}
      bodyStyle={{ paddingBottom: 0 }}
    >
      <Form onSubmit={handleAdd} className="gx-w-100" {...layout}>
        <FormItem>
          {getFieldDecorator("name", {
            rules: [
              { required: true, message: <IntlMessages id="cardNameError" /> },
            ],
          })(<Input placeholder={formatMessage({ id: "cardName" })} />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("country", {
            rules: [
              {
                required: true,
                message: <IntlMessages id="cardCountryError" />,
              },
            ],
          })(
            <Select placeholder={formatMessage({ id: "cardCountry" })}>
              {ALL_COUNTRIES.map((i) => (
                <Select.Option value={i.Code}>{i.Name}</Select.Option>
              ))}
            </Select>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("city", {
            rules: [
              { required: true, message: <IntlMessages id="cardCityError" /> },
            ],
          })(<Input placeholder={formatMessage({ id: "cardCity" })} />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("line1", {
            rules: [
              {
                required: true,
                message: <IntlMessages id="cardAddressError" />,
              },
            ],
          })(<Input placeholder={formatMessage({ id: "cardAddress" })} />)}
        </FormItem>
        <FormItem>
          <CardElement
            onChange={(e) => setState({ credit: e.complete })}
            className="ant-input gx-pt-2"
          />
        </FormItem>

        <FormItem className="">
          <div className="gx-d-flex gx-align-items gx-justify-content-end gx-mt-3">
            <Button onClick={handleCancel}>
              <IntlMessages id="cancel" />
            </Button>
            <Button htmlType="submit" type="primary" loading={confirmLoading}>
              <IntlMessages id="ok" />
            </Button>
          </div>
        </FormItem>
      </Form>
    </Modal>
  );
};

const WrappedPaymentForm = Form.create()(PaymentModal);

export default WrappedPaymentForm;
