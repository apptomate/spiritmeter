import React from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const MarkerMap = withGoogleMap(props => {
  const { lat, lng } = props;
  return (
    <GoogleMap defaultZoom={8} center={{ lat: lat, lng: lng }}>
      <Marker position={{ lat: lat, lng: lng }} />
    </GoogleMap>
  );
});

MarkerMap.defaultProps = {
  loadingElement: <div style={{ height: "100%" }} />,
  containerElement: <div style={{ height: "400px" }} />,
  mapElement: <div style={{ height: "100%" }} />,
  defaultZoom: 8
};

export default MarkerMap;
