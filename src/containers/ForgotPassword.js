import React from "react";
import { Button, Form, Input } from "antd";
import IntlMessages from "util/IntlMessages";
import { useDispatch, useSelector } from "react-redux";
import { userForgotPassword } from "../appRedux/actions/Auth";
import { useIntl } from "react-intl";

const FormItem = Form.Item;

const ForgotPassword = (props) => {
  const dispatch = useDispatch();
  const { pageLoaders } = useSelector(({ Api }) => Api);
  const { formatMessage } = useIntl();

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
          <h2>
            <IntlMessages id="forgetPassword" />
          </h2>
          <p>
            <IntlMessages id="forgetPasswordText" />
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
                  message: <IntlMessages id="emailError2" />,
                },
                {
                  required: true,
                  message: <IntlMessages id="emailError" />,
                },
              ],
            })(
              <Input
                type="email"
                placeholder={formatMessage({ id: "email" })}
              />
            )}
          </FormItem>

          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              loading={pageLoaders.forgotPassword}
            >
              <IntlMessages id="send" />
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};

const WrappedForgotPasswordForm = Form.create()(ForgotPassword);

export default WrappedForgotPasswordForm;
