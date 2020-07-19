import React, { useEffect } from "react";
import {
  Button,
  Checkbox,
  Form,
  Icon,
  Input,
  message,
  Row,
  Col,
  Typography,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { userSignIn } from "appRedux/actions/Auth";

import IntlMessages from "util/IntlMessages";
import CircularProgress from "components/CircularProgress/index";
import { useIntl } from "react-intl";

const FormItem = Form.Item;
const { Title } = Typography;

const SignIn = (props) => {
  const dispatch = useDispatch();
  const { authUser } = useSelector(({ auth }) => auth);
  const { pageLoaders } = useSelector(({ Api }) => Api);
  const history = useHistory();
  const { formatMessage } = useIntl();

  useEffect(() => {
    if (authUser !== null) {
      history.push("/");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        dispatch(userSignIn(values));
      }
    });
  };

  const { getFieldDecorator } = props.form;

  return (
    <Row className="gx-full-screen gx-bg-white">
      <Col lg={12} xs={24} className="gx-d-flex gx-p-0">
        <div className="gx-login-container">
          <div className="gx-login-content gx-login-content-custom">
            <div className="gx-login-header">
              <a href="https://finztrade.com">
                <img
                  src={require("assets/images/logo.png")}
                  alt="wieldy"
                  title="wieldy"
                />
              </a>
            </div>
            <div className="gx-login-header">
              <Title className="gx-login-title gx-text-primary" level={2}>
                <IntlMessages id="login" />
              </Title>
            </div>
            <Form onSubmit={handleSubmit} className="gx-form-row0">
              <FormItem>
                {getFieldDecorator("email", {
                  rules: [
                    {
                      required: true,
                      message: <IntlMessages id="emailError" />,
                    },
                  ],
                })(<Input placeholder={formatMessage({ id: "email" })} />)}
              </FormItem>
              <FormItem>
                {getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      message: <IntlMessages id="passwordError" />,
                    },
                  ],
                })(
                  <Input.Password
                    placeholder={formatMessage({ id: "password" })}
                  />
                )}
              </FormItem>
              <FormItem className="">
                <div className="gx-d-flex gx-justify-content-between">
                  {getFieldDecorator("remember", {
                    valuePropName: "checked",
                    initialValue: true,
                  })(
                    <Checkbox>
                      <IntlMessages id="rememberMe" />
                    </Checkbox>
                  )}
                  <Link className="gx-login-form-forgot" to="/forgot-password">
                    <IntlMessages id="forgetPassword" />
                  </Link>
                </div>
              </FormItem>
              <FormItem className="">
                <div className="gx-text-center">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="gx-w-100"
                    loading={pageLoaders.signInUser}
                  >
                    <IntlMessages id="login" />
                  </Button>
                  <Link className="gx-link gx-text-center" to="/register">
                    <IntlMessages id="register" />
                  </Link>
                </div>
              </FormItem>
            </Form>
          </div>
        </div>
      </Col>
      <Col lg={12} className="gx-d-none gx-d-lg-flex gx-p-0">
        <img
          src={require("assets/images/stock.png")}
          alt="wieldy"
          title="wieldy"
        />
      </Col>
    </Row>
  );
};

const WrappedNormalLoginForm = Form.create()(SignIn);

export default WrappedNormalLoginForm;
