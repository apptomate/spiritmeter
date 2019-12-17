import React, { Fragment } from "react";
import { Form, Icon, Input, Col, Button } from "antd";
import { Link } from "react-router-dom";

const PasswordResetStep1 = props => {
  const { getFieldDecorator, generateOtpFunc } = props;
  return (
    <Fragment>
      <Col span={8} className="login-form-div">
        <h4 className="text-center login-title">Find Your Account</h4>
        <Form onSubmit={generateOtpFunc} className="login-form">
          <Form.Item>
            {getFieldDecorator("phone", {
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
            <button className="cus-btn ml-a">
              <span className="circle">
                <span className="icon arrow"></span>
              </span>
              <span className="button-text">Get OTP</span>
            </button>

            <Button type="link" className="login-form-forgot">
              <Link to="/login">Login</Link>
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Fragment>
  );
};

export default PasswordResetStep1;
