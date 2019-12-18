import React from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const MarkerMap = withGoogleMap(props => {
  const { centerLat, centerLng, markerLat, markerLng } = props;
  return (
    <GoogleMap defaultZoom={8} center={{ lat: centerLat, lng: centerLng }}>
      {markerLat && markerLng && (
        <Marker position={{ lat: markerLat, lng: markerLng }} />
      )}
    </GoogleMap>
  );
});

MarkerMap.defaultProps = {
  loadingElement: <div style={{ height: "100%" }} />,
  containerElement: <div style={{ height: "300px" }} />,
  mapElement: <div style={{ height: "100%" }} />,
  defaultZoom: 8
};

export default MarkerMap;
