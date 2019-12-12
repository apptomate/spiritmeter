import React, { Component, Fragment } from "react";
import { Form, Icon, Input, Button, Row, Col } from "antd";
import { connect } from "react-redux";
import { authLogin } from "../../Redux/_actions";
import { Redirect } from "react-router-dom";
import logoimg from "../../assets/img/logo.png";

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
                  <button class="cus-btn ml-a">
                    <span class="circle">
                      <span class="icon arrow"></span>
                    </span>
                    <span class="button-text">Login</span>
                  </button>

                  <a className="login-form-forgot">Forgot password</a>
                </Form.Item>

                {/* <Form.Item>
                  {getFieldDecorator("username", {
                    rules: [
                      { required: true, message: "Please input your username!" }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type='user'
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder='Username'
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("password", {
                    rules: [
                      { required: true, message: "Please input your Password!" }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type='lock'
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type='password'
                      placeholder='Password'
                    />
                  )}
                </Form.Item>
                <Button
                  className='mb-3 mt-1'
                  type='primary'
                  shape='round'
                  block
                >
                  LOGIN
                </Button> */}
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
