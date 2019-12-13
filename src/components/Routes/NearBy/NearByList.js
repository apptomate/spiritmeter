import React, { Component, Fragment } from "react";
import NearByListCard from "./NearByListCard";
import { GOOGLE_MAPS_API_KEY } from "../../../Redux/_helpers/Constants";
import Axios from "axios";

class NearByList extends Component {
  state = {
    results: [],
    loading: false
  };
  async componentDidMount() {
    const { srclat, srclng, keyword } = this.props;
    this.fetchNearByPlaces(srclat, srclng, keyword);
  }

  async fetchNearByPlaces(srclat, srclng, keyword) {
    this.setState({ loading: true });
    const response = await Axios.get(
      `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${srclat},${srclng}&radius=1500&field=&type=${keyword}&keyword=${keyword}&key=${GOOGLE_MAPS_API_KEY}`
    );
    this.setState({ loading: false, results: response.data.results });
  }

  render() {
    const { results, loading } = this.state;
    if (loading) {
      return <p>Loading...</p>;
    }
    if (!results.length) {
      return <p>No results found</p>;
    }
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
