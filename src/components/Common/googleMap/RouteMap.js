/*global google*/
import React from "react";
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
    const { directions } = this.props;
    console.log(directions);
    const { markers } = this.state;
    if (!markers.length && directions) {
      let markers = [];
      let legs = directions.routes[0].legs;
      let routes = [];

      legs.forEach((e, i) => {
        let temp = {};
        temp = e.start_location;
        routes.push([temp.lat(), temp.lng(), e.start_address]);
        if (i + 1 === legs.length) {
          temp = e.end_location;
          routes.push([temp.lat(), temp.lng(), e.end_address]);
        }
      });
      console.warn(routes);
      const src = routes[0];
      markers.push(getMarkerWithStyle(src[0], src[1], src[2], "Start", sleigh));
      const dest = routes[routes.length - 1];
      markers.push(
        getMarkerWithStyle(dest[0], dest[1], dest[2], "Destination", gift)
      );

      let waypoints = routes.slice(1, -1);
      waypoints = waypoints.map(e =>
        getMarkerWithStyle(e[0], e[1], e[2], null, christmasTree)
      );

      markers = markers.concat(waypoints);
      this.setState({ markers });
    }
  }

  render() {
    const { srclat, srclng, directions } = this.props;
    const { markers } = this.state;
    return (
      <GoogleMap
        defaultZoom={7}
        defaultCenter={new google.maps.LatLng(srclat, srclng)}
      >
        {directions && (
          <DirectionsRenderer
            defaultOptions={{ suppressMarkers: true }}
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
    containerElement: <div style={{ height: "300px" }} />,
    mapElement: <div style={{ height: "100%" }} />
  }),
  withGoogleMap
)(RouteMapCore);

export default RouteMap;

const getMarkerWithStyle = (
  lat,
  lng,
  title = "",
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
      title={title}
      icon={icon}
    >
      <div>{label}</div>
    </MarkerWithLabel>
  );
};
