/* global google */
import React, { Component, Fragment } from "react";
import NearByListCard from "./NearByListCard";

class NearByList extends Component {
  state = {
    results: []
  };
  constructor(props) {
    super(props);
    this.googleServiceCallback = this.googleServiceCallback.bind(this);
  }
  componentDidMount() {
    const { srclat, srclng, keyword } = this.props;
    this.fetchNearByPlace(srclat, srclng, keyword);
  }
  async fetchNearByPlace(srclat, srclng, keyword) {
    var request = {
      location: new google.maps.LatLng(srclat, srclng),
      radius: 5000,
      types: [keyword]
    };

    var service = new google.maps.places.PlacesService(
      document.createElement("div")
    );
    service.nearbySearch(request, data =>
      this.googleServiceCallback(data, service)
    );
  }

  googleServiceCallback(data, service) {
    data.map(place => {
      service.getDetails(
        {
          placeId: "ChIJAUKRDWz2wokRxngAavG2TD8",
          fields: ["photo"]
        },
        function(place, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            console.log(121212121212121212, place);
          }
        }
      );

      const placeImg = "";
      return [...place, placeImg];
    });
    this.setState({ results: data });
  }

  render() {
    const results = this.state.results;
    console.log(this.state, this.props);
    return (
      <Fragment>
        {results.map((data, i) => (
          <NearByListCard data={data} key={i} />
        ))}
      </Fragment>
    );
  }
}

export default NearByList;
