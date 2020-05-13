import React from "react";
import { Button, Form, Input } from "antd";
import IntlMessages from "util/IntlMessages";
import { useDispatch, useSelector } from "react-redux";
import { userForgotPassword } from "../appRedux/actions/Auth";

const FormItem = Form.Item;

const ForgotPassword = (props) => {
  const dispatch = useDispatch();
  const { pageLoaders } = useSelector(({ Api }) => Api);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        dispatch(userForgotPassword(values.email));
      }
    });
  };

  const { getFieldDecorator } = props.form;

  return (
    <div className="gx-login-container">
      <div className="gx-login-content">
        <div className="gx-login-header">
          <img
            src={require("assets/images/logo.png")}
            alt="wieldy"
            title="wieldy"
          />
        </div>
        <div className="gx-mb-4">
          <h2>Forgot Your Password ?</h2>
          <p>
            <IntlMessages id="app.userAuth.forgot" />
          </p>
        </div>

        <Form
          layout="vertical"
          onSubmit={handleSubmit}
          className="gx-login-form gx-form-row0"
        >
          <FormItem>
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ],
            })(<Input type="email" placeholder="E-Mail Address" />)}
          </FormItem>

          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              loading={pageLoaders.forgotPassword}
            >
              <IntlMessages id="app.userAuth.send" />
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};

const WrappedForgotPasswordForm = Form.create()(ForgotPassword);

export default WrappedForgotPasswordForm;
