import React, { Fragment } from "react";
import { Modal, Icon, Avatar, Row, Col } from "antd";
import DisplayImage from "../../Common/DisplayImage";
import MarkerMap from "../../Common/googleMap/MarkerMap";
export default function DisplayPreview(props) {
  const { toggleFlag, toggleFunc, previewData } = props;
  let {
    name,
    categoryName,
    type,
    country,
    state,
    cityName,
    address,
    isPrivate,
    createdByName,
    latitude,
    longitude
  } = previewData;
  let filePathJson = previewData.filePath || "[]";
  let filePathParsed = JSON.parse(filePathJson);
  filePathParsed = filePathParsed.length ? filePathParsed[0].filePath : "";
  latitude = parseFloat(latitude);
  longitude = parseFloat(longitude);
  const location_address = `${country}${state && ` , ${state}`}${cityName &&
    ` , ${cityName}`}${address && ` , ${address}`}`;
  return (
    <Fragment>
      <Modal
        className="mymodel-width"
        style={{ width: "80%" }}
        title="Display Preview"
        visible={toggleFlag}
        footer={null}
        onOk={toggleFunc}
        onCancel={toggleFunc}
      >
        <Row>
          <Col span={12}>
            <div className="display-popImg">
              <DisplayImage srcPath={filePathParsed} />
            </div>
            <div className="list-name-imp">
              <h4 className="list-name">{name}</h4>
            </div>
            <div className="list-name-imp">
              <Icon type="home" /> {categoryName}
            </div>
            <div className="list-name-imp">
              <Icon type="radar-chart" /> {type}
            </div>
            <div className="list-name-imp">
              <Icon type="environment" /> {location_address}
            </div>

            <div className="list-name-imp">
              <i
                className={
                  isPrivate
                    ? "fas fa-user-lock color-g"
                    : "fas fa-globe-asia color-r"
                }
              />
              {isPrivate ? "Private" : "Public"}
            </div>

            <div className="item-center list-username mt-2">
              <Avatar icon="user" />
              <span>{createdByName}</span>
            </div>
          </Col>
          <Col span={12}>
            <div className="map-p">
              <MarkerMap
                centerLat={latitude}
                centerLng={longitude}
                title={location_address}
                markerLat={latitude}
                markerLng={longitude}
              />
            </div>
          </Col>
        </Row>
      </Modal>
    </Fragment>
  );
}
