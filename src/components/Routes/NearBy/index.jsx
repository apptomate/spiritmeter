import React, { Fragment, PureComponent } from "react";
import { Tabs } from "antd";
import NearByList from "./NearByList";
const { TabPane } = Tabs;
export default class NearBy extends PureComponent {
  render() {
    const { srclat, srclng } = this.props;

    return (
      <Fragment>
        <div>
          <Tabs tabPosition="top">
            <TabPane tab="Church" key="1">
              <NearByList srclat={srclat} srclng={srclng} keyword="church" />
            </TabPane>
            <TabPane tab="Hotel" key="2">
              <NearByList srclat={srclat} srclng={srclng} keyword="hotel" />
            </TabPane>
            <TabPane tab="Petrol" key="3">
              <NearByList srclat={srclat} srclng={srclng} keyword="petrol" />
            </TabPane>
            <TabPane tab="Coffee Shop" key="4">
              <NearByList
                srclat={srclat}
                srclng={srclng}
                keyword="coffee_shop"
              />
            </TabPane>
            <TabPane tab="Events" key="5">
              <NearByList srclat={srclat} srclng={srclng} keyword="events" />
            </TabPane>
          </Tabs>
        </div>
      </Fragment>
    );
  }
}
