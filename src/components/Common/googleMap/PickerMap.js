import React from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import sleigh from "../../../assets/img/sleigh.png";

const Picker = withGoogleMap(props => {
  const {
    centerLat,
    centerLng,
    markerLat,
    markerLng,
    handleMapClick,
    zoom = 8
  } = props;
  return (
    <GoogleMap
      onClick={handleMapClick}
      defaultZoom={zoom}
      center={{ lat: centerLat, lng: centerLng }}
    >
      {markerLat && markerLng && (
        <Marker icon={sleigh} position={{ lat: markerLat, lng: markerLng }} />
      )}
      {props.children}
    </GoogleMap>
  );
});

Picker.defaultProps = {
  loadingElement: <div style={{ height: "100%" }} />,
  containerElement: <div style={{ height: "300px" }} />,
  mapElement: <div style={{ height: "100%" }} />,
  defaultZoom: 8
};

export default Picker;
