import React, { Fragment } from "react";
import { Modal, Icon, Avatar } from "antd";
import DisplayImage from "../../Common/DisplayImage";
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
    createdByName
  } = previewData;
  let filePathJson = previewData.filePath || "[]";
  let filePathParsed = JSON.parse(filePathJson);
  filePathParsed = filePathParsed.length ? filePathParsed[0].filePath : "";
  return (
    <Fragment>
      <Modal
        style={{ width: "80%" }}
        title="Display Preview"
        visible={toggleFlag}
        footer={null}
        onOk={toggleFunc}
        onCancel={toggleFunc}
      >
        <div>
          <DisplayImage srcPath={filePathParsed} />
        </div>

        <h4 className="list-name">{name}</h4>
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

        <div className="item-center list-username mt-2 d-block">
          <Avatar icon="user" />
          <span>{createdByName}</span>
        </div>
      </Modal>
    </Fragment>
  );
}
