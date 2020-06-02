import React from "react";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { userConfirmEmail } from "../appRedux/actions/Auth";
import IntlMessages from "util/IntlMessages";
import { useIntl } from "react-intl";

const FormItem = Form.Item;

const ConfirmEmail = (props) => {
  const dispatch = useDispatch();
  const { pageLoaders } = useSelector(({ Api }) => Api);
  const { formatMessage } = useIntl();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        dispatch(userConfirmEmail(values.code));
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
            <IntlMessages id="confirmEmail" />
          </h2>
          <p>
            <IntlMessages id="confirmEmailText" />
          </p>
        </div>

        <Form
          layout="vertical"
          onSubmit={handleSubmit}
          className="gx-login-form gx-form-row0"
        >
          <FormItem>
            {getFieldDecorator("code", {
              rules: [
                {
                  required: true,
                  message: <IntlMessages id="confirmCodeError" />,
                },
              ],
            })(
              <Input
                type="text"
                placeholder={formatMessage({ id: "confirmCode" })}
              />
            )}
          </FormItem>

          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              loading={pageLoaders.confirmEmail}
            >
              <IntlMessages id="confirm" />
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};

const WrappedConfirmEmailForm = Form.create()(ConfirmEmail);

export default WrappedConfirmEmailForm;
