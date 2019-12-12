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
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
    // directions: {}
    // srclat ,
    // srclng
  }),
  withGoogleMap
)(RouteMapCore);

export default RouteMap;
