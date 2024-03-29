import React, { Fragment } from "react";
import { Modal, Tooltip, Icon, Col, Badge, Row } from "antd";
import RouteMap from "../../Common/googleMap/RouteMap";
export default function RoutePreview(props) {
  const {
    toggleFlag,
    toggleFunc,
    previewData,
    legs,
    directions,
    totalMiles
  } = props;
  let { routeName, comments, designatedCharityName, isPrivate } = previewData;
  return (
    <Fragment>
      <div className="mymodel">
        <Modal
          className="mymodel-width"
          title="Route Preview"
          visible={toggleFlag}
          footer={null}
          onOk={toggleFunc}
          onCancel={toggleFunc}
        >
          <Col className="route-maintitle" span={24}>
            <h3 className="route-name-h3">
              {designatedCharityName}'s Travel Route
            </h3>
          </Col>

          <Row>
            <Col span={12}>
              <h4 className="route-title">{routeName}</h4>
              <div className="list-name-imp mt-0-5">
                <i
                  className={
                    isPrivate
                      ? "fas fa-user-lock color-g"
                      : "fas fa-globe-asia color-r"
                  }
                />
                {isPrivate ? "Private" : "Public"}
              </div>
              <div className="list-name-imp mt-0-5">
                <h4>
                  Comments :
                  <span>
                    <Tooltip placement="top" title={comments}>
                      <span>
                        <Icon className="commands-info" type="info-circle" />
                      </span>
                    </Tooltip>
                  </span>
                </h4>
              </div>
              <div>
                <h4>Routes :</h4>
                {legs.map((travelPath, key) => {
                  return (
                    <Fragment key={`startpath_${key}`}>
                      <div className="route-name">
                        <Icon type="swap" />
                        {travelPath.start_address}
                      </div>
                      {legs.length === key + 1 && (
                        <div className="route-name" key={`endpath_${key}`}>
                          <Icon type="swap" />
                          {travelPath.end_address}
                        </div>
                      )}
                    </Fragment>
                  );
                })}
              </div>

              <div className="mb-2">
                <br />
                <span className="route-title">Distance :</span>
                <Badge count={totalMiles} /> Miles
              </div>
            </Col>
            <Col span={12}>
              <div className="route-card-map">
                <RouteMap srclat={2} srclng={2} directions={directions} />
              </div>
            </Col>
          </Row>
        </Modal>
      </div>
    </Fragment>
  );
}
