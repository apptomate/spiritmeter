import React, { Fragment } from "react";
import { Form, Icon, Input, Col, Button } from "antd";
import { Link } from "react-router-dom";

const PasswordResetStep2 = props => {
  const { getFieldDecorator, validateLogin } = props;
  return (
    <Fragment>
      <Col span={8} className="login-form-div">
        <h4 className="text-center login-title">Login</h4>
        <Form onSubmit={validateLogin} className="login-form">
          <Form.Item>
            {getFieldDecorator("phoneNo", {
              rules: [
                {
                  required: true,
                  message: "Please input your phone number"
                },
                {
                  pattern: /^[0-9]+$/,
                  message: "input must be a valid phone number"
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="mobile" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Phone Number"
              />
            )}
          </Form.Item>
          <Form.Item>
            <button class="cus-btn ml-a">
              <span class="circle">
                <span class="icon arrow"></span>
              </span>
              <span class="button-text">Get OTP</span>
            </button>

            <Button type="link" className="login-form-forgot">
              <Link to="/forgot-password">Login</Link>
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Fragment>
  );
};

export default PasswordResetStep2;
