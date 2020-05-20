import React, { useEffect, useState } from "react";
import { Badge, Typography, Button, Switch, Spin, Form, Input } from "antd";
import Widget from "../../Widget/index";
import { useSelector, useDispatch } from "react-redux";
import editUserSettings from "../../../appRedux/actions/API/editUserSettings";

const { Text } = Typography;

const Settings = ({ form }) => {
  const { pageLoaders } = useSelector(({ Api }) => Api);
  const { userInfo } = useSelector(({ auth }) => auth);
  const { getFieldDecorator, setFieldsValue } = form;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo.preferences)
      setFieldsValue({
        ...userInfo.preferences,
      });
  }, [userInfo.preferences]);

  console.log(userInfo.preferences);

  // const handleChange = async (val, id) => {
  //   const obj = { ...settings, [id]: val };
  //   try {
  //     await dispatch(editUserSettings(obj, setSettings));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleAdd = async (e) => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        console.log(values);
        await dispatch(editUserSettings(values));
      }
    });
  };

  const FormItem = Form.Item;

  const layout = {
    labelCol: { span: 15 },
    wrapperCol: { span: 9 },
    labelAlign: "left",
  };

  return (
    <Form onSubmit={handleAdd} className="gx-w-100" {...layout} prefix={null}>
      <Widget styleName="gx-card-profile-sm">
        <div className="gx-d-flex gx-align-items-center gx-justify-content-between gx-my-3">
          <Text className="gx-fs-xl">Settings</Text>
          <Button
            icon="save"
            loading={pageLoaders.editUserSettings}
            htmlType="submit"
            className="gx-mb-0"
            shape="circle"
          />
        </div>
        <FormItem label="Ratio" className="gx-mb-1">
          {getFieldDecorator("ratio", {
            rules: [{ required: true, message: "Please input ratio!" }],
          })(<Input />)}
        </FormItem>
        <FormItem label="Demo Allocation" className="gx-mb-1">
          {getFieldDecorator("demoAllocation", {
            rules: [
              { required: true, message: "Please input demo allocation!" },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="Live Allocation" className="gx-mb-1">
          {getFieldDecorator("liveAllocation", {
            rules: [
              { required: true, message: "Please input live allocation!" },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="Show Profits" className="gx-mb-1">
          {getFieldDecorator("showProfits", {
            valuePropName: "checked",
          })(<Switch size="small" />)}
        </FormItem>
        <FormItem label="Recive Emails" className="gx-mb-1">
          {getFieldDecorator("emailNotifications", {
            valuePropName: "checked",
          })(<Switch size="small" />)}
        </FormItem>
        <FormItem label="Recive push notifications" className="gx-mb-1">
          {getFieldDecorator("pushNotifications", {
            valuePropName: "checked",
          })(<Switch size="small" />)}
        </FormItem>
      </Widget>
    </Form>
  );
};

const WrappedSettingsForm = Form.create()(Settings);

export default WrappedSettingsForm;
