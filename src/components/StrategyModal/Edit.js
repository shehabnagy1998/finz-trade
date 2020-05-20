import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  Button,
  Input,
  Select,
  Row,
  Col,
  message,
  Avatar,
  Spin,
  Form,
  Radio,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import TextArea from "antd/lib/input/TextArea";
// import addPaymentSource from "../../../appRedux/actions/API/addPaymentSource";
import editStrategy from "../../appRedux/actions/API/editStrategy";
import { CDN } from "../../constants/API";
import editStrategyPic from "../../appRedux/actions/API/editStrategyPic";
const { Option } = Select;
const FormItem = Form.Item;
const stocksArr = ["stock", "forex", "cryptocurrencies", "commodities"];
const tradeTypingArr = ["automatic", "manual", "mixed"];
const EditModal = ({ item, setItem, form }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const dispatch = useDispatch();
  const { pageLoaders } = useSelector(({ Api }) => Api);

  const handleCancel = (e) => {
    setItem({});
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        setConfirmLoading(true);
        await dispatch(editStrategy({ ...values, _id: item._id }, setItem));
        setConfirmLoading(false);
      }
    });
  };
  const ref = useRef(null);

  const handleChangeImage = async (e) => {
    var file = e.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onloadend = async function () {
        let base64 = reader.result;
        // base64 = base64.replace("data:image/jpeg;", "");
        try {
          await dispatch(editStrategyPic(item._id, base64));
        } catch (error) {
          console.log(error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const validateFormFields = (rule, value, callback) => {
    const fieldName = rule.field;
    if (fieldName === "title") {
      /^$|^[a-z0-9\ ]{12,80}$/.test(value)
        ? callback()
        : callback("should be 12 min and 80 max character");
    } else if (fieldName === "description") {
      /^$|^[a-z0-9 ]{80,255}$/.test(value)
        ? callback()
        : callback("should be 80 min and 255 max character");
    }
  };

  const { getFieldDecorator, setFieldsValue } = form;

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 24 },
  };

  useEffect(() => {
    if (item.title) {
      setFieldsValue({ ...item });
    }
  }, [item]);

  return (
    <Modal
      visible={item._id}
      title="Edit Strategy"
      onCancel={handleCancel}
      footer={null}
      bodyStyle={{ paddingBottom: 0 }}
    >
      <div
        className="gx-profile-banner-avatar gx-d-flex gx-justify-content-center gx-align-items-center gx-mb-3 gx-mx-0"
        onClick={(_) => ref.current.click()}
      >
        <div className="gx-size-100 gx-custom-avatar">
          <Spin spinning={pageLoaders.editStrategyPic || false}>
            <Avatar
              className="gx-size-100"
              alt="..."
              src={CDN + item.pic}
              shape="circle"
            />
          </Spin>
        </div>
        <input
          type="file"
          ref={ref}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleChangeImage}
        />
      </div>

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

const WrappedEditForm = Form.create()(EditModal);

export default WrappedEditForm;
