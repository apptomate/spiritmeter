import React, { Component, Fragment } from "react";
import { Row, Col, Icon } from "antd";
import GaugeChart from "react-gauge-chart";
import DisplayAvatar from "../../Common/DisplayAvatar";

export default class BasicDetails extends Component {
  render() {
    const { basicData, meterData } = this.props;
    let {
      name,
      profileImage,
      phoneNumber,
      address,
      cityName,
      state,
      country,
      gender,
      role
    } = basicData;

    let meterPoints = 0;
    let percentage = 0;
    if (meterData) {
      meterPoints = parseInt(meterData.spiritMeter);
      percentage = meterPoints / 1000;
    }
    return (
      <Fragment>
        <Row>
          <Col span={12} offset={6}>
            <div className="username-details">
              <DisplayAvatar srcPath={profileImage} />
              <span className="pl-0-5">{name}</span>
            </div>
            <div className="username-details">
              <Icon type="user" className="color-light" />
              <span className="pl-0-5">{gender}</span>
            </div>
            <div className="username-details">
              <Icon type="user" className="color-light" />
              <span className="pl-0-5">{role}</span>
            </div>
            <div className="username-details">
              <Icon type="phone" className="color-light" />
              <span className="pl-0-5">{phoneNumber}</span>
            </div>
            <div className="username-details">
              <Icon type="environment" className="color-light" />
              <span className="pl-0-5">
                {country}
                {state && ` , ${state}`}
                {cityName && ` , ${cityName}`}
                {address && ` , ${address}`}
              </span>
            </div>

            <GaugeChart
              className="mt-2"
              id="gauge-chart5"
              nrOfLevels={420}
              arcsLength={[0.3, 0.5, 0.2]}
              colors={["#5BE12C", "#F5CD19", "#EA4228"]}
              percent={percentage}
              arcPadding={0.02}
            />
            <h4 className="meter-title">Spirit Meter</h4>

            <div className="meter-poits mt-2">
              <h4>
                Total Points : <span>{meterPoints}%</span>
              </h4>
            </div>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
