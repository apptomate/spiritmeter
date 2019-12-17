import React, { Component, Fragment } from "react";
import { Form, Icon, Input, Row, Col, Button } from "antd";
import { connect } from "react-redux";
import { authLogin } from "../../Redux/_actions";
import { Redirect } from "react-router-dom";
import logoimg from "../../assets/img/logo.png";
import { Link } from "react-router-dom";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.validateLogin = this.validateLogin.bind(this);
  }
  validateLogin = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.authLogin(values);
      }
    });
  };

  render() {
    let { LoginProps } = this.props;
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
            <Col span={8} className="login-form-div">
              <h4 className="text-center login-title">Login</h4>
              <Form onSubmit={this.validateLogin} className="login-form">
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
                        <Icon
                          type="mobile"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="Phone Number"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("password", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your password"
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="password"
                      placeholder="Password"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  <button className="cus-btn ml-a">
                    <span className="circle">
                      <span className="icon arrow"></span>
                    </span>
                    <span className="button-text">Login</span>
                  </button>
                  <Link to="/forgot-password">
                    <Button type="link" className="login-form-forgot">
                      Forgot password
                    </Button>
                  </Link>
                </Form.Item>
              </Form>
            </Col>
            <Col span={2}></Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}
const Login = Form.create({ name: "normal_login" })(LoginForm);
const getState = state => {
  return {
    LoginProps: state.authLogin.data
  };
};
export default connect(getState, {
  authLogin
})(Login);
