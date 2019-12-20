import React, { Component, Fragment } from "react";
import {
  getAllListUsers,
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
import {
  FILE_UPLOAD_URL,
  ADD_USER_URL,
  UPDATE_USER_URL
} from "../../Redux/_helpers/Constants";
import { authHeader } from "../../Redux/_helpers/AuthHeaders";
import API from "../../Redux/_actions/API";
import {
  CLEAR_USER_DETAILS,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR
} from "../../Redux/_actions/ActionTypes";
import { bindActionCreators } from "redux";
import { getBase64, beforeUpload } from "../../Redux/_helpers/Functions";

class UserGrid extends Component {
  state = {
    modalFlag: false,
    uploadLoading: false,
    imageUrl: "",
    confirmDirty: "",
    addMode: true,
    searchText: ""
  };
  constructor(props) {
    super(props);
    this.userModalToggle = this.userModalToggle.bind(this);
    this.handleAddEditUserFormSubmit = this.handleAddEditUserFormSubmit.bind(
      this
    );
    this.handleChange = this.handleChange.bind(this);
    this.validateToNextPassword = this.validateToNextPassword.bind(this);
    this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
    this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
    this.editUser = this.editUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.uploadFileToS3 = this.uploadFileToS3.bind(this);
  }

  //Delete User
  deleteUser = userId => {
    let formData = { UserID: parseInt(userId) };
    this.props.deleteUser(formData);
  };

  //Edit User
  editUser = e => {
    let userId = e.currentTarget.dataset.user_id;
    this.props.getUserDetails(userId);
    this.userModalToggle(false);
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
        let fileData = {
          file: processed_file_base64,
          fileName: name
        };
        this.uploadFileToS3(fileData);
      });
    }
  };

  async uploadFileToS3(fileData) {
    let imageUrl = "";
    try {
      const response = await API.post(FILE_UPLOAD_URL, fileData, {
        headers: authHeader()
      });
      imageUrl = response.data.fileurl;
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({
        imageUrl,
        uploadLoading: false
      });
    }
  }

  //User Add
  handleAddEditUserFormSubmit = (e, additional) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let { addMode } = this.state;
        delete values.confirmPassword;
        values["profileImage"] = additional.profileImage;
        values["latitude"] = additional.latitude;
        values["longitude"] = additional.longitude;
        let addEditUserUrl = ADD_USER_URL;
        let axiosMethod = "post";
        if (!addMode) {
          addEditUserUrl = UPDATE_USER_URL;
          values.userID = additional.userId;
          axiosMethod = "put";
        }
        const options = {
          method: axiosMethod,
          headers: authHeader(),
          data: values,
          url: addEditUserUrl
        };
        API(options)
          .then(response => {
            this.props.getAllListUsers();
            this.props.dispatch({
              type: ADD_USER_SUCCESS,
              payload: response.data
            });
            message.success(response.data);
            this.setState({ modalFlag: false });
          })
          .catch(error => {
            if (error.response) {
              let { data } = error.response;
              this.props.dispatch({
                type: ADD_USER_ERROR,
                payload: data
              });
              message.error(data.errorMessage);
            }
          });
      }
    });
  };

  //User Modal
  userModalToggle(addMode) {
    this.setState(prevState => ({
      modalFlag: !prevState.modalFlag,
      addMode: addMode
    }));
    if (addMode) {
      this.props.dispatch({ type: CLEAR_USER_DETAILS });
    }
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
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
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
      UserDetails
    } = this.props;
    const { modalFlag, imageUrl, uploadLoading, addMode } = this.state;
    const { getFieldDecorator } = this.props.form;

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
        key: "name",
        ...this.getColumnSearchProps("name")
      },
      {
        title: "Gender",
        dataIndex: "gender",
        key: "gender",
        render: gender => gender.toLowerCase(),
        filters: [
          {
            text: "Male",
            value: "male"
          },
          {
            text: "Female",
            value: "female"
          }
        ],
        filterMultiple: false,
        onFilter: (value, record) =>
          record.gender.toLowerCase().indexOf(value) === 0,
        sorter: (a, b) => a.gender.length - b.gender.length,
        sortDirections: ["descend", "ascend"]
      },
      {
        title: "Phone Number",
        dataIndex: "phoneNumber",
        key: "phoneNumber",
        ...this.getColumnSearchProps("phoneNumber")
      },
      {
        title: "Role",
        dataIndex: "role",
        key: "role",
        render: role => (
          <span>
            <Tag
              color={role.toLowerCase() === "admin" ? "volcano" : "geekblue"}
            >
              {role.toLowerCase()}
            </Tag>
          </span>
        ),
        filters: [
          {
            text: "User",
            value: "user"
          },
          {
            text: "Admin",
            value: "admin"
          }
        ],
        filterMultiple: false,
        onFilter: (value, record) =>
          record.role.toLowerCase().indexOf(value) === 0,
        sorter: (a, b) => a.role.length - b.role.length,
        sortDirections: ["descend", "ascend"]
      },
      {
        title: "Display Count",
        dataIndex: "savedDisplay",
        key: "savedDisplay",
        defaultSortOrder: "ascend",
        sorter: (a, b) => a.savedDisplay - b.savedDisplay
      },
      {
        title: "Route Count",
        dataIndex: "savedRoutes",
        key: "savedRoutes",
        defaultSortOrder: "ascend",
        sorter: (a, b) => a.savedRoutes - b.savedRoutes
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
              onConfirm={() => this.deleteUser(userId)}
              okText="Yes"
              cancelText="No"
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

    //Modal Props
    const modalProps = {
      modalToggleFunc: this.userModalToggle,
      handleAddEditUserFormSubmit: this.handleAddEditUserFormSubmit,
      handleChange: this.handleChange,
      validateToNextPassword: this.validateToNextPassword,
      compareToFirstPassword: this.compareToFirstPassword,
      handleConfirmBlur: this.handleConfirmBlur,
      getFieldDecorator,
      modalFlag,
      uploadLoading,
      beforeUpload,
      imageUrl,
      addMode,
      UserDetails,
      manualSetValue: this.props.form.setFieldsValue
    };

    return (
      <Fragment>
        <div className="dis-center">
          <PageHeader title="List of Users" className="title-header-left" />
          <div className="title-header-right">
            <Button
              className="f-r user-add-btn"
              type="primary"
              icon="user-add"
              title="Add User"
              ghost
              onClick={this.userModalToggle}
            >
              New User
            </Button>
          </div>
        </div>
        <div>
          <Spin spinning={loading}>
            <div>
              <Table
                columns={columns}
                dataSource={data}
                rowKey={record => record.userId}
                loading={loading}
              />
            </div>
            <div>{modalFlag && <UserCRUDModal {...modalProps} />}</div>
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
    AddUserData: state.addUser.data,
    UserDetails: state.getUserDetails.data
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators(
      {
        getAllListUsers,
        getUserDetails,
        deleteUser
      },
      dispatch
    )
  };
}

export default connect(getState, mapDispatchToProps)(Users);
