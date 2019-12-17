import React, { Fragment, Component } from "react";
import { Form, Icon, Input, Col, Button, Alert } from "antd";
import { Link } from "react-router-dom";

class PasswordResetStep2 extends Component {
  render() {
    const {
      componentProps: {
        resetPasswordFunc,
        getFieldDecorator,
        otpSentPhone,
        validateToNextPassword,
        compareToFirstPassword,
        handleConfirmBlur,
        resendOtpFunc
      }
    } = this.props;
    const otpAlert = (
      <Fragment>
        <Icon type="mobile" /> {otpSentPhone}
      </Fragment>
    );
    return (
      <Fragment>
        <Col span={8} className="login-form-div">
          <h4 className="text-center login-title">Reset your password</h4>

          <Form onSubmit={resetPasswordFunc} className="login-form">
            <Alert
              message="We sent security code to :"
              description={otpAlert}
              type="success"
              showIcon
            />
            <br />
            {/* <Form.Item label="Phone Number">
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
                ],
                initialValue: otpSentPhone,
                disabled: true
              })(
                <Input
                  prefix={
                    <Icon type="mobile" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Phone Number"
                />
              )}
            </Form.Item> */}
            <Form.Item label="OTP Code">
              {getFieldDecorator("otpValue", {
                rules: [
                  {
                    required: true,
                    message: "Please input your otp code"
                  }
                ]
              })(<Input placeholder="OTP Code" />)}
            </Form.Item>
            <Form.Item label="Password" hasFeedback>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "Please input your password!"
                  },
                  {
                    validator: validateToNextPassword
                  }
                ]
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item label="Confirm Password" hasFeedback>
              {getFieldDecorator("confirmPassword", {
                rules: [
                  {
                    required: true,
                    message: "Please confirm your password!"
                  },
                  {
                    validator: compareToFirstPassword
                  }
                ]
              })(<Input.Password onBlur={handleConfirmBlur} />)}
            </Form.Item>
            <Form.Item>
              <button className="cus-btn ml-a">
                <span className="circle">
                  <span className="icon arrow"></span>
                </span>
                <span className="button-text">Save</span>
              </button>

              <Button
                type="link"
                className="login-form-forgot"
                onClick={resendOtpFunc}
              >
                Resend Code
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Fragment>
    );
  }
}

export default PasswordResetStep2;
