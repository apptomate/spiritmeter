import React, { Component } from "react";
import { List, Avatar, Icon, Spin, Card, Button } from "antd";
import { getAllListDisplay } from "../../Redux/_actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
      let filePathJson = element.filePath || "[]";
      let filePathParsed = JSON.parse(filePathJson);
      filePathParsed = filePathParsed.length ? filePathParsed[0].filePath : "";
      dataToDisplay.push({
        //href: "#",
        title: element.name,
        filePath: filePathParsed,
        content: (
          <div className="list-display" key={`list_${key}`}>
            <span>
              <Icon type="home" theme="filled" /> {element.categoryName}
            </span>
            <span>
              <i className="fas fa-hand-holding-heart color-o"></i>{" "}
              {element.type}{" "}
            </span>
            <span className="color-g">
              {element.isPrivate ? "Is Private" : "Public"}
            </span>
            <p>
              <Icon type="environment" /> {element.country} , {element.state} ,{" "}
              {element.cityName} , {element.address}
            </p>
            <div className="item-center list-username">
              <Avatar icon="user" />
              <span>{element.createdByName}</span>
              <span>
                <Link to={"/admin/viewDisplay/" + element.displayId}>View</Link>
              </span>
            </div>
          </div>
        )
      });
    });

    return (
      <div>
        <div className="title-card">
          <h4>List of Display</h4>
        </div>

        <div className="list-card">
          <div className="list-img">
            <img
              alt="example"
              src="https://images.unsplash.com/photo-1508985307703-52d13b2b06b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
            />
          </div>
          <div className="listing-contant">
            <h4 className="list-name">
              Cathedral of Saint Paul, St. Paul, Minnesota
            </h4>
            <div className="list-name-imp">
              <Icon type="home" /> Home
            </div>
            <div className="list-name-imp">
              <Icon type="radar-chart" /> Charity
            </div>

            <div className="list-name-imp">
              <Icon type="environment" /> United States , Texas , Houston ,
              Apartment1
            </div>

            <div className="list-name-imp">
              <i className="fas fa-user-lock color-g"></i> Is Private /{" "}
              <i class="fas fa-globe-asia color-r"></i>Is Public
            </div>

            <div className="item-center list-username mt-2">
              <Avatar icon="user" />
              <span>User Name</span>
              <span>
                {/* <Link to={"/admin/viewDisplay/" + element.displayId}>View</Link> */}
              </span>
              {/* <Button className="ml-a" type="warning">View</Button> */}
              <button className="cus-btn ml-a">
                <span className="circle">
                  <span className="icon arrow"></span>
                </span>
                <span className="button-text">View</span>
              </button>
            </div>
          </div>
        </div>

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
              <List.Item
                key={item.title}
                extra={<img width={272} alt="logo" src={item.filePath} />}
              >
                <List.Item.Meta title={<a href={item.href}>{item.title}</a>} />
                {item.content}
              </List.Item>
            )}
          />
        </Spin>
      </div>
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
