/*global google*/
import React from 'react';
const { withScriptjs, withGoogleMap, GoogleMap } = require('react-google-maps');

const MyMapComponent = withScriptjs(
  withGoogleMap(props => {
    console.log(props);
    return (
      <GoogleMap
        defaultZoom={props.defaultZoom}
        defaultCenter={props.defaultCenter}
      >
        {props.children}
      </GoogleMap>
    );
  })
);

MyMapComponent.defaultProps = {
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div style={{ height: `400px` }} />,
  mapElement: <div style={{ height: `100%` }} />,
  defaultZoom: 8,
  defaultCenter: { lat: -34.397, lng: 150.644 }
};
export default MyMapComponent;
