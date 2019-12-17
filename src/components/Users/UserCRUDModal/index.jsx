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
import { GOOGLE_MAPS_API_KEY } from "../../../Redux/_helpers/Constants";
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
      // country: "",
      // state: "",
      // cityName: "",
      // address: ""
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

  async handleAutoCompleteChange(value) {
    const {
      mapData: { sessionToken }
    } = this.state;
    const url = GET_GOOGLE_AUTOCOMPLETE_API(value, sessionToken);
    try {
      let response = await Axios.get(
        "https://cors-anywhere.herokuapp.com/" + url
      );
      const googleResponse = response.data;

      this.setState(({ mapData }) => ({
        mapData: { ...mapData, results: googleResponse.predictions }
      }));
    } catch (error) {
      console.error(error);
    }
  }
  handleAutoCompleteSelect(value) {
    console.log(value);

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
      let response = await Axios.get(
        "https://cors-anywhere.herokuapp.com/" + url
      );
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
    console.log(this.state, this.props);
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

    const {
      mapData: { results, longitude, latitude }
    } = this.state;
    const children = results.map(place => (
      <Option key={place.place_id}>{place.description}</Option>
    ));
    const latLng = {
      latitude,
      longitude
    };

    return (
      <Fragment>
        <Modal
          footer={null}
          title="User"
          visible={modalFlag}
          onCancel={modalToggleFunc}
        >
          <Form onSubmit={e => addNewUser(e, latLng)}>
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
                  handleMapClick={this.handleMapClick}
                />
              )}
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
