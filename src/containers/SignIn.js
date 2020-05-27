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

const FormItem = Form.Item;
const { Title } = Typography;

const SignIn = (props) => {
  const dispatch = useDispatch();
  const { authUser } = useSelector(({ auth }) => auth);
  const { pageLoaders } = useSelector(({ Api }) => Api);
  const history = useHistory();

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
              <img
                src={require("assets/images/logo.png")}
                alt="wieldy"
                title="wieldy"
              />
            </div>
            <div className="gx-login-header">
              <Title className="gx-login-title gx-text-primary" level={2}>
                Login
              </Title>
            </div>
            <Form onSubmit={handleSubmit} className="gx-form-row0">
              <FormItem>
                {getFieldDecorator("username", {
                  rules: [
                    { required: true, message: "Please input your username!" },
                  ],
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Username"
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator("password", {
                  rules: [
                    { required: true, message: "Please input your Password!" },
                  ],
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="Password"
                  />
                )}
              </FormItem>
              <FormItem className="">
                <div className="gx-d-flex gx-justify-content-between">
                  {getFieldDecorator("remember", {
                    valuePropName: "checked",
                    initialValue: true,
                  })(<Checkbox>Remember me</Checkbox>)}
                  <Link className="gx-login-form-forgot" to="/forgot-password">
                    Forgot password
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
                    Log in
                  </Button>
                  <Link className="gx-link gx-text-center" to="/register">
                    Register
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
