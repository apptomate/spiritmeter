import React, { Component, Fragment } from "react";
import { List, Avatar, Icon, Spin, PageHeader } from "antd";
import { getAllListDisplay } from "../../Redux/_actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import DisplayImage from "../Common/DisplayImage";

class Display extends Component {
  componentDidMount() {
    this.props.getAllListDisplay();
  }
  render() {
    const {
      DisplayResponseData: { data = [], loading }
    } = this.props;
    let dataToDisplay = [];
    data.forEach((element, key) => {
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
      } = element;
      let filePathJson = element.filePath || "[]";
      let filePathParsed = JSON.parse(filePathJson);
      filePathParsed = filePathParsed.length ? filePathParsed[0].filePath : "";
      dataToDisplay.push({
        content: (
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
              <Link
                className="f-r mt--2"
                to={"/admin/viewDisplay/" + displayId}
              >
                <button className="cus-btn ml-a">
                  <span className="circle">
                    <span className="icon arrow"></span>
                  </span>
                  <span className="button-text">View</span>
                </button>
              </Link>
            </div>
          </div>
        )
      });
    });

    return (
      <Fragment>
        <PageHeader
          style={{
            border: "1px solid rgb(235, 237, 240)"
          }}
          title="List of Display"
        />
        <Spin spinning={loading}>
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: page => {
                console.log(page);
              },
              pageSize: 5
            }}
            dataSource={dataToDisplay}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta />
                {item.content}
              </List.Item>
            )}
          />
        </Spin>
      </Fragment>
    );
  }
}

const getState = state => {
  return {
    DisplayResponseData: state.getAllListDisplay
  };
};

export default connect(getState, {
  getAllListDisplay
})(Display);
