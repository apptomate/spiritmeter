import React, { Component, Fragment } from "react";
import DisplayCard from "../../Display/DisplayCard";
export default class UserDisplay extends Component {
  render() {
    const { displayData } = this.props;
    console.log(displayData);
    return (
      <Fragment>
        <div className="user-total-poits">
          <h4>
            Total Display Listing : <span>{displayData.length}</span>
          </h4>
        </div>
        <br />
        <DisplayCard listData={displayData} showPreviewModal={true} />
      </Fragment>
    );
  }
}
