import React, { Component, Fragment } from "react";
import { Form, Icon, Input, Row, Col, Button, message } from "antd";
import logoimg from "../../assets/img/logo.png";
import { Link } from "react-router-dom";
import API from "../../Redux/_actions/API";
import { AUTHLOGIN_URL } from "../../Redux/_helpers/Constants";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.validateLogin = this.validateLogin.bind(this);
  }
  validateLogin = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        let loadingMessage = message.loading("Action in progress..");
        let apiResponse = await API.post(AUTHLOGIN_URL, values)
          .then(response => {
            const {
              accessToken: { token },
              user: { userId, firstName, profileImage, role }
            } = response.data;
            if (role.toLowerCase() === "admin") {
              let loggedUserData = { userId, firstName, profileImage };
              localStorage.setItem("authToken", token);
              localStorage.setItem(
                "loggedUser",
                JSON.stringify(loggedUserData)
              );
              message.success("Login Success");
              this.props.history.push("/admin/dashboard");
            } else {
              message.warning("Invalid User");
            }
          })
          .catch(error => {
            if (error.response) {
              let { data } = error.response;
              message.error(data.errorMessage);
            }
          });
        setTimeout(loadingMessage, apiResponse);
      }
    });
  };

  render() {
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
                    <Button type="link" className="my-link-btn f-r">
                      Forgotten password?
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
export default Login;
