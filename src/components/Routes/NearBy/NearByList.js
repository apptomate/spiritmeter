import React, { Component, Fragment } from "react";
import NearByListCard from "./NearByListCard";
import {
  GOOGLE_MAPS_API_KEY,
  CORS_BY_PASS_URL
} from "../../../Redux/_helpers/Constants";
import Axios from "axios";
import { Spin, Empty } from "antd";

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
      `${CORS_BY_PASS_URL}/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${srclat},${srclng}&radius=1500&field=&type=${keyword}&keyword=${keyword}&key=${GOOGLE_MAPS_API_KEY}`
    );
    this.setState({ loading: false, results: response.data.results });
  }

  render() {
    const { results, loading } = this.state;
    return (
      <Fragment>
        <Spin spinning={loading}>
          {results && results.length ? (
            <Fragment>
              {results.map((data, i) => (
                <NearByListCard data={data} key={i} />
              ))}
            </Fragment>
          ) : (
            <Empty description="No data found" />
          )}
        </Spin>
      </Fragment>
    );
  }
}

export default NearByList;
