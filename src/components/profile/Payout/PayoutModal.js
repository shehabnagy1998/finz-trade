import React, { useState, useEffect } from "react";
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
import addPayout from "../../../appRedux/actions/API/addPayout";
import editPayout from "../../../appRedux/actions/API/editPayout";
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

const PayoutModal = ({ isVisible, setIsVisible, form }) => {
  const dispatch = useDispatch();
  const pageLoaders = useSelector(({ Api }) => Api.pageLoaders);
  const { userInfo } = useSelector(({ auth }) => auth);
  const { getFieldDecorator, setFieldsValue } = form;
  const { formatMessage } = useIntl();

  const handleCancel = (e) => {
    setIsVisible(false);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        if (userInfo.payout.accountNumber) await dispatch(editPayout(values));
        else await dispatch(addPayout(values));
        setIsVisible(false);
      }
    });
  };

  useEffect(() => {
    if (userInfo.payout && userInfo.payout.accountNumber)
      setFieldsValue({ ...userInfo.payout });
  }, [userInfo.payout]);

  const validateFormFields = (rule, value, callback) => {
    const fieldName = rule.field;
    if (fieldName === "postalCode") {
      /^$|^[0-9\ ]{5}$/.test(value)
        ? callback()
        : callback("should be 5 numbers");
    }
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 24 },
  };

  return (
    <Modal
      visible={isVisible}
      title={
        userInfo.payout ? (
          <IntlMessages id="editPayout" />
        ) : (
          <IntlMessages id="addPayout" />
        )
      }
      onCancel={handleCancel}
      footer={null}
      bodyStyle={{ paddingBottom: 0 }}
    >
      <Form onSubmit={handleAdd} className="gx-w-100" {...layout}>
        <FormItem>
          {getFieldDecorator("accountName", {
            rules: [
              {
                required: true,
                message: <IntlMessages id="accountNameError" />,
              },
            ],
          })(<Input placeholder={formatMessage({ id: "accountName" })} />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("accountNumber", {
            rules: [
              {
                required: true,
                message: <IntlMessages id="accountNumError" />,
              },
            ],
          })(
            <Input
              type="number"
              placeholder={formatMessage({ id: "accountNum" })}
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("bankName", {
            rules: [
              { required: true, message: <IntlMessages id="bankNameError" /> },
            ],
          })(<Input placeholder={formatMessage({ id: "bankName" })} />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("country", {
            rules: [
              {
                required: true,
                message: <IntlMessages id="accountCountryError" />,
              },
            ],
          })(
            <Select placeholder={formatMessage({ id: "accountCountry" })}>
              {ALL_COUNTRIES.map((i) => (
                <Select.Option value={i.Code}>{i.Name}</Select.Option>
              ))}
            </Select>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("city", {
            rules: [
              {
                required: true,
                message: <IntlMessages id="accountCityError" />,
              },
            ],
          })(<Input placeholder={formatMessage({ id: "accountCity" })} />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("address", {
            rules: [
              {
                required: true,
                message: <IntlMessages id="accountAddressError" />,
              },
            ],
          })(<Input placeholder={formatMessage({ id: "accountAddress" })} />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("postalCode", {
            rules: [
              {
                required: true,
                message: <IntlMessages id="accountPostalError" />,
              },
              { validator: validateFormFields },
            ],
          })(
            <Input
              placeholder={formatMessage({ id: "accountPostal" })}
              type="number"
            />
          )}
        </FormItem>

        <FormItem className="">
          <div className="gx-d-flex gx-align-items gx-justify-content-end gx-mt-3">
            <Button onClick={handleCancel}>
              <IntlMessages id="cancel" />
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              loading={pageLoaders.addPayout}
            >
              <IntlMessages id="ok" />
            </Button>
          </div>
        </FormItem>
      </Form>
    </Modal>
  );
};

const WrappedPaymentForm = Form.create()(PayoutModal);

export default WrappedPaymentForm;
