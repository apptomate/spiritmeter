import React, { Component, Fragment } from "react";
import { Spin, PageHeader } from "antd";
import { getAllListRoutes } from "../../Redux/_actions";
import { connect } from "react-redux";
import RouteCard from "../Common/RouteCard";
class Routes extends Component {
  componentDidMount() {
    this.props.getAllListRoutes();
  }
  render() {
    const {
      RoutesResponseData: { data = [], loading }
    } = this.props;

    return (
      <Fragment>
        <PageHeader
          style={{
            border: "1px solid rgb(235, 237, 240)"
          }}
          title="List of Routes"
        />
        <br />
        <Spin spinning={loading}>
          {data.map((list, key) => (
            <RouteCard key={key} data={list} />
          ))}
        </Spin>
      </Fragment>
    );
  }
}
const getState = state => {
  return {
    RoutesResponseData: state.getAllListRoutes
  };
};
export default connect(getState, {
  getAllListRoutes
})(Routes);
