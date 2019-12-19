import React, { Fragment, Component } from "react";
import { Form, Icon, Input, Col, Button } from "antd";
import { Link } from "react-router-dom";

class GenerateOtpForm extends Component {
  constructor(props) {
    super(props);
    this.validateForm = this.validateForm.bind(this);
  }
  //Validate Form
  validateForm = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values["otpType"] = "ForgetPassword";
        this.props.generateOtpFunc(values, "generate_otp");
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        <Col span={8} className="login-form-div">
          <h4 className="text-center login-title">Find Your Account</h4>
          <Form onSubmit={this.validateForm} className="login-form">
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

              <Button type="link" className="f-r my-link-btn">
                <Link to="/login">Login</Link>
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Fragment>
    );
  }
}
const GenerateOtp = Form.create({ name: "generateOtp" })(GenerateOtpForm);
export default GenerateOtp;
