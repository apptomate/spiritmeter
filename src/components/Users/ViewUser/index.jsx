import React, { Component, Fragment } from "react";
import { Tabs, Spin } from "antd";
import { getDisplayDetails } from "../../../Redux/_actions";
import { connect } from "react-redux";

const { TabPane } = Tabs;

class ViewUser extends Component {
  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    this.props.getDisplayDetails(id);
  }
  render() {
    const DisplayDetails = this.props.DisplayDetails.data || "{}";
    const { loading } = this.props.DisplayDetails;

    return (
      <Fragment>
        <Spin spinning={loading}>
          <Tabs defaultActiveKey='1'>
            <TabPane tab='Routes' key='1'>
              tab 1
            </TabPane>
            <TabPane tab='Display List' key='2'>
              tab2
            </TabPane>
            <TabPane tab='Near By' key='3'>
              Tab3
            </TabPane>
          </Tabs>
        </Spin>
      </Fragment>
    );
  }
}

const getState = state => {
  return {
    DisplayDetails: state.getDisplayDetails
  };
};

export default connect(getState, {
  getDisplayDetails
})(ViewUser);
