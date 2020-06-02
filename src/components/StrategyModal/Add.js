import React, { useState } from "react";
import {
  Modal,
  Button,
  Input,
  Select,
  Row,
  Col,
  message,
  Form,
  Radio,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import TextArea from "antd/lib/input/TextArea";
// import addPaymentSource from "../../../appRedux/actions/API/addPaymentSource";
import addStrategy from "../../appRedux/actions/API/addStrategy";
const { Option } = Select;
const FormItem = Form.Item;

const stocksArr = ["stock", "forex", "crypto", "commodities"];
const tradeTypingArr = ["automatic", "manual", "mixed"];

const AddModal = ({ isVisible, setIsVisible, form }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();
  const { pageLoaders, brokers } = useSelector(({ Api }) => Api);

  const handleCancel = (e) => {
    setIsVisible(false);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        setConfirmLoading(true);
        await dispatch(addStrategy(values, setIsVisible));
        setConfirmLoading(false);
      }
    });
  };

  const validateFormFields = (rule, value, callback) => {
    const fieldName = rule.field;
    if (fieldName === "title") {
      !/^$|^[a-z0-9\ ]{12,80}$/.test(value)
        ? callback()
        : callback("should be 12 min and 80 max character");
    } else if (fieldName === "description") {
      !/^$|^[a-z0-9 ]{80,255}$/.test(value)
        ? callback()
        : callback("should be 80 min and 255 max character");
    }
  };

  const { getFieldDecorator } = form;

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 24 },
  };

  return (
    <Modal
      visible={isVisible}
      title="Add Strategy"
      onCancel={handleCancel}
      footer={null}
      bodyStyle={{ paddingBottom: 0 }}
    >
      <Form onSubmit={handleAdd} className="gx-w-100" {...layout}>
        <FormItem>
          {getFieldDecorator("title", {
            rules: [
              { required: true, message: "Please input strategy title!" },
              { validator: validateFormFields },
            ],
          })(<Input placeholder="Title" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("cost", {
            rules: [{ required: true, message: "Please input strategy cost!" }],
          })(<Input placeholder="Cost" type="number" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("description", {
            rules: [
              { required: true, message: "Please input strategy description!" },
              { validator: validateFormFields },
            ],
          })(
            <TextArea
              placeholder="Descripiton"
              autoSize={{ minRows: 2, maxRows: 5 }}
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("brokerId", {
            rules: [{ required: true, message: "Please choose broker!" }],
          })(
            <Select placeholder="Broker">
              {brokers.map((item, index) => (
                <Select.Option value={item.id} key={index}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("stocks", {
            rules: [
              { required: true, message: "Please choose one or more stocks!" },
            ],
          })(
            <Select placeholder="Stocks" mode="multiple">
              {stocksArr.map((item, index) => (
                <Select.Option value={item} key={index}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("tradeType", {
            rules: [{ required: true, message: "Please choose trade type!" }],
          })(
            <Select placeholder="Trade Type">
              {tradeTypingArr.map((item, index) => (
                <Select.Option value={item} key={index}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          )}
        </FormItem>
        <FormItem label="Type" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          {getFieldDecorator("public", {
            initialValue: true,
            rules: [
              { required: true, message: "Please choose strategy type!" },
            ],
          })(
            <Radio.Group>
              <Radio value={true}>Private</Radio>
              <Radio value={false}>Public</Radio>
            </Radio.Group>
          )}
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

const WrappedAddForm = Form.create()(AddModal);

export default WrappedAddForm;
