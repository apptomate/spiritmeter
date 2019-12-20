import React, { Fragment, Component } from "react";
import { Avatar, Icon, Button } from "antd";
import DisplayImage from "../../Common/DisplayImage";
import LinkButton from "../../Common/LinkButton";
import DisplayPreview from "../DisplayPreview";
export default class DisplayCard extends Component {
  state = {
    toggleFlag: false
  };
  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
  }
  //Modal Toggle
  toggleModal() {
    this.setState(prevState => ({
      toggleFlag: !prevState.toggleFlag
    }));
  }
  render() {
    let { listData, showPreviewModal } = this.props;
    let { toggleFlag } = this.state;
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
      displayId
    } = listData;
    let filePathJson = listData.filePath || "[]";
    let filePathParsed = JSON.parse(filePathJson);
    filePathParsed = filePathParsed.length ? filePathParsed[0].filePath : "";
    const location_address = `${country}${state && ` , ${state}`}${cityName &&
      ` , ${cityName}`}${address && ` , ${address}`}`;
    return (
      <Fragment>
        <div className="list-card">
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
            {showPreviewModal ? (
              <Fragment>
                <Button className="f-r mt--2 mr-2" onClick={this.toggleModal}>
                  Preview
                </Button>
                <DisplayPreview
                  toggleFlag={toggleFlag}
                  toggleFunc={this.toggleModal}
                  previewData={listData}
                />
              </Fragment>
            ) : (
              <LinkButton
                linkPath={`/admin/viewDisplay/${displayId}`}
                linkText="View"
              />
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}
