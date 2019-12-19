/* global google */
import React, { Component, Fragment } from "react";
import { Tabs, Spin, Empty } from "antd";
import { getRouteDetails } from "../../../Redux/_actions";
import { connect } from "react-redux";
import DisplayCard from "../../Display/DisplayCard";
import BackButton from "../../Common/BackButton";
import {
  getLatLng,
  getWayPoints,
  getMilesFromLegs
} from "../../../Redux/_helpers/Functions";

import RouteDetails from "../RouteDetails";
import NearBy from "../NearBy";

const { TabPane } = Tabs;

class ViewRoute extends Component {
  state = {
    directions: null,
    srclat: "",
    srclng: "",
    destlat: "",
    destlng: ""
  };

  getRoute(srclat, srclng, destlat, destlng, waypoints = []) {
    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route(
      {
        origin: new google.maps.LatLng(srclat, srclng),
        destination: new google.maps.LatLng(destlat, destlng),
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: waypoints,
        optimizeWaypoints: true,
        provideRouteAlternatives: true,
        avoidFerries: true,
        avoidHighways: true,
        avoidTolls: true
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
            srclat: srclat,
            srclng: srclng,
            destlat: destlat,
            destlng: destlng
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

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
    const { directions, srclat, srclng, destlat, destlng } = this.state;
    const RouteData = this.props.RouteDetailsData.data || "{}";
    const { loading } = this.props.RouteDetailsData;

    let {
      routeName,
      designatedCharityName,
      ridePoints = [],
      routePoints
    } = RouteData;

    routePoints = JSON.parse(routePoints || null) || [];
    routePoints = routePoints[0];

    if (!directions && routePoints) {
      const [srclat, srclng] = getLatLng(routePoints.origin);
      const [destlat, destlng] = getLatLng(routePoints.destination);
      const waypoints = getWayPoints(routePoints.waypoints);

      this.getRoute(srclat, srclng, destlat, destlng, waypoints);
    }
    let pathsToTravel = [];
    let totalPaths = 0;
    let miles = 0;
    if (directions) {
      pathsToTravel = directions.routes[0].legs;
      totalPaths = pathsToTravel.length;
      miles = getMilesFromLegs(directions.routes[0].legs);
      miles = miles.toFixed(2);
    }

    //Props for details
    let routeDetailsProps = {
      routeName,
      designatedCharityName,
      miles,
      routePoints,
      directions,
      pathsToTravel,
      totalPaths
    };
    console.log(this.props);

    return (
      <Fragment>
        <Spin spinning={loading}>
          <BackButton linkPath="/admin/routes" linkText="Back" />
          <Tabs defaultActiveKey="1">
            <TabPane tab="Routes" key="1">
              <RouteDetails propsData={routeDetailsProps} />
            </TabPane>
            <TabPane tab="Display List" key="2">
              {ridePoints.length ? (
                <Fragment>
                  {ridePoints.map((list, key) => (
                    <DisplayCard
                      listData={list}
                      hideViewButton={false}
                      showPreviewModal
                      key={key}
                    />
                  ))}
                </Fragment>
              ) : (
                <Empty description="No display found" />
              )}
            </TabPane>
            <TabPane tab="Near By" key="3">
              <NearBy
                srclat={srclat}
                srclng={srclng}
                destlat={destlat}
                destlng={destlng}
              />
            </TabPane>
          </Tabs>
        </Spin>
      </Fragment>
    );
  }
}

const getState = state => {
  return {
    RouteDetailsData: state.getRouteDetails
  };
};

export default connect(getState, {
  getRouteDetails
})(ViewRoute);
