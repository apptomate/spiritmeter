import React, { Component, Fragment } from "react";
import {
  Tabs,
  Descriptions,
  Card,
  Row,
  Col,
  Spin,
  Icon,
  Avatar,
  Carousel
} from "antd";
import { getDisplayDetails } from "../../../Redux/_actions";
import { connect } from "react-redux";
import {
  defaultPlace,
  GOOGLE_MAP_API_KEY
} from "../../../Redux/_helpers/Constants";

import GoogleMapReact from "google-map-react";
import CustomMapMarker from "../../Common/CustomMapMarker";

const { TabPane } = Tabs;

class ViewDisplay extends Component {
  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    this.props.getDisplayDetails(id);
  }
  render() {
    const DisplayDetails = this.props.DisplayDetails.data || "{}";
    const { loading } = this.props.DisplayDetails;
    let {
      name,
      categoryName,
      type,
      isPrivate,
      createdByName,
      createdDate,
      country,
      state,
      cityName,
      address,
      filePath,
      routes,
      latitude,
      longitude
    } = DisplayDetails;
    let routesData = routes || "[]";
    let parsedRoutes = JSON.parse(routesData);

    parsedRoutes = parsedRoutes[0] || {};
    let { path } = parsedRoutes;

    const imgPath = filePath ? filePath[0].FilePath : "";

    let defaultCenter = {};
    if (latitude && longitude) {
      latitude = parseFloat(latitude);
      longitude = parseFloat(longitude);
      defaultCenter = {
        lat: latitude,
        lng: longitude
      };
    }
    const defaultZoom = 15;

    return (
      <Fragment>
        <Spin spinning={loading}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Display Details" key="1">
              <Row>
                <Col span={12}>
                  <div>
                    <h4 className="list-name">
                      Cathedral of Saint Paul, St. Paul, Minnesota
                    </h4>
                    <div className="list-name-imp">
                      <Icon type="home" /> Home
                    </div>
                    <div className="list-name-imp">
                      <Icon type="radar-chart" /> Charity
                    </div>

                    <div className="list-name-imp">
                      <Icon type="environment" /> United States , Texas ,
                      Houston , Apartment1
                    </div>

                    <div className="list-name-imp">
                      <i className="fas fa-user-lock color-g"></i> Is Private /{" "}
                      <i class="fas fa-globe-asia color-r"></i>Is Public
                    </div>

                    <p className="mt-1">
                      <h4>Note :</h4>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book.
                    </p>

                    <div className="item-center list-username mt-2">
                      <Avatar icon="user" />
                      <span>User Name</span>
                      <span>
                        {/* <Link to={"/admin/viewDisplay/" + element.displayId}>View</Link> */}
                      </span>
                    </div>
                  </div>

                  <Descriptions
                    title="Display Info"
                    style={{ display: "none" }}
                  >
                    <Descriptions.Item label="Name">{name}</Descriptions.Item>
                    <Descriptions.Item label="Category Name">
                      {categoryName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Type">{type}</Descriptions.Item>
                    <Descriptions.Item label="is Private">
                      {isPrivate ? "Private" : "Public"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Created By">
                      {createdByName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Created Date">
                      {createdDate}
                    </Descriptions.Item>
                    <Descriptions.Item label="Address">
                      {country}
                      {state && ` , ${state}`}
                      {cityName && ` , ${cityName}`}
                      {address && ` , ${address}`}
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
                <Col span={12}>
                  <Carousel autoplay>
                    <div>
                      <img
                        src="https://images.unsplash.com/photo-1508985307703-52d13b2b06b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                        className="w-100"
                      />
                    </div>
                    <div>
                      <img
                        src="https://images.unsplash.com/photo-1511605673935-c919f8f2faca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1044&q=80"
                        className="w-100"
                      />
                    </div>
                    <div>
                      <img
                        src="https://images.unsplash.com/photo-1422636123679-414dec5b79a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                        className="w-100"
                      />
                    </div>
                  </Carousel>
                  {/* 
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src={imgPath || defaultPlace} />}
                  ></Card> */}
                </Col>
              </Row>
              <Row>
                <Col className="mt-2">
                  <div className="listing-map-div my-card">
                    <img src="https://miro.medium.com/max/5334/1*qYUvh-EtES8dtgKiBRiLsA.png" />
                  </div>
                </Col>
              </Row>
              {latitude && longitude && (
                <div style={{ height: "100vh", width: "100%" }}>
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      key: GOOGLE_MAP_API_KEY
                    }}
                    defaultCenter={defaultCenter}
                    defaultZoom={defaultZoom}
                  >
                    <CustomMapMarker
                      lat={latitude}
                      lng={longitude}
                      text={name}
                    />
                  </GoogleMapReact>
                </div>
              )}
            </TabPane>
            <TabPane tab="Maping Routes" key="2">
              <Row>
                <Col span={10}>
                  <div>
                    <h4 className="route-title">Route names</h4>
                    <h4 className="route-title">
                      Cathedral of Saint Paul, St. Paul, Minnesota
                    </h4>
                    <div className="item-center list-username mt-1 mb-1">
                      <Avatar icon="user" />
                      <span>User Name</span>
                    </div>
                    <div>
                      <h4>Routes :</h4>
                      <div className="route-name">
                        <Icon type="swap" />
                        Oklahoma City
                      </div>

                      <div className="route-name">
                        <Icon type="swap" />
                        Lake Aluma
                      </div>

                      <div className="route-name">
                        <Icon type="swap" />
                        Forest Park
                      </div>

                      <div className="route-name">
                        <Icon type="swap" />
                        McLoud
                      </div>
                    </div>
                  </div>
                </Col>
                <Col span={14}>
                  <div className="listing-map-div">
                    <img src="https://miro.medium.com/max/5334/1*qYUvh-EtES8dtgKiBRiLsA.png" />
                  </div>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Spin>
      </Fragment>
    );
  }
}

const getState = state => {
  return {
    DisplayDetails: state.getDisplayDetails
  };
};

export default connect(getState, {
  getDisplayDetails
})(ViewDisplay);
