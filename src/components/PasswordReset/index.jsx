import React, { Component, Fragment } from "react";
import { Form, Icon, Input, Row, Col, Button } from "antd";
import { connect } from "react-redux";
import { authLogin } from "../../Redux/_actions";
import { Redirect, Link } from "react-router-dom";
import logoimg from "../../assets/img/logo.png";
import PasswordResetStep1 from "./Step1Form";
import PasswordResetStep2 from "./Step2Form";

class PasswordReset extends Component {
  state = {
    OTPVerified: false
  };
  constructor(props) {
    super(props);
    this.validateStep1 = this.validateStep1.bind(this);
    this.validateStep2 = this.validateStep2.bind(this);
  }
  validateStep1 = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(1111111111111111, values);
        this.props.authLogin(values);
      }
    });
  };

  validateStep2 = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(2222222, values);
        this.props.authLogin(values);
      }
    });
  };

  render() {
    let { LoginProps } = this.props;
    let { OTPVerified } = this.state;
    if (LoginProps && LoginProps.token) {
      return <Redirect to={{ pathname: "/" }} />;
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        <div className="login-bg">
          <Row>
            <Col className="login-left-bg" span={12}>
              <img className="w-100" src={logoimg} alt="no data" />
            </Col>
            <Col span={2}></Col>
            {!OTPVerified ? (
              <PasswordResetStep1
                validateLogin={this.validateStep1}
                getFieldDecorator={getFieldDecorator}
              />
            ) : (
              <PasswordResetStep2
                validateLogin={this.validateStep2}
                getFieldDecorator={getFieldDecorator}
              />
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
    LoginProps: state.authLogin.data
  };
};
export default connect(getState, {
  authLogin
})(Login);
