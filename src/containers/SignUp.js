import React, { useEffect } from "react";
import {
  Button,
  Checkbox,
  Form,
  Icon,
  Input,
  Row,
  Col,
  Typography,
} from "antd";
import { Link, useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { hideMessage, showAuthLoader, userSignUp } from "appRedux/actions/Auth";

import IntlMessages from "util/IntlMessages";
import { message } from "antd/lib/index";
import CircularProgress from "components/CircularProgress/index";

const FormItem = Form.Item;
const { Title } = Typography;

const SignUp = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { authUser } = useSelector(({ auth }) => auth);
  const { pageLoaders } = useSelector(({ Api }) => Api);

  useEffect(() => {
    if (authUser !== null) {
      history.push("/");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      console.log("values", values);
      if (!err) {
        dispatch(showAuthLoader());
        dispatch(userSignUp(values));
      }
    });
  };

  const validateFormFields = (rule, value, callback) => {
    const fieldName = rule.field;
    if (fieldName === "username") {
      /^$|^[a-z0-9]{3,}$/.test(value)
        ? callback()
        : callback("must contain lowercase and numbers only");
    }
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
                Register
              </Title>
            </div>
            <Form
              onSubmit={handleSubmit}
              className="gx-signup-form gx-form-row0"
            >
              <FormItem>
                {getFieldDecorator("name", {
                  rules: [
                    { required: true, message: "Please input your name!" },
                  ],
                })(<Input placeholder="Name" />)}
              </FormItem>

              <FormItem>
                {getFieldDecorator("username", {
                  rules: [
                    { required: true, message: "Please input your username!" },
                    { validator: validateFormFields },
                  ],
                })(<Input placeholder="Username" />)}
              </FormItem>

              <FormItem>
                {getFieldDecorator("email", {
                  rules: [
                    {
                      required: true,
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                  ],
                })(<Input placeholder="Email" />)}
              </FormItem>
              <FormItem>
                {getFieldDecorator("password", {
                  rules: [
                    { required: true, message: "Please input your Password!" },
                  ],
                })(<Input type="password" placeholder="Password" />)}
              </FormItem>

              <FormItem>
                <div className="gx-text-center">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="gx-w-100"
                    loading={pageLoaders.signUpUser}
                  >
                    Register
                  </Button>
                  <Link className="gx-link gx-text-center" to="/login">
                    Log in
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

const WrappedSignUpForm = Form.create()(SignUp);

export default WrappedSignUpForm;
