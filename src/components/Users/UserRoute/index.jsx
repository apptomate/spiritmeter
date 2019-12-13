import React, { Component, Fragment } from "react";
import RouteCard from "../../Common/RouteCard";
export default class UserRoute extends Component {
  render() {
    const { routeData } = this.props;
    return (
      <Fragment>
        <div className="user-total-poits">
          <h4>
            Total Route Listing : <span>{routeData.length}</span>
          </h4>
        </div>
        {routeData.map((list, key) => (
          <RouteCard key={key} data={list} showPreviewModal />
        ))}
      </Fragment>
    );
  }
}
