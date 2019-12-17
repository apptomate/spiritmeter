import React, { Component } from "react";
import { Layout, Icon, Menu, Dropdown, Button, Form } from "antd";
import {
  loggedUserDetails,
  logout
} from "../../../Redux/_service/AuthenticationService";
import { CLEAR_USER_DETAILS } from "../../../Redux/_actions/ActionTypes";
import { getBase64, beforeUpload } from "../../../Redux/_helpers/Functions";
import UserCRUDModal from "../../Users/UserCRUDModal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserDetails, updateUser } from "../../../Redux/_actions";
import { FILE_UPLOAD_URL } from "../../../Redux/_helpers/Constants";
import API from "../../../Redux/_actions/API";
import { authHeader } from "../../../Redux/_helpers/AuthHeaders";

const { Header } = Layout;
export class Navbar extends Component {
  state = { modalFlag: false, uploadLoading: false, addMode: false };
  constructor(props) {
    super(props);
    this.handleEditProfile = this.handleEditProfile.bind(this);
    this.userModalToggle = this.userModalToggle.bind(this);
    this.handleAddEditUserFormSubmit = this.handleAddEditUserFormSubmit.bind(
      this
    );
    this.handleChange = this.handleChange.bind(this);
    this.validateToNextPassword = this.validateToNextPassword.bind(this);
    this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
    this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
    this.uploadFileToS3 = this.uploadFileToS3.bind(this);
    this.getMenu = this.getMenu.bind(this);
  }
  handleEditProfile(e) {
    e.preventDefault();
    const { userId } = loggedUserDetails();

    this.props.getUserDetails(userId);
    this.userModalToggle(false);
  }
  userModalToggle(addMode) {
    this.setState(prevState => ({
      modalFlag: !prevState.modalFlag,
      addMode: addMode
    }));
    if (addMode) {
      this.props.dispatch({ type: CLEAR_USER_DETAILS });
    }
  }
  handleAddEditUserFormSubmit = (e, additional) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // let { FileUploadData } = this.props;
        let { addMode } = this.state;
        delete values.confirmPassword;
        values["profileImage"] = additional.profileImage;
        values["latitude"] = additional.latitude;
        values["longitude"] = additional.longitude;
        // values["country"] = "USA";
        // values["state"] = " TX 77040";
        // values["cityName"] = "Houston";
        // values["address"] = "1/1 Fourth Car Street";
        if (addMode) {
          this.props.addUser(values);
        } else {
          values.userID = additional.userId;
          this.props.updateUser(values);
        }
        this.userModalToggle(false);
      }
    });
  };
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

  getMenu() {
    return (
      <Menu>
        <Menu.Item key="1">
          <Button type="link" onClick={this.handleEditProfile}>
            Edit Profile
          </Button>
        </Menu.Item>
        <Menu.Item key="0">
          <Button
            type="link"
            target="_blank"
            rel="noopener noreferrer"
            onClick={logout}
          >
            Logout
          </Button>
        </Menu.Item>
      </Menu>
    );
  }
  render() {
    const { firstName } = loggedUserDetails();
    const { modalFlag, uploadLoading, imageUrl, addMode } = this.state;
    const { UserDetails } = this.props;

    const { getFieldDecorator } = this.props.form;
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
      UserDetails
    };
    return (
      <Header style={{ background: "#fff", padding: 0 }}>
        <Dropdown className="logout-btn" overlay={this.getMenu}>
          <Button type="link" className="ant-dropdown-link">
            <Icon type="user" />
            {firstName} <Icon type="down" />
          </Button>
        </Dropdown>
        <div>{modalFlag && <UserCRUDModal {...modalProps} />}</div>
      </Header>
    );
  }
}

const NavbarWrapped = Form.create({ name: "normal_login" })(Navbar);

const getState = state => {
  return {
    UserDetails: state.getUserDetails.data
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators(
      {
        updateUser,
        getUserDetails
      },
      dispatch
    )
  };
}

export default connect(getState, mapDispatchToProps)(NavbarWrapped);
