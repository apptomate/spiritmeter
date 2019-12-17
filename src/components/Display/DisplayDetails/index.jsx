import React, { Component, Fragment } from "react";
import { Row, Col, Icon, Avatar } from "antd";
import MarkerMap from "../../Common/googleMap/MarkerMap";
import DisplaySlider from "../../Common/DisplaySlider";
export default class DisplayDetails extends Component {
  render() {
    const {
      DisplayDetailsData: {
        categoryName,
        type,
        isPrivate,
        createdByName,
        country,
        state,
        cityName,
        address,
        filePath,
        notes
      },
      latitude,
      longitude
    } = this.props.propsData;
    return (
      <Fragment>
        <Row>
          <Col span={12}>
            <div>
              <h4 className="list-name">{categoryName}</h4>
              <div className="list-name-imp">
                <Icon type="home" /> {categoryName}
              </div>
              <div className="list-name-imp">
                <Icon type="radar-chart" /> {type}
              </div>

              <div className="list-name-imp">
                <Icon type="environment" /> {country}
                {state && ` , ${state}`}
                {cityName && ` , ${cityName}`}
                {address && ` , ${address}`}
              </div>

              <div className="list-name-imp">
                <i
                  className={
                    isPrivate
                      ? "fas fa-user-lock color-g"
                      : "fas fa-globe-asia color-r"
                  }
                />
                {isPrivate ? "Is Private" : "Is Public"}
              </div>

              <p className="mt-1">
                <h4>Note :</h4>
                {notes}
              </p>

              <div className="item-center list-username mt-2">
                <Avatar icon="user" />
                <span>{createdByName}</span>
                <span></span>
              </div>
            </div>
          </Col>
          <Col span={12}>
            {filePath && <DisplaySlider srcPaths={filePath} />}
          </Col>
        </Row>
        <Row>
          <Col className="mt-2">
            <div className="listing-map-div my-card">
              <MarkerMap
                centerLat={latitude}
                centerLng={longitude}
                markerLat={latitude}
                markerLng={longitude}
              />
            </div>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
