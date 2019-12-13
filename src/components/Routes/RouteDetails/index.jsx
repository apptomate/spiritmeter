import React, { Component, Fragment } from "react";
import { Tag, Icon, Badge, Row, Col } from "antd";
import RouteMap from "../../Common/googleMap/RouteMap";
export default class RouteDetails extends Component {
  render() {
    const {
      routeName,
      designatedCharityName,
      miles,
      directions,
      pathsToTravel,
      totalPaths
    } = this.props.propsData;
    return (
      <Fragment>
        <div className="routes">
          <Row>
            <Col className="route-maintitle" span={24}>
              <h3 className="route-name-h3">
                {designatedCharityName}'s Travel Route
              </h3>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className="mb-2 mt-1">
                <span className="route-title">Route Name :</span>
                <Tag color="red">{routeName}</Tag>
              </div>
              <div className="mb-2">
                <span className="route-title">Map Points :</span>
                <div className="route-map">
                  <RouteMap srclat={2} srclng={2} directions={directions} />
                </div>
              </div>

              <div className="mb-2">
                <span className="route-title">Map Routes Names :</span>
                <div className="mt-1 route-list">
                  <Icon type="right-square" />{" "}
                  {pathsToTravel.map((travelPath, key) => {
                    if (totalPaths === key + 1)
                      return (
                        <Fragment key={`path_${key}`}>
                          <Icon type="swap" />{" "}
                          <Tag color="blue">{travelPath.start_address}</Tag>
                          <Icon type="swap" />{" "}
                          <Tag color="blue">{travelPath.end_address}</Tag>
                        </Fragment>
                      );
                    else
                      return (
                        <Fragment key={`path_${key}`}>
                          {key !== 0 && <Icon type="swap" />}
                          <Tag color="blue">{travelPath.start_address}</Tag>
                        </Fragment>
                      );
                  })}
                  <Icon type="left-square" />
                </div>
              </div>

              <div className="mb-2">
                <span className="route-title">Distance :</span>
                <Badge count={miles} /> Miles
              </div>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}
