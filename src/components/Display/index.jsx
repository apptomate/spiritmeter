import React, { Component, Fragment } from "react";
import { Spin, PageHeader } from "antd";
import { getAllListDisplay } from "../../Redux/_actions";
import { connect } from "react-redux";
import DisplayCard from "./DisplayCard";

class Display extends Component {
  componentDidMount() {
    this.props.getAllListDisplay();
  }
  render() {
    const {
      DisplayResponseData: { data = [], loading }
    } = this.props;

    return (
      <Fragment>
        <PageHeader
          style={{
            border: "1px solid rgb(235, 237, 240)"
          }}
          title="List of Display"
        />
        <br />
        <Spin spinning={loading}>
          {data &&
            data.map((list, key) => (
              <DisplayCard listData={list} hideViewButton={false} key={key} />
            ))}
        </Spin>
      </Fragment>
    );
  }
}

const getState = state => {
  return {
    DisplayResponseData: state.getAllListDisplay
  };
};

export default connect(getState, {
  getAllListDisplay
})(Display);
