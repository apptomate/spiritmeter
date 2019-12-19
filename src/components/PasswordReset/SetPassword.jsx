import React, { Fragment, Component } from "react";
import { Form, Icon, Input, Col, Alert, Button } from "antd";

class SetPasswordForm extends Component {
  state = {
    confirmDirty: ""
  };
  constructor(props) {
    super(props);
    this.validateForm = this.validateForm.bind(this);
    this.validateToNextPassword = this.validateToNextPassword.bind(this);
    this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
    this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
    this.triggerToResend = this.triggerToResend.bind(this);
  }
  //Trigger To Resend OTP
  triggerToResend() {
    let { otpSentPhone } = this.props;
    let params = { phone: otpSentPhone, otpType: "ForgetPassword" };
    this.props.generateOtpFunc(params, "resend_otp");
  }
  //Reset new password
  validateForm = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.resetPasswordFunc(values);
      }
    });
  };
  //Compare with Confirm password
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirmPassword"], { force: true });
    }
    callback();
  };
  //Compare with password
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Password not matched!");
    } else {
      callback();
    }
  };
  //Blur
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState(prevState => ({
      confirmDirty: prevState.confirmDirty || !!value
    }));
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { otpSentPhone } = this.props;
    const otpAlert = (
      <Fragment>
        <Icon type="mobile" /> {otpSentPhone}
      </Fragment>
    );
    return (
      <Fragment>
        <Col span={8} className="login-form-div">
          <h4 className="text-center login-title">Reset your password</h4>
          <Form onSubmit={this.validateForm} className="login-form">
            <Alert
              message="We sent security code to :"
              description={otpAlert}
              type="success"
              showIcon
            />
            <br />
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
                    validator: this.validateToNextPassword
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
                    validator: this.compareToFirstPassword
                  }
                ]
              })(<Input.Password onBlur={this.handleConfirmBlur} />)}
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
                onClick={this.triggerToResend}
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
const SetPassword = Form.create({ name: "setPassword" })(SetPasswordForm);
export default SetPassword;
