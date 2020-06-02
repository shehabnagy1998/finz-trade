import React from "react";
import { Button, Form, Input } from "antd";
import IntlMessages from "util/IntlMessages";
import { useSelector, useDispatch } from "react-redux";
import { userResetPassword } from "../appRedux/actions/Auth";
import { useIntl } from "react-intl";

const FormItem = Form.Item;

const ResetPassword = (props) => {
  const email = props.match.params.email;
  const code = props.match.params.code;
  const dispatch = useDispatch();
  const { pageLoaders } = useSelector(({ Api }) => Api);
  const { formatMessage } = useIntl();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        dispatch(userResetPassword({ ...values, email, code }));
      }
    });
  };

  const compareToFirstPassword = (rule, value, callback) => {
    const form = props.form;
    if (value && value !== form.getFieldValue("newPass")) {
      callback(<IntlMessages id="retypeNewPasswordError2" />);
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    const form = props.form;
    if (value && props.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  const { getFieldDecorator } = props.form;

  return (
    <div className="gx-login-container">
      <div className="gx-login-content">
        <div className="gx-login-header">
          <img
            src={require("assets/images/logo-white.png")}
            alt="wieldy"
            title="wieldy"
          />
        </div>
        <div className="gx-mb-4">
          <h2>
            <IntlMessages id="resetPassword" />
          </h2>
          <p>
            <IntlMessages id="resetPasswordText" />
          </p>
        </div>

        <Form onSubmit={handleSubmit} className="gx-login-form gx-form-row0">
          <FormItem>
            {getFieldDecorator("newPass", {
              rules: [
                {
                  required: true,
                  message: <IntlMessages id="passwordError" />,
                },
                {
                  validator: validateToNextPassword,
                },
              ],
            })(
              <Input
                type="password"
                placeholder={formatMessage({ id: "newPassword" })}
              />
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: <IntlMessages id="retypeNewPasswordError" />,
                },
                {
                  validator: compareToFirstPassword,
                },
              ],
            })(
              <Input
                placeholder={formatMessage({ id: "retypeNewPassword" })}
                type="password"
              />
            )}
          </FormItem>

          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              loading={pageLoaders.resetPassword}
            >
              <IntlMessages id="reset" />
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};

const WrappedResetPasswordForm = Form.create()(ResetPassword);

export default WrappedResetPasswordForm;
