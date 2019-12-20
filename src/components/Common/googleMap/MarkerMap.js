/* global google */
import React from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import sleigh from "../../../assets/img/sleigh.png";

const MarkerMap = withGoogleMap(props => {
  const { centerLat, centerLng, markerLat, markerLng, title } = props;
  return (
    <GoogleMap defaultZoom={8} center={{ lat: centerLat, lng: centerLng }}>
      {markerLat && markerLng && (
        <Marker
          position={{ lat: markerLat, lng: markerLng }}
          icon={sleigh}
          title={title}
          animation={google.maps.Animation.DROP}
        />
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
