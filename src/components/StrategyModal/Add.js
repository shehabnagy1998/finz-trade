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
import IntlMessages from "../../util/IntlMessages";
import { useIntl } from "react-intl";
const { Option } = Select;
const FormItem = Form.Item;

const stocksArr = ["stock", "forex", "crypto", "commodities"];
const tradeTypingArr = ["automatic", "manual", "mixed"];

const AddModal = ({ isVisible, setIsVisible, form }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();
  const { pageLoaders, brokers } = useSelector(({ Api }) => Api);
  const { formatMessage } = useIntl();

  const handleCancel = (e) => {
    setIsVisible(false);
  };

  function info() {
    Modal.info({
      title: "You have added new strategy",
      content: (
        <div>
          Thank you for adding your strategy on FinzTrade. There are few
          requirements need to be met before your strategy are available to the
          other users:
          <ol className="gx-my-2">
            <li>
              i. You must have at least 10 trades (5 buy & 5 sell) in 2
              weeks-time
            </li>
            <li>ii. The Win Rate must be more than 50%</li>
            <li>iii. Profit Factor must be more than 1 time</li>
          </ol>
          Your strategy will be hidden until the criteria above is met
        </div>
      ),
      onOk() {},
    });
  }
  const handleAdd = async (e) => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        setConfirmLoading(true);
        await dispatch(addStrategy(values, setIsVisible, info));
        setConfirmLoading(false);
      }
    });
  };

  const validateFormFields = (rule, value, callback) => {
    const fieldName = rule.field;
    if (fieldName === "title") {
      /^$|^[a-z0-9A-Z ]{12,80}$/.test(value)
        ? callback()
        : callback(formatMessage({ id: "titleError2" }));
    } else if (fieldName === "description") {
      /^$|^[a-z0-9A-Z ]{80,255}$/.test(value)
        ? callback()
        : callback(formatMessage({ id: "descError2" }));
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
      title={<IntlMessages id="addStrategy" />}
      onCancel={handleCancel}
      footer={null}
      bodyStyle={{ paddingBottom: 0 }}
    >
      <Form onSubmit={handleAdd} className="gx-w-100" {...layout}>
        <FormItem>
          {getFieldDecorator("title", {
            rules: [
              { required: true, message: <IntlMessages id="titleError" /> },
              { validator: validateFormFields },
            ],
          })(<Input placeholder={formatMessage({ id: "title" })} />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("cost", {
            rules: [
              { required: true, message: <IntlMessages id="costError" /> },
            ],
          })(
            <Input placeholder={formatMessage({ id: "cost" })} type="number" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("description", {
            rules: [
              { required: true, message: <IntlMessages id="descError" /> },
              { validator: validateFormFields },
            ],
          })(
            <TextArea
              placeholder={formatMessage({ id: "desc" })}
              autoSize={{ minRows: 2, maxRows: 5 }}
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("brokerId", {
            rules: [
              { required: true, message: <IntlMessages id="brokerIdError" /> },
            ],
          })(
            <Select placeholder={formatMessage({ id: "brokerId" })}>
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
              { required: true, message: <IntlMessages id="stocksError" /> },
            ],
          })(
            <Select
              placeholder={formatMessage({ id: "stocks" })}
              mode="multiple"
            >
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
            rules: [
              { required: true, message: <IntlMessages id="tradeTypeError" /> },
            ],
          })(
            <Select placeholder={formatMessage({ id: "tradeType" })}>
              {tradeTypingArr.map((item, index) => (
                <Select.Option value={item} key={index}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          )}
        </FormItem>
        {/* <FormItem
          label={formatMessage({ id: "type" })}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          {getFieldDecorator("public", {
            initialValue: true,
            rules: [
              { required: true, message: <IntlMessages id="typeError" /> },
            ],
          })(
            <Radio.Group>
              <Radio value={false}>
                <IntlMessages id="private" />
              </Radio>
              <Radio value={true}>
                <IntlMessages id="public" />
              </Radio>
            </Radio.Group>
          )}
        </FormItem> */}

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

const WrappedAddForm = Form.create()(AddModal);

export default WrappedAddForm;
