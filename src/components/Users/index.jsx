import React, { Component, Fragment } from "react";
import {
  getAllListUsers,
  uploadFile,
  addUser,
  getUserDetails,
  deleteUser
} from "../../Redux/_actions";
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
  Popconfirm,
  message
} from "antd";
import Highlighter from "react-highlight-words";
import DisplayAvatar from "../Common/DisplayAvatar";
import { Link } from "react-router-dom";
import UserCRUDModal from "./UserCRUDModal";

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

class UserGrid extends Component {
  state = {
    modalFlag: false,
    uploadLoading: false,
    imageUrl: "",
    confirmDirty: ""
  };
  constructor(props) {
    super(props);
    this.userModalToggle = this.userModalToggle.bind(this);
    this.addNewUser = this.addNewUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateToNextPassword = this.validateToNextPassword.bind(this);
    this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
    this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
    this.editUser = this.editUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    //Table Columns
    this.columns = [
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
              data-user_id={userId}
              type="default"
              shape="circle"
              icon="edit"
              size="small"
              title="Update"
              onClick={this.editUser}
            />
            <Divider type="vertical" />
            <Popconfirm
              title="Are you sure delete this user?"
              onConfirm={this.deleteUser}
              okText="Yes"
              cancelText="No"
              data-user_id={userId}
            >
              <Button
                type="danger"
                shape="circle"
                icon="delete"
                size="small"
                title="Remove"
              />
            </Popconfirm>
          </span>
        )
      }
    ];
  }

  //Delete User
  deleteUser = e => {
    let userId = e.currentTarget.dataset.user_id;
    let formData = { UserID: parseInt(userId) };
    console.log(formData);
    //this.props.deleteUser(formData);
  };

  //Edit User
  editUser = e => {
    let userId = e.currentTarget.dataset.user_id;
    this.props.getUserDetails(userId);
  };
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState(prevState => ({
      confirmDirty: prevState.confirmDirty || !!value
    }));
  };
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
  addNewUser = (e, latLng) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let { FileUploadData } = this.props;
        delete values.confirmPassword;
        values["profileImage"] = FileUploadData ? FileUploadData.fileurl : "";
        values["latitude"] = latLng.latitude;
        values["longitude"] = latLng.longitude;
        // values["country"] = "USA";
        // values["state"] = " TX 77040";
        // values["cityName"] = "Houston";
        // values["address"] = "1/1 Fourth Car Street";
        this.props.addUser(values);
        this.userModalToggle();
        //this.setState({ modalFlag: false });
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
      FileUploadData,
      AddUserData,
      UserDetails
    } = this.props;
    const { modalFlag, imageUrl, uploadLoading } = this.state;
    const { getFieldDecorator } = this.props.form;

    console.log("Res", UserDetails);

    //Modal Props
    const modalProps = {
      modalToggleFunc: this.userModalToggle,
      addNewUser: this.addNewUser,
      handleChange: this.handleChange,
      validateToNextPassword: this.validateToNextPassword,
      compareToFirstPassword: this.compareToFirstPassword,
      handleConfirmBlur: this.handleConfirmBlur,
      getFieldDecorator,
      modalFlag,
      uploadLoading,
      beforeUpload,
      imageUrl
    };

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
              <Table columns={this.columns} dataSource={data}></Table>
            </div>
            <div>{modalFlag && <UserCRUDModal modalProps={modalProps} />}</div>
          </Spin>
        </div>
      </Fragment>
    );
  }
}
const Users = Form.create({ name: "normal_login" })(UserGrid);
const getState = state => {
  return {
    UsersResponse: state.getAllListUsers,
    FileUploadData: state.uploadFile.data,
    AddUserData: state.addUser.data,
    UserDetails: state.getUserDetails.data
  };
};
export default connect(getState, {
  getAllListUsers,
  uploadFile,
  addUser,
  getUserDetails,
  deleteUser
})(Users);
