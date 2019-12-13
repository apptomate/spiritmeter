/* global google */
import React, { Component, Fragment } from "react";
import { Icon, Row, Col, Tooltip, Button } from "antd";
import RouteMap from "../googleMap/RouteMap";
import {
  getLatLng,
  getWayPoints,
  getMilesFromLegs
} from "../../../Redux/_helpers/Functions";
import LinkButton from "../LinkButton";
import PropTypes from "prop-types";
import RoutePreview from "../../Routes/RoutePreview";

class RouteCard extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    showPreviewModal: PropTypes.bool
  };
  state = {
    directions: null,
    toggleFlag: false
  };
  constructor(props) {
    super(props);
    this.getRoute = this.getRoute.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }
  toggleModal() {
    this.setState(prevState => ({
      toggleFlag: !prevState.toggleFlag
    }));
  }
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
          this.setState(
            {
              directions: result
            },
            () => console.log(result)
          );
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }
  render() {
    let { toggleFlag } = this.state;
    let {
      routeName,
      isPrivate,
      designatedCharityName,
      comments,
      routeId,
      routePoints
    } = this.props.data;
    const { showPreviewModal, data } = this.props;

    const { directions } = this.state;
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
    return (
      <div>
        <div className="route-list-card">
          <Row>
            <Col className="route-maintitle" span={24}>
              <h3 className="route-name-h3">
                {designatedCharityName}'s Travel Route
              </h3>
            </Col>
            <Col span={12}>
              <div>
                <h4 className="route-title mt-0-5">{routeName}</h4>
                <div className="list-name-imp mt-0-5">
                  <i
                    className={
                      isPrivate
                        ? "fas fa-user-lock color-g"
                        : "fas fa-globe-asia color-r"
                    }
                  />
                  {isPrivate ? "Is Private" : "Is Public"}
                </div>
                <div className="list-name-imp mt-0-5">
                  <h4>
                    Comments :
                    <span>
                      <Tooltip placement="top" title={comments}>
                        <span>
                          <Icon className="commands-info" type="info-circle" />
                        </span>
                      </Tooltip>
                    </span>
                  </h4>
                </div>
                <div>
                  <h4>Routes :</h4>
                  {pathsToTravel.map((travelPath, key) => {
                    if (totalPaths === key + 1)
                      return (
                        <Fragment key={`path_${key}`}>
                          <div className="route-name">
                            <Icon type="swap" />
                            {travelPath.start_address}{" "}
                          </div>
                          <div className="route-name" key={`path_${key}`}>
                            <Icon type="swap" />
                            {travelPath.end_address}{" "}
                          </div>
                        </Fragment>
                      );
                    else
                      return (
                        <div className="route-name" key={`path_${key}`}>
                          <Icon type="swap" /> {travelPath.start_address}{" "}
                        </div>
                      );
                  })}
                  <h4>Distance : {miles} miles </h4>
                </div>

                {showPreviewModal ? (
                  <Fragment>
                    <Button
                      className="f-r mt--2 mr-2"
                      onClick={this.toggleModal}
                    >
                      Preview
                    </Button>
                    <RoutePreview
                      toggleFlag={toggleFlag}
                      toggleFunc={this.toggleModal}
                      previewData={data}
                      routesData={pathsToTravel}
                      directionsData={directions}
                      totalMiles={miles}
                    />
                  </Fragment>
                ) : (
                  <LinkButton
                    linkPath={`/admin/viewRoute/${routeId}`}
                    linkText="View"
                  />
                )}
              </div>
            </Col>
            <Col span={12}>
              <div className="route-card-map">
                <RouteMap srclat={2} srclng={2} directions={directions} />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default RouteCard;
