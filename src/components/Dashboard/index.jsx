import React, { Component, Fragment } from "react";

import { Statistic, Row, Col } from "antd";

const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

function onFinish() {}

class Dashboard extends Component {
  render() {
    return (
      <Fragment>
        <Row gutter={16}>
          <Col span={12}>
            <Countdown title="Countdown" value={deadline} onFinish={onFinish} />
          </Col>
          <Col span={12}>
            <Countdown
              title="Million Seconds"
              value={deadline}
              format="HH:mm:ss:SSS"
            />
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default Dashboard;
