import React, { Component, Fragment } from "react";
import { Tabs, Row, Col, Spin, Icon, Avatar, Empty } from "antd";
import { getDisplayDetails } from "../../../Redux/_actions";
import { connect } from "react-redux";
import DisplaySlider from "../../Common/DisplaySlider";
import MarkerMap from "../../Common/googleMap/MarkerMap";
import RouteCard from "../../Common/RouteCard";
import BackButton from "../../Common/BackButton";

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
      categoryName,
      type,
      isPrivate,
      createdByName,
      country,
      state,
      cityName,
      address,
      filePath,
      routes,
      latitude,
      longitude,
      notes
    } = DisplayDetails;
    let routesData = routes || "[]";
    let parsedRoutes = JSON.parse(routesData);

    if (latitude && longitude) {
      latitude = parseFloat(latitude);
      longitude = parseFloat(longitude);
    }

    return (
      <Fragment>
        <Spin spinning={loading}>
          <BackButton linkPath="/admin/display" linkText="Back" />
          <Tabs defaultActiveKey="1">
            <TabPane tab="Display Details" key="1">
              <Row>
                <Col span={12}>
                  <div>
                    <h4 className="list-name">{categoryName}</h4>
                    <div className="list-name-imp">
                      <Icon type="home" /> {categoryName}
                    </div>
                    <div className="list-name-imp">
                      <Icon type="radar-chart" /> {type}
                    </div>

                    <div className="list-name-imp">
                      <Icon type="environment" /> {country}
                      {state && ` , ${state}`}
                      {cityName && ` , ${cityName}`}
                      {address && ` , ${address}`}
                    </div>

                    <div className="list-name-imp">
                      <i
                        className={
                          isPrivate
                            ? "fas fa-user-lock color-g"
                            : "fas fa-globe-asia color-r"
                        }
                      />
                      {isPrivate ? "Is Private" : "Is Public"}
                    </div>

                    <p className="mt-1">
                      <h4>Note :</h4>
                      {notes}
                    </p>

                    <div className="item-center list-username mt-2">
                      <Avatar icon="user" />
                      <span>{createdByName}</span>
                      <span>
                        {/* <Link to={"/admin/viewDisplay/" + element.displayId}>View</Link> */}
                      </span>
                    </div>
                  </div>
                </Col>
                <Col span={12}>
                  {filePath && <DisplaySlider srcPaths={filePath} />}
                </Col>
              </Row>
              <Row>
                <Col className="mt-2">
                  <div className="listing-map-div my-card">
                    <MarkerMap lat={latitude} lng={longitude} />
                  </div>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="Maping Routes" key="2">
              {!parsedRoutes.length && <Empty description="No Routes Found" />}
              {parsedRoutes.map((route, key) => (
                <RouteCard key={key} data={route} showPreviewModal />
              ))}
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
