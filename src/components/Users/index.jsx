import React, { Component, Fragment } from "react";
import { getAllListUsers, uploadFile } from "../../Redux/_actions";
import { connect } from "react-redux";
import {
  Icon,
  Spin,
  PageHeader,
  Table,
  Input,
  Button,
  Divider,
  Tag,
  Form,
  Modal,
  Radio,
  Upload,
  message
} from "antd";
import Highlighter from "react-highlight-words";
import DisplayAvatar from "../Common/DisplayAvatar";
import { Link } from "react-router-dom";
import UserCRUDModal from "./UserCRUDModal";

const columns = [
  {
    title: "Profile",
    dataIndex: "profileImage",
    key: "profileImage",
    render: profileImage => (
      <span>
        <DisplayAvatar srcPath={profileImage} />
      </span>
    )
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender"
  },
  {
    title: "Phone Number",
    dataIndex: "phoneNumber",
    key: "phoneNumber"
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    render: role => (
      <span>
        <Tag color={role === "Admin" ? "volcano" : "geekblue"}>{role}</Tag>
      </span>
    )
  },
  {
    title: "Action",
    dataIndex: "userId",
    key: "userId",
    render: userId => (
      <span>
        <Link to={`/admin/viewUser/${userId}`}>
          <Button
            type="primary"
            shape="circle"
            icon="eye"
            size="small"
            title="View"
          />
        </Link>
        <Divider type="vertical" />
        <Button
          type="danger"
          shape="circle"
          icon="delete"
          size="small"
          title="Delete"
        />
      </span>
    )
  }
];

//Base64
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

//Before File Upload
function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

class UserModel extends Component {
  state = {
    modalFlag: false,
    uploadLoading: false,
    imageUrl: ""
  };
  constructor(props) {
    super(props);
    this.userModalToggle = this.userModalToggle.bind(this);
    this.addNewUser = this.addNewUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateToNextPassword = this.validateToNextPassword.bind(this);
    this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
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
  //File Upload Change
  handleChange = info => {
    let { status, originFileObj, name } = info.file;
    if (status === "uploading") {
      this.setState({ uploadLoading: true });
      return;
    }
    if (status === "done") {
      getBase64(originFileObj, imageUrl => {
        const processed_file_base64 = imageUrl.split(",")[1];
        let formData = {
          file: processed_file_base64,
          fileName: name
        };
        this.props.uploadFile(formData);
        this.setState({
          imageUrl,
          uploadLoading: false
        });
      });
    }
  };
  //User Add
  addNewUser = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        delete values.confirmPassword;
        console.log(values);
        // this.props.authLogin(values);
      }
    });
  };
  //User Modal
  userModalToggle() {
    this.setState(prevState => ({
      modalFlag: !prevState.modalFlag
    }));
  }
  componentDidMount() {
    this.props.getAllListUsers();
  }
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : "" }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };
  render() {
    const {
      UsersResponse: { data = [], loading },
      FileUploadData
    } = this.props;
    const { modalFlag, imageUrl, uploadLoading } = this.state;
    const { getFieldDecorator } = this.props.form;

    const uploadButton = (
      <div>
        <Icon type={uploadLoading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    console.log("Res", FileUploadData);
    //Modal Props
    // const modalProps = {
    //   modalFlag,
    //   modalToggleFunc: this.userModalToggle,
    //   addNewUser: this.addNewUser,
    //   getFieldDecorator
    // };

    return (
      <Fragment>
        <PageHeader
          style={{
            border: "1px solid rgb(235, 237, 240)"
          }}
          title="List of Users"
        />
        <div>
          <Spin spinning={loading}>
            <div className="user-add-btn">
              <Button
                type="primary"
                icon="user-add"
                title="Add User"
                ghost
                onClick={this.userModalToggle}
              />
            </div>
            <div>
              <Table columns={columns} dataSource={data}></Table>
            </div>
            <div>
              <Modal
                footer={null}
                title="User"
                visible={modalFlag}
                onCancel={this.userModalToggle}
              >
                <Form onSubmit={this.addNewUser}>
                  <div>
                    <center>
                      <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={this.handleChange}
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
                          <Icon
                            type="user"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
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
                          <Icon
                            type="user"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
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
                          <Icon
                            type="mobile"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
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
                          validator: this.validateToNextPassword
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
                          validator: this.compareToFirstPassword
                        }
                      ]
                    })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                  </Form.Item>
                  <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
            </div>

            {/* <UserCRUDModal modalProps={modalProps} /> */}
          </Spin>
        </div>
      </Fragment>
    );
  }
}
const Users = Form.create({ name: "normal_login" })(UserModel);
const getState = state => {
  return {
    UsersResponse: state.getAllListUsers,
    FileUploadData: state.uploadFile.data
  };
};
export default connect(getState, {
  getAllListUsers,
  uploadFile
})(Users);
