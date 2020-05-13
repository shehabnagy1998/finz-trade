import React from "react";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { userConfirmEmail } from "../appRedux/actions/Auth";

const FormItem = Form.Item;

const ConfirmEmail = (props) => {
  const dispatch = useDispatch();
  const { pageLoaders } = useSelector(({ Api }) => Api);

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
          <h2>Confirm Email</h2>
          <p>
            please enter the confirmation code sent to your email to confirm it
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
                  message: "Please input your confirm code",
                },
              ],
            })(<Input type="text" placeholder="Confirm Code" />)}
          </FormItem>

          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              loading={pageLoaders.confirmEmail}
            >
              Confirm
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};

const WrappedConfirmEmailForm = Form.create()(ConfirmEmail);

export default WrappedConfirmEmailForm;
