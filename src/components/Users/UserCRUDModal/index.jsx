import React, { Component, Fragment } from "react";
import { Modal, Form, Icon, Input, Button } from "antd";
class UserCRUDForm extends Component {
  render() {
    const {
      modalProps: { modalFlag, modalToggleFunc, addNewUser, getFieldDecorator }
    } = this.props;

    return (
      <Fragment>
        <div>
          <Modal
            footer={null}
            title="User"
            visible={modalFlag}
            onCancel={modalToggleFunc}
          >
            <Form
              onSubmit={e => {
                e.preventDefault();
                this.props.form.validateFieldsAndScroll((err, values) => {
                  if (!err) {
                    addNewUser(values);
                  }
                });
              }}
              className="login-form"
            >
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
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
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

                <Button type="link" className="login-form-forgot">
                  Forgot password
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </Fragment>
    );
  }
}
const UserCRUDModal = Form.create({ name: "user_form" })(UserCRUDForm);
export default UserCRUDModal;
