import React, { Fragment } from "react";

import { Avatar, Icon } from "antd";
import DisplayImage from "../../Common/DisplayImage";
import LinkButton from "../../Common/LinkButton";
export default function DisplayCard(props) {
  let { listData } = props;
  return (
    <Fragment>
      {listData.map((list, key) => {
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
          displayId,
          hideViewButton
        } = list;
        let filePathJson = list.filePath || "[]";
        let filePathParsed = JSON.parse(filePathJson);
        filePathParsed = filePathParsed.length
          ? filePathParsed[0].filePath
          : "";
        return (
          <div className="list-card" key={key}>
            <div className="list-img">
              <DisplayImage srcPath={filePathParsed} />
            </div>
            <div className="listing-contant">
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
              {!hideViewButton && (
                <LinkButton
                  linkPath={"/admin/viewDisplay/" + displayId}
                  linkText="View"
                />
              )}
            </div>
          </div>
        );
      })}
    </Fragment>
  );
}
