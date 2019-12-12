import React, { Fragment } from "react";
import { Modal, Tooltip, Icon, Col, Badge } from "antd";
import RouteMap from "../../Common/googleMap/RouteMap";
export default function RoutePreview(props) {
  const {
    toggleFlag,
    toggleFunc,
    previewData,
    routesData,
    directionsData
  } = props;
  let totalPaths = routesData.length;
  console.log("PR", previewData);
  let { routeName, comments, designatedCharityName, isPrivate } = previewData;
  return (
    <Fragment>
      <Modal
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
        <h4 className="route-title mt-0-5">{routeName}</h4>
        <div className="list-name-imp mt-0-5">
          <i
            className={
              isPrivate
                ? "fas fa-user-lock color-g"
                : "fas fa-globe-asia color-r"
            }
          />
          {isPrivate ? "Is Private" : "Is Public"}
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
          {routesData.map((travelPath, key) => {
            if (totalPaths === key + 1)
              return (
                <Fragment key={`path_${key}`}>
                  <div className="route-name">
                    <Icon type="swap" />
                    {travelPath.start_address}{" "}
                  </div>
                  <div className="route-name" key={`path_${key}`}>
                    <Icon type="swap" />
                    {travelPath.end_address}{" "}
                  </div>
                </Fragment>
              );
            else
              return (
                <div className="route-name" key={`path_${key}`}>
                  <Icon type="swap" /> {travelPath.start_address}{" "}
                </div>
              );
          })}
        </div>
        <div className="route-card-map">
          <RouteMap srclat={2} srclng={2} directions={directionsData} />
        </div>
        {/* <div className="mb-2">
                      <span className="route-title">Total Miles :</span>
                      <Badge count={totalMiles} />
                    </div> */}
      </Modal>
    </Fragment>
  );
}
