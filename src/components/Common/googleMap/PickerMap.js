import React from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const Picker = withGoogleMap(props => {
  const { centerLat, centerLng, markerLat, markerLng, handleMapClick } = props;
  return (
    <GoogleMap
      onClick={handleMapClick}
      defaultZoom={8}
      center={{ lat: centerLat, lng: centerLng }}
    >
      {markerLat && markerLng && (
        <Marker position={{ lat: markerLat, lng: markerLng }} />
      )}
    </GoogleMap>
  );
});

Picker.defaultProps = {
  loadingElement: <div style={{ height: "100%" }} />,
  containerElement: <div style={{ height: "400px" }} />,
  mapElement: <div style={{ height: "100%" }} />,
  defaultZoom: 8
};

export default Picker;
