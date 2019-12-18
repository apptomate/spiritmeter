/*global google*/
import React from "react";
const { compose, withProps } = require("recompose");
const {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} = require("react-google-maps");

class RouteMapCore extends React.PureComponent {
  render() {
    const { srclat, srclng, directions } = this.props;
    return (
      <GoogleMap
        defaultZoom={7}
        defaultCenter={new google.maps.LatLng(srclat, srclng)}
      >
        {directions && <DirectionsRenderer directions={directions} />}
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
