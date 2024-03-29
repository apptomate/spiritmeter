import React, { Component, Fragment } from "react";
import DisplayCard from "../../Display/DisplayCard";
import { Empty } from "antd";
export default class UserDisplay extends Component {
  render() {
    const { displayData } = this.props;
    return (
      <Fragment>
        <div className="user-total-poits">
          <h4>
            Total Display Listing : <span>{displayData.length}</span>
          </h4>
        </div>
        <br />
        {displayData.map((list, key) => (
          <DisplayCard listData={list} showPreviewModal={true} key={key} />
        ))}
        {!displayData.length && <Empty description="No display found" />}
      </Fragment>
    );
  }
}
