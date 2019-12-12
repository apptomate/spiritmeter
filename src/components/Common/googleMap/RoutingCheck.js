/*global google*/
import React from 'react';
import { getLatLng, getWayPoints } from '../../../Redux/_helpers/Functions';
const { compose, withProps } = require('recompose');
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} = require('react-google-maps');

class RoutingCheck extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getRoute = this.getRoute.bind(this);
  }
  state = {
    directions: {}
  };

  componentDidMount() {
    this.getRoute();
  }

  getRoute() {
    console.log(this.props);
    let { routePoints } = this.props;
    routePoints = routePoints[0];
    const [srclat, srclng] = getLatLng(routePoints.origin);
    const [destlat, destlng] = getLatLng(routePoints.destination);
    const DirectionsService = new google.maps.DirectionsService();

    console.log(getWayPoints(routePoints.waypoints));

    DirectionsService.route(
      {
        origin: new google.maps.LatLng(srclat, srclng),
        destination: new google.maps.LatLng(destlat, destlng),
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: getWayPoints(routePoints.waypoints),
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
    let { routePoints } = this.props;
    routePoints = routePoints[0];
    const [srclat, srclng] = getLatLng(routePoints.origin);
    return (
      <GoogleMap
        defaultZoom={7}
        defaultCenter={new google.maps.LatLng(srclat, srclng)}
      >
        {this.state.directions && (
          <DirectionsRenderer directions={this.state.directions} />
        )}
      </GoogleMap>
    );
  }
}

const RouteMap = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyCSTfXlm6bBFV5-o5RawVMKvhOd4foWnw4&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(RoutingCheck);

export default RouteMap;
