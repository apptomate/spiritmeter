import React, { Component, Fragment } from "react";
import { Tabs, Spin, Row, Col, Avatar, Icon } from "antd";
import { getDisplayDetails } from "../../../Redux/_actions";
import { connect } from "react-redux";
import GaugeChart from "react-gauge-chart";

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
          <Tabs defaultActiveKey="1">
            <TabPane tab="Basic datails" key="1">
              <Row>
                <Col span={12} offset={6}>
                  <div className="username-details">
                    <Avatar shape="square" size="large" icon="user" />
                    <span className="pl-0-5">First Name</span>{" "}
                    <span className="pl-0-5">Last Name</span>
                  </div>
                  <div className="username-details">
                    <Icon type="phone" className="color-light" />
                    <span className="pl-0-5">1234567890</span>
                  </div>
                  <div className="username-details">
                    <Icon type="environment" className="color-light" />
                    <span className="pl-0-5">
                      India , TamilNadu , Chennai , Chrompet
                    </span>
                  </div>

                  <GaugeChart
                    className="mt-2"
                    id="gauge-chart5"
                    nrOfLevels={420}
                    arcsLength={[0.3, 0.5, 0.2]}
                    colors={["#5BE12C", "#F5CD19", "#EA4228"]}
                    percent={0.37}
                    arcPadding={0.02}
                  />
                  <h4 className="meter-title">Spirit Meter</h4>

                  <div className="meter-poits mt-2">
                    <h4>
                      Total Points : <span>34%</span>
                    </h4>
                  </div>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="Display listing" key="2">
              <div className="user-total-poits">
                <h4>
                  Total Display Listing : <span>34</span>
                </h4>
              </div>
            </TabPane>
            <TabPane tab="Route listing" key="3">
              <div className="user-total-poits">
                <h4>
                  Total Route Listing : <span>34</span>
                </h4>
              </div>
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
