import React, { Component, Fragment } from "react";
import { Form, Row, Col } from "antd";
import { connect } from "react-redux";
import { generateOtp, forgetPassword } from "../../Redux/_actions";
import logoimg from "../../assets/img/logo.png";
import PasswordResetStep1 from "./Step1Form.jsx";
import PasswordResetStep2 from "./Step2Form.jsx";

class PasswordReset extends Component {
  state = {
    otpSentPhone: "",
    confirmDirty: ""
  };
  constructor(props) {
    super(props);
    this.generateOtpFunc = this.generateOtpFunc.bind(this);
    this.resetPasswordFunc = this.resetPasswordFunc.bind(this);
    this.validateToNextPassword = this.validateToNextPassword.bind(this);
    this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
    this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
    this.resendOtpFunc = this.resendOtpFunc.bind(this);
  }
  //Resend OTP
  resendOtpFunc() {
    let paramData = { phone: this.state.otpSentPhone };
    this.props.generateOtp(paramData);
  }
  //Compare with password
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Password not matched!");
    } else {
      callback();
    }
  };
  //Compare with Confirm password
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirmPassword"], { force: true });
    }
    callback();
  };
  //Blur
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState(prevState => ({
      confirmDirty: prevState.confirmDirty || !!value
    }));
  };

  //Reset new password
  resetPasswordFunc = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let { otpSentPhone } = this.state;
        let { history } = this.props;
        delete values.confirmPassword;
        values["phone"] = otpSentPhone;
        this.props.forgetPassword(values, history);
      }
    });
  };

  //Generate OTP
  generateOtpFunc = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.generateOtp(values);
        this.setState({ otpSentPhone: values.phone });
      }
    });
  };

  render() {
    let { generateOtpProps } = this.props;

    let { otpSentPhone } = this.state;

    const { getFieldDecorator } = this.props.form;

    const componentProps = {
      resetPasswordFunc: this.resetPasswordFunc,
      getFieldDecorator,
      otpSentPhone,
      validateToNextPassword: this.validateToNextPassword,
      compareToFirstPassword: this.compareToFirstPassword,
      handleConfirmBlur: this.handleConfirmBlur,
      resendOtpFunc: this.resendOtpFunc
    };
    return (
      <Fragment>
        <div className="login-bg">
          <Row>
            <Col className="login-left-bg" span={12}>
              <img className="w-100" src={logoimg} alt="no data" />
            </Col>
            <Col span={2}></Col>
            {!generateOtpProps ? (
              <PasswordResetStep1
                generateOtpFunc={this.generateOtpFunc}
                getFieldDecorator={getFieldDecorator}
              />
            ) : (
              <PasswordResetStep2 componentProps={componentProps} />
            )}
            <Col span={2}></Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}
const Login = Form.create({ name: "PasswordReset" })(PasswordReset);
const getState = state => {
  return {
    generateOtpProps: state.generateOtp.data
  };
};
export default connect(getState, {
  generateOtp,
  forgetPassword
})(Login);
