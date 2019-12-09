import React, { Component, Fragment } from "react";
import { Tabs, Descriptions, Card, Row, Col, Spin } from "antd";
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
          <Tabs defaultActiveKey='1'>
            <TabPane tab='Display Details' key='1'>
              <Row>
                <Col span={18}>
                  <Descriptions title='Display Info'>
                    <Descriptions.Item label='Name'>{name}</Descriptions.Item>
                    <Descriptions.Item label='Category Name'>
                      {categoryName}
                    </Descriptions.Item>
                    <Descriptions.Item label='Type'>{type}</Descriptions.Item>
                    <Descriptions.Item label='is Private'>
                      {isPrivate ? "Private" : "Public"}
                    </Descriptions.Item>
                    <Descriptions.Item label='Created By'>
                      {createdByName}
                    </Descriptions.Item>
                    <Descriptions.Item label='Created Date'>
                      {createdDate}
                    </Descriptions.Item>
                    <Descriptions.Item label='Address'>
                      {country}
                      {state && ` , ${state}`}
                      {cityName && ` , ${cityName}`}
                      {address && ` , ${address}`}
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
                <Col span={6}>
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt='example' src={imgPath || defaultPlace} />}
                  ></Card>
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
            <TabPane tab='Maping Routes' key='2'>
              Display Routes
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
