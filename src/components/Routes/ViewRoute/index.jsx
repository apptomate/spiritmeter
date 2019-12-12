import React, { Component, Fragment } from "react";
import { Tabs, Spin, Tag, Icon, Badge, Row, Col, Rate } from "antd";
import { getRouteDetails } from "../../../Redux/_actions";
import { connect } from "react-redux";
import DisplayCard from "../../Display/DisplayCard";
import BackButton from "../../Common/BackButton";

const { TabPane } = Tabs;
const desc = ["terrible", "bad", "normal", "good", "wonderful"];

class ViewRoute extends Component {
  state = {
    value: 3
  };

  handleChange = value => {
    this.setState({ value });
  };

  state = {
    tabPosition: "left"
  };
  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    if (id) {
      let routeParam = { routeId: parseInt(id) };
      this.props.getRouteDetails(routeParam);
    }
  }
  render() {
    const { value } = this.state;
    const RouteDetails = this.props.RouteDetails.data || "{}";
    const { loading } = this.props.RouteDetails;
    let {
      routeName,
      totalMiles,
      designatedCharityName,
      ridePoints
    } = RouteDetails;

    return (
      <Fragment>
        <Spin spinning={loading}>
          <BackButton linkPath="/admin/routes" linkText="Back" />
          <Tabs defaultActiveKey="1">
            <TabPane tab="Routes" key="1">
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
                        <img
                          alt="no data"
                          className="w-100"
                          src="https://unitednewsdesk.com/wp-content/uploads/2019/02/Wired.jpg"
                        />
                      </div>
                    </div>

                    <div className="mb-2">
                      <span className="route-title">Map Routes Names :</span>
                      <div className="mt-1 route-list">
                        <Icon type="right-square" />{" "}
                        {/* {pathsToTravel &&
                      pathsToTravel.map((travelPath, key) => {
                        if (totalPaths === key + 1) {
                          return (
                            <Fragment key={`path_${key}`}>
                              <Icon type="swap" />{" "}
                              <Tag color="blue">{travelPath.start_address}</Tag>
                              <Icon type="swap" />{" "}
                              <Tag color="blue">{travelPath.end_address}</Tag>
                            </Fragment>
                          );
                        } else {
                          return (
                            <Fragment key={`path_${key}`}>
                              {key !== 0 && <Icon type="swap" />}
                              <Tag color="blue">{travelPath.start_address}</Tag>
                            </Fragment>
                          );
                        }
                      })} */}
                        <Icon type="left-square" />
                      </div>
                    </div>

                    <div className="mb-2">
                      <span className="route-title">Distance :</span>
                      <Badge count={totalMiles} /> Miles
                    </div>
                  </Col>
                </Row>
              </div>
            </TabPane>
            <TabPane tab="Display List" key="2">
              {ridePoints && (
                <DisplayCard
                  listData={ridePoints}
                  hideViewButton={false}
                  showPreviewModal
                />
              )}
            </TabPane>
            <TabPane tab="Near By" key="3">
              <div>
                <Tabs tabPosition={this.state.tabPosition}>
                  <TabPane tab="Church" key="1">
                    <Row className="map-datails">
                      <Col>
                        <div className="left">
                          <h4>
                            Mar Gregorious Orthodox Syrian Church - Pilgrim
                            Centre
                          </h4>
                          <span>
                            <span className="pr-0-5">4.8</span>
                            <Rate
                              tooltips={desc}
                              onChange={this.handleChange}
                              value={value}
                            />
                            {value ? (
                              <span className="ant-rate-text">
                                {desc[value - 1]}
                              </span>
                            ) : (
                              ""
                            )}
                          </span>
                          <p>
                            248, Bharathamadha St, Railway Colony, Tambaram
                            East, Tambaram, Chennai, Tamil Nadu 600059
                          </p>
                          <p>Open at 6:00 pm</p>
                        </div>
                        <div className="right">
                          <div className="fixed-img">
                            <img src="https://lh5.googleusercontent.com/p/AF1QipOWNgzHzwr002QUS_0gSMKoQglSys_QtVpAKCuw=w408-h306-k-no" />
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tab="Hotel" key="2">
                    Content of Tab 2
                  </TabPane>
                  <TabPane tab="Petrol" key="3">
                    Content of Tab 3
                  </TabPane>
                  <TabPane tab="Coffee Shop" key="4">
                    Content of Tab 3
                  </TabPane>
                  <TabPane tab="Events" key="5">
                    Content of Tab 3
                  </TabPane>
                </Tabs>
              </div>
            </TabPane>
          </Tabs>
        </Spin>
      </Fragment>
    );
  }
}

const getState = state => {
  return {
    RouteDetails: state.getRouteDetails
  };
};

export default connect(getState, {
  getRouteDetails
})(ViewRoute);
