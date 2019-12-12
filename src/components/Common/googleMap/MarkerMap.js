import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';

const MarkerMap = withScriptjs(
  withGoogleMap(props => {
    console.log(props);
    const { lat, lng } = props;
    return (
      <GoogleMap defaultZoom={8} center={{ lat: lat, lng: lng }}>
        <Marker position={{ lat: lat, lng: lng }} />
      </GoogleMap>
    );
  })
);

MarkerMap.defaultProps = {
  googleMapURL:
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyCSTfXlm6bBFV5-o5RawVMKvhOd4foWnw4&v=3.exp&libraries=geometry,drawing,places',
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div style={{ height: `400px` }} />,
  mapElement: <div style={{ height: `100%` }} />,
  defaultZoom: 8
};

export default MarkerMap;
