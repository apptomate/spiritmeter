/*global google*/
import React from "react";
import {
  getLatLng,
  getWayPointsLatLng
} from "../../../Redux/_helpers/Functions";
import gift from "../../../assets/img/gift.png";
import sleigh from "../../../assets/img/sleigh.png";
import christmasTree from "../../../assets/img/christmas-tree.png";
const { compose, withProps } = require("recompose");
const {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} = require("react-google-maps");
const {
  MarkerWithLabel
} = require("react-google-maps/lib/components/addons/MarkerWithLabel");

class RouteMapCore extends React.PureComponent {
  state = { markers: [] };
  componentDidUpdate() {
    const { routePoints } = this.props;
    const { markers } = this.state;    
    if (routePoints && !markers.length) {
      let markers = [];
      const src = getLatLng(routePoints.origin);
      markers.push(getMarkerWithStyle(src[0], src[1], "Start", sleigh));
      const dest = getLatLng(routePoints.destination);
      markers.push(getMarkerWithStyle(dest[0], dest[1], "Destination", gift));

      const waypoints = getWayPointsLatLng(routePoints.waypoints).map(e =>
        getMarkerWithStyle(e[0], e[1], null, christmasTree)
      );

      markers = markers.concat(waypoints);
      this.setState({ markers });
    }
  }

  render() {
    const { srclat, srclng, directions, routePoints } = this.props;
    const { markers } = this.state;
    return (
      <GoogleMap
        defaultZoom={7}
        defaultCenter={new google.maps.LatLng(srclat, srclng)}
      >
        {directions && (
          <DirectionsRenderer
            defaultOptions={{ suppressMarkers: !!routePoints }}
            directions={directions}
          />
        )}
        {markers}
      </GoogleMap>
    );
  }
}

const RouteMap = compose(
  withProps({
    loadingElement: <div style={{ height: "100%" }} />,
    containerElement: <div style={{ height: "400px" }} />,
    mapElement: <div style={{ height: "100%" }} />
  }),
  withGoogleMap
)(RouteMapCore);

export default RouteMap;

const getMarkerWithStyle = (
  lat,
  lng,
  label = "",
  icon,
  style = {
    backgroundColor: "white",
    fontSize: "15px",
    padding: "8px"
  }
) => {
  return (
    <MarkerWithLabel
      key={`${lat}${label}`}
      position={{ lat, lng }}
      labelAnchor={new google.maps.Point(0, 0)}
      labelStyle={style}
      labelVisible={!!label}
      icon={icon}
    >
      <div>{label}</div>
    </MarkerWithLabel>
  );
};
