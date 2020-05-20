import React, { useState } from "react";
import { Modal, Button, Input, Select, Row, Col, message, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import addPaymentSource from "../../../appRedux/actions/API/addPaymentSource";
import { getUserInfo } from "../../../appRedux/actions/Auth";
import addBroker from "../../../appRedux/actions/API/addBroker";
const FormItem = Form.Item;

const BrokerModal = ({ isVisible, setIsVisible, stripe, form }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const dispatch = useDispatch();
  const pageLoaders = useSelector(({ Api }) => Api.pageLoaders);

  const handleCancel = (e) => {
    setIsVisible(false);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        setConfirmLoading(true);
        await dispatch(addBroker(values));
        setConfirmLoading(false);
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
      title="Add Broker"
      onCancel={handleCancel}
      footer={null}
      bodyStyle={{ paddingBottom: 0 }}
    >
      <Form onSubmit={handleAdd} className="gx-w-100" {...layout}>
        <FormItem>
          {getFieldDecorator("id", {
            rules: [{ required: true, message: "Please input broker ID!" }],
          })(<Input placeholder="ID" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "Please input broker name!" }],
          })(<Input placeholder="Name" />)}
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

const WrappedBrokerForm = Form.create()(BrokerModal);

export default WrappedBrokerForm;
