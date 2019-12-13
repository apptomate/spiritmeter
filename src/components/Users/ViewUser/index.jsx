import React, { Component, Fragment } from "react";
import { Tabs, Spin } from "antd";
import {
  getUserDetails,
  getUserSpiritMeter,
  getUserDisplay,
  getUserRoute
} from "../../../Redux/_actions";
import { connect } from "react-redux";
import BasicDetails from "../BasicDetails";
import UserDisplay from "../UserDisplay";
import UserRoute from "../UserRoute";
import BackButton from "../../Common/BackButton";

const { TabPane } = Tabs;

class ViewUser extends Component {
  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    let paramData = { userId: parseInt(id) };
    this.props.getUserDetails(id);
    this.props.getUserSpiritMeter(id);
    this.props.getUserDisplay(id);
    this.props.getUserRoute(paramData);
  }
  render() {
    const {
      UserDetails: { loading, data },
      SpiritMeterDetails,
      DisplayDetails,
      RouteDetails
    } = this.props;
    return (
      <Fragment>
        <Spin spinning={loading}>
          <BackButton linkPath="/admin/users" linkText="Back" />
          <Tabs defaultActiveKey="1">
            <TabPane tab="Basic datails" key="1">
              {data && (
                <BasicDetails basicData={data} meterData={SpiritMeterDetails} />
              )}
            </TabPane>
            <TabPane tab="Display listing" key="2">
              {DisplayDetails && <UserDisplay displayData={DisplayDetails} />}
            </TabPane>
            <TabPane tab="Route listing" key="3">
              {RouteDetails && <UserRoute routeData={RouteDetails} />}
            </TabPane>
          </Tabs>
        </Spin>
      </Fragment>
    );
  }
}

const getState = state => {
  return {
    UserDetails: state.getUserDetails,
    SpiritMeterDetails: state.getUserSpiritMeter.data,
    DisplayDetails: state.getUserDisplay.data,
    RouteDetails: state.getUserRoute.data
  };
};

export default connect(getState, {
  getUserDetails,
  getUserSpiritMeter,
  getUserDisplay,
  getUserRoute
})(ViewUser);
