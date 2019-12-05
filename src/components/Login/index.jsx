import React, { Component, Fragment } from "react";
import { Form, Icon, Input, Button, Row, Col } from "antd";

class LoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        <div className='login-bg'>
          <Row>
            <Col span={10} offset={7} className='login-form-div'>
              <h4 className='text-center login-title'>Login</h4>
              <Form onSubmit={this.handleSubmit} className='login-form'>
                <Form.Item>
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
                </Button>
              </Form>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}
const Login = Form.create({ name: "normal_login" })(LoginForm);

export default Login;
