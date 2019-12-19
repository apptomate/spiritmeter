import React, { Component, Fragment } from "react";
import { Row, Col, message } from "antd";
import logoimg from "../../assets/img/logo.png";
import API from "../../Redux/_actions/API";
import {
  GENERATE_OTP_URL,
  FORGET_PASSWORD_URL
} from "../../Redux/_helpers/Constants";
import GenerateOtp from "./GenerateOtp.jsx";
import SetPassword from "./SetPassword.jsx";

class PasswordReset extends Component {
  state = {
    otpSentPhone: "",
    isOtpGenerate: false
  };
  constructor(props) {
    super(props);
    this.generateOtpFunc = this.generateOtpFunc.bind(this);
    this.resetPasswordFunc = this.resetPasswordFunc.bind(this);
  }

  //Reset new password
  resetPasswordFunc = async values => {
    let { otpSentPhone } = this.state;
    delete values.confirmPassword;
    values["phone"] = otpSentPhone;
    let loadingMessage = message.loading("Action in progress..");
    let apiResponse = await API.put(FORGET_PASSWORD_URL, values)
      .then(response => {
        message.success(response.data.message);
        this.props.history.push("/login");
      })
      .catch(error => {
        if (error.response) {
          let { data } = error.response;
          message.error(data.errorMessage);
        }
      });
    setTimeout(loadingMessage, apiResponse);
  };

  //Generate OTP
  generateOtpFunc = async (values, funcCallFrom) => {
    let loadingMessage = message.loading("Action in progress..");
    let apiResponse = await API.put(GENERATE_OTP_URL, values)
      .then(response => {
        let { message: otpMessage = "" } = response.data;
        message.success(otpMessage);
        if (funcCallFrom !== "resend_otp") {
          this.setState({ isOtpGenerate: true, otpSentPhone: values.phone });
        }
      })
      .catch(error => {
        if (error.response) {
          let { data } = error.response;
          message.error(data.errorMessage);
        }
      });
    setTimeout(loadingMessage, apiResponse);
  };

  render() {
    let { otpSentPhone, isOtpGenerate } = this.state;
    let generateOtpProps = { generateOtpFunc: this.generateOtpFunc };
    let passwordResetProps = {
      otpSentPhone,
      resetPasswordFunc: this.resetPasswordFunc,
      generateOtpFunc: this.generateOtpFunc
    };
    return (
      <Fragment>
        <div className="login-bg">
          <Row>
            <Col className="login-left-bg" span={12}>
              <img className="w-100" src={logoimg} alt="no data" />
            </Col>
            <Col span={2}></Col>
            {!isOtpGenerate ? (
              <GenerateOtp {...generateOtpProps} />
            ) : (
              <SetPassword {...passwordResetProps} />
            )}
            <Col span={2}></Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}
export default PasswordReset;
