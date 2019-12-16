import React, { Component, Fragment } from "react";
import { Spin, PageHeader, Input } from "antd";
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
    const { Search } = Input;

    return (
      <Fragment>
        <div className="dis-center">
          <PageHeader className="title-header-left" title="List of Display" />
          <div className="title-header-right">
            <Search
              className="f-r"
              placeholder="Search..."
              style={{ width: 200 }}
            />
          </div>
        </div>

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
