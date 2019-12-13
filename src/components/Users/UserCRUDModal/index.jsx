import React, { Component, Fragment } from "react";
import { Modal, Form, Icon, Input, Button, Radio, Upload } from "antd";
class UserCRUDModal extends Component {
  render() {
    const {
      modalProps: {
        modalFlag,
        modalToggleFunc,
        validateToNextPassword,
        compareToFirstPassword,
        handleConfirmBlur,
        addNewUser,
        getFieldDecorator,
        uploadLoading,
        beforeUpload,
        handleChange,
        imageUrl
      }
    } = this.props;

    const uploadButton = (
      <div>
        <Icon type={uploadLoading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <Fragment>
        <Modal
          footer={null}
          title="User"
          visible={modalFlag}
          onCancel={modalToggleFunc}
        >
          <Form onSubmit={addNewUser}>
            <div>
              <center>
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </center>
            </div>
            <Form.Item label="First Name">
              {getFieldDecorator("firstName", {
                rules: [
                  {
                    required: true,
                    message: "Please input your first name"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="First Name"
                />
              )}
            </Form.Item>
            <Form.Item label="Last Name">
              {getFieldDecorator("lastName", {
                rules: [
                  {
                    required: true,
                    message: "Please input your last name"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Last Name"
                />
              )}
            </Form.Item>
            <Form.Item label="Phone Number">
              {getFieldDecorator("phoneNumber", {
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
            <Form.Item label="Gender">
              {getFieldDecorator("gender", {
                rules: [
                  {
                    required: true,
                    message: "Please select anyone"
                  }
                ]
              })(
                <Radio.Group>
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                </Radio.Group>
              )}
            </Form.Item>
            <Form.Item label="Role">
              {getFieldDecorator("role", {
                rules: [
                  {
                    required: true,
                    message: "Please select anyone"
                  }
                ]
              })(
                <Radio.Group>
                  <Radio value="user">User</Radio>
                  <Radio value="admin">Admin</Radio>
                </Radio.Group>
              )}
            </Form.Item>
            <Form.Item label="Password" hasFeedback>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "Please input your password!"
                  },
                  {
                    validator: validateToNextPassword
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
                    validator: compareToFirstPassword
                  }
                ]
              })(<Input.Password onBlur={handleConfirmBlur} />)}
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Fragment>
    );
  }
}

export default UserCRUDModal;
