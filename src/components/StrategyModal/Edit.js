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
import IntlMessages from "../../util/IntlMessages";
import { useIntl } from "react-intl";
import NoIMG from "assets/images/no-img.png";

const FormItem = Form.Item;
const stocksArr = ["stock", "forex", "crypto", "commodities"];
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
  const { formatMessage } = useIntl();

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
      /^$|^.{12,80}$/.test(value)
        ? callback()
        : callback(formatMessage({ id: "titleError2" }));
    } else if (fieldName === "description") {
      /^$|^.{80,255}$/.test(value)
        ? callback()
        : callback(formatMessage({ id: "descError2" }));
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
      title={<IntlMessages id="editStrategy" />}
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
              src={item.pic ? CDN + item.pic : NoIMG}
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
              { required: true, message: <IntlMessages id="titleError" /> },
              { validator: validateFormFields },
            ],
          })(<Input placeholder={formatMessage({ id: "title" })} />)}
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

const WrappedEditForm = Form.create()(EditModal);

export default WrappedEditForm;
