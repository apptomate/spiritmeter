import React, { Component, Fragment } from "react";
import { Tabs, Row, Col, Rate } from "antd";
const { TabPane } = Tabs;
const desc = ["terrible", "bad", "normal", "good", "wonderful"];
export default class NearBy extends Component {
  state = {
    value: 3,
    tabPosition: "left"
  };
  handleChange = value => {
    this.setState({ value });
  };
  render() {
    const { value, tabPosition } = this.state;
    return (
      <Fragment>
        <div>
          <Tabs tabPosition={tabPosition}>
            <TabPane tab="Church" key="1">
              <Row className="map-datails">
                <Col>
                  <div className="left">
                    <h4>
                      Mar Gregorious Orthodox Syrian Church - Pilgrim Centre
                    </h4>
                    <span>
                      <span className="pr-0-5">4.8</span>
                      <Rate
                        tooltips={desc}
                        onChange={this.handleChange}
                        value={value}
                      />
                      {value ? (
                        <span className="ant-rate-text">{desc[value - 1]}</span>
                      ) : (
                        ""
                      )}
                    </span>
                    <p>
                      248, Bharathamadha St, Railway Colony, Tambaram East,
                      Tambaram, Chennai, Tamil Nadu 600059
                    </p>
                    <p>Open at 6:00 pm</p>
                  </div>
                  <div className="right">
                    <div className="fixed-img">
                      <img src="https://lh5.googleusercontent.com/p/AF1QipOWNgzHzwr002QUS_0gSMKoQglSys_QtVpAKCuw=w408-h306-k-no" />
                    </div>
                  </div>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="Hotel" key="2">
              Content of Tab 2
            </TabPane>
            <TabPane tab="Petrol" key="3">
              Content of Tab 3
            </TabPane>
            <TabPane tab="Coffee Shop" key="4">
              Content of Tab 3
            </TabPane>
            <TabPane tab="Events" key="5">
              Content of Tab 3
            </TabPane>
          </Tabs>
        </div>
      </Fragment>
    );
  }
}
