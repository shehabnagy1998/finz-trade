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
      title={userInfo.payout ? "Edit Payout" : "Add Payout"}
      onCancel={handleCancel}
      footer={null}
      bodyStyle={{ paddingBottom: 0 }}
    >
      <Form onSubmit={handleAdd} className="gx-w-100" {...layout}>
        <FormItem>
          {getFieldDecorator("accountName", {
            rules: [{ required: true, message: "Please input account name!" }],
          })(<Input placeholder="Account Name" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("accountNumber", {
            rules: [
              { required: true, message: "Please input account number!" },
            ],
          })(<Input type="number" placeholder="Account Number" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("bankName", {
            rules: [{ required: true, message: "Please input bank name!" }],
          })(<Input placeholder="Bank Name" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("country", {
            rules: [{ required: true, message: "Please input Country!" }],
          })(<Input placeholder="Country" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("city", {
            rules: [
              { required: true, message: "Please input card holder city!" },
            ],
          })(<Input placeholder="Card holder city" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("address", {
            rules: [{ required: true, message: "Please input address!" }],
          })(<Input placeholder="Address" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("postalCode", {
            rules: [
              { required: true, message: "Please input postal code!" },
              { validator: validateFormFields },
            ],
          })(<Input placeholder="Postal Code" type="number" />)}
        </FormItem>

        <FormItem className="">
          <div className="gx-d-flex gx-align-items gx-justify-content-end gx-mt-3">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button
              htmlType="submit"
              type="primary"
              loading={pageLoaders.addPayout}
            >
              Ok
            </Button>
          </div>
        </FormItem>
      </Form>
    </Modal>
  );
};

const WrappedPaymentForm = Form.create()(PayoutModal);

export default WrappedPaymentForm;
