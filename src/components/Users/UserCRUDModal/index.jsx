/* global google */
import React, { Component, Fragment } from "react";
import {
  Modal,
  Form,
  Icon,
  Input,
  Button,
  Radio,
  Upload,
  AutoComplete
} from "antd";
import UUID from "uuid";
import {
  GOOGLE_MAPS_API_KEY,
  CORS_BY_PASS_URL
} from "../../../Redux/_helpers/Constants";
import Axios from "axios";
import PickerMap from "../../Common/googleMap/PickerMap";
const { Option } = AutoComplete;

export const GET_GOOGLE_AUTOCOMPLETE_API = (
  input = "",
  token = UUID,
  key = GOOGLE_MAPS_API_KEY
) =>
  `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${key}&input=${input}&sessiontoken=${token}`;

export const GET_GOOGLE_REVERSE_GEOCODE_API = (
  latitude,
  longitude,
  key = GOOGLE_MAPS_API_KEY
) =>
  `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${key}`;

class UserCRUDModal extends Component {
  state = {
    mapData: {
      sessionToken: UUID.v4(),
      results: [],
      latitude: "",
      longitude: ""
    }
  };

  constructor(props) {
    super(props);
    this.handleAutoCompleteChange = this.handleAutoCompleteChange.bind(this);
    this.handleAutoCompleteSelect = this.handleAutoCompleteSelect.bind(this);
    this.callBackAutoCompleteSelect = this.callBackAutoCompleteSelect.bind(
      this
    );
    this.handleMapClick = this.handleMapClick.bind(this);
  }

  componentDidUpdate(prevProp) {
    if (!this.props.addMode) {
      const {
        mapData: { latitude, longitude }
      } = this.state;
      const {
        UserDetails: { latitude: userlatitude, longitude: userlongitude }
      } = this.props;
      if (!latitude && !longitude) {
        this.setState(({ mapData }) => ({
          mapData: {
            ...mapData,
            latitude: parseFloat(userlatitude),
            longitude: parseFloat(userlongitude)
          }
        }));
      }
    }
  }

  async handleAutoCompleteChange(value) {
    const {
      mapData: { sessionToken }
    } = this.state;
    const url = GET_GOOGLE_AUTOCOMPLETE_API(value, sessionToken);
    try {
      let response = await Axios.get(CORS_BY_PASS_URL + url);
      const googleResponse = response.data;

      this.setState(({ mapData }) => ({
        mapData: { ...mapData, results: googleResponse.predictions }
      }));
    } catch (error) {
      console.error(error);
    }
  }
  handleAutoCompleteSelect(value) {
    var map = new google.maps.Map(document.createElement("div"));
    var service = new google.maps.places.PlacesService(map);
    service.getDetails(
      {
        placeId: value
      },
      this.callBackAutoCompleteSelect
    );
  }
  handleMapClick(event) {
    const { latLng } = event;
    this.setState(({ mapData }) => ({
      mapData: {
        ...mapData,
        latitude: latLng.lat(),
        longitude: latLng.lng()
      }
    }));
  }

  async addressLookup() {
    const url = GET_GOOGLE_REVERSE_GEOCODE_API();
    try {
      let response = await Axios.get(CORS_BY_PASS_URL + url);
      const googleResponse = response.data;

      this.setState(({ mapData }) => ({
        mapData: { ...mapData, results: googleResponse.predictions }
      }));
    } catch (error) {
      console.error(error);
    }
  }

  callBackAutoCompleteSelect(place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      const latLng = place.geometry.location;
      this.setState(({ mapData }) => ({
        mapData: {
          ...mapData,
          latitude: latLng.lat(),
          longitude: latLng.lng(),
          sessionToken: UUID.v4()
        }
      }));
    }
  }
  render() {
    const {
      modalFlag,
      modalToggleFunc,
      validateToNextPassword,
      compareToFirstPassword,
      handleConfirmBlur,
      handleAddEditUserFormSubmit,
      getFieldDecorator,
      uploadLoading,
      beforeUpload,
      handleChange,
      addMode,
      UserDetails = {}
    } = this.props;
    let { imageUrl } = this.props;

    if (!addMode) {
      imageUrl = imageUrl || (UserDetails && UserDetails.profileImage);
    }

    const uploadButton = (
      <div>
        <Icon type={uploadLoading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const {
      mapData: { results, longitude, latitude }
    } = this.state;
    const children = results.map(place => (
      <Option key={place.place_id}>{place.description}</Option>
    ));
    const additionalData = {
      latitude,
      longitude,
      userId: UserDetails && UserDetails.userId,
      profileImage: imageUrl
    };

    let {
      firstName,
      lastName,
      phoneNumber,
      gender = "",
      role = ""
    } = UserDetails;

    return (
      <Fragment>
        <Modal
          footer={null}
          title={addMode ? "New User" : "Update User"}
          visible={modalFlag}
          onCancel={modalToggleFunc}
          maskClosable={false}
        >
          <Form onSubmit={e => handleAddEditUserFormSubmit(e, additionalData)}>
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
                ],
                initialValue: firstName || ""
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
                ],
                initialValue: lastName || ""
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
                ],
                initialValue: phoneNumber || ""
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
                ],
                initialValue: gender.toLowerCase() || "male"
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
                ],
                initialValue: role.toLowerCase() || "user"
              })(
                <Radio.Group>
                  <Radio value="user">User</Radio>
                  <Radio value="admin">Admin</Radio>
                </Radio.Group>
              )}
            </Form.Item>
            {addMode && (
              <Fragment>
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
              </Fragment>
            )}
            <Form.Item label="Choose location">
              <AutoComplete
                onChange={this.handleAutoCompleteChange}
                onSelect={this.handleAutoCompleteSelect}
                placeholder="Enter location..."
              >
                {children}
              </AutoComplete>
              {latitude && longitude && (
                <PickerMap
                  centerLat={latitude}
                  centerLng={longitude}
                  markerLat={latitude}
                  markerLng={longitude}
                  zoom={14}
                  handleMapClick={this.handleMapClick}
                />
              )}
            </Form.Item>
            <div className="d-fr">
              <Button className="f-r" type="primary" htmlType="submit">
                {addMode ? "Create" : "Update"}
              </Button>
              <Button
                className="f-r mr-1"
                type="default"
                onClick={modalToggleFunc}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Modal>
      </Fragment>
    );
  }
}

export default UserCRUDModal;
