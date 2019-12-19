import React, { Component, Fragment } from "react";
import { Tabs, Spin, Empty } from "antd";
import { getDisplayDetails } from "../../../Redux/_actions";
import { connect } from "react-redux";
import RouteCard from "../../Common/RouteCard";
import BackButton from "../../Common/BackButton";
import DisplayDetails from "../DisplayDetails";
const { TabPane } = Tabs;
class ViewDisplay extends Component {
  state = { redirectToDashboard: false };
  componentDidMount() {
    const {
      match: {
        params: { id }
      },
      location: { state = {} }
    } = this.props;
    if (state && state.isRouteFromDashboard)
      this.setState({ redirectToDashboard: true });
    this.props.getDisplayDetails(id);
  }
  render() {
    const DisplayDetailsData = this.props.DisplayDetailsData.data || "{}";
    const { loading } = this.props.DisplayDetailsData;
    let { routes, latitude, longitude } = DisplayDetailsData;
    let routesData = routes || "[]";
    let parsedRoutes = JSON.parse(routesData);

    if (latitude && longitude) {
      latitude = parseFloat(latitude);
      longitude = parseFloat(longitude);
    }
    //Props Data
    const propsData = { DisplayDetailsData, latitude, longitude };

    let { redirectToDashboard } = this.state;

    return (
      <Fragment>
        <Spin spinning={loading}>
          <BackButton
            linkPath={redirectToDashboard ? "/" : "/admin/display"}
            linkText="Back"
          />
          <Tabs defaultActiveKey="1">
            <TabPane tab="Display Details" key="1">
              <DisplayDetails propsData={propsData} />
            </TabPane>
            <TabPane tab="Maping Routes" key="2">
              {!parsedRoutes.length && <Empty description="No Routes Found" />}
              {parsedRoutes.map((route, key) => (
                <RouteCard key={key} data={route} showPreviewModal />
              ))}
            </TabPane>
          </Tabs>
        </Spin>
      </Fragment>
    );
  }
}

const getState = state => {
  return {
    DisplayDetailsData: state.getDisplayDetails
  };
};

export default connect(getState, {
  getDisplayDetails
})(ViewDisplay);
