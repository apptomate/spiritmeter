import React, { Component } from "react";
import { List, Avatar, Icon, Spin, PageHeader, Row, Col, Tooltip } from "antd";
import { getAllListRoutes } from "../../Redux/_actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class Routes extends Component {
  componentDidMount() {
    this.props.getAllListRoutes();
  }
  render() {
    const {
      RoutesResponseData: { data = [], loading }
    } = this.props;
    let dataToDisplay = [];
    data.forEach((element, key) => {
      let filePathJson = element.path || "[]";
      let filePathParsed = JSON.parse(filePathJson);
      filePathParsed = filePathParsed.length ? filePathParsed[0].filePath : "";
      dataToDisplay.push({
        //href: "#",
        title: element.routeName,
        filePath: filePathParsed,
        content: (
          <div className="list-display" key={`list_${key}`}>
            <span className="color-g">
              {element.isPrivate ? "Is Private" : "Public"}
            </span>
            <p>
              <Icon type="environment" /> {element.country} , {element.state} ,
              {element.cityName} , {element.address}
            </p>
            <p>{element.comments}</p>
            <div className="item-center list-username">
              <Avatar icon="user" />
              <span>{element.designatedCharityName}</span>
            </div>
          </div>
        )
      });
    });

    return (
      <div>
        <PageHeader
          style={{
            border: "1px solid rgb(235, 237, 240)"
          }}
          title="List of Routes"
        />

        <div className="route-list-card">
          <Row>
            <Col span={12}>
              <div>
                <h4 className="route-title">Route names</h4>
                <h4 className="route-title">
                  Cathedral of Saint Paul, St. Paul, Minnesota
                </h4>
                <div>
                  <h4>
                    Commands :
                    <Tooltip title="prompt text">
                      <span>
                        {" "}
                        <Icon className="color-y" type="info-circle" />
                      </span>
                    </Tooltip>
                  </h4>
                </div>
                <div>
                  <h4>Routes :</h4>
                  <div className="route-name">
                    <Icon type="swap" />
                    Oklahoma City
                  </div>

                  <div className="route-name">
                    <Icon type="swap" />
                    Lake Aluma
                  </div>

                  <div className="route-name">
                    <Icon type="swap" />
                    Forest Park
                  </div>

                  <div className="route-name">
                    <Icon type="swap" />
                    McLoud
                  </div>
                </div>
                <Link to={"/admin/viewRoute/1"}>
                  <button className="cus-btn f-r">
                    <span className="circle">
                      <span className="icon arrow"></span>
                    </span>
                    <span className="button-text">View</span>
                  </button>
                </Link>
              </div>
            </Col>
            <Col span={12}>
              <div className="route-card-map">
                <img src="https://miro.medium.com/max/5334/1*qYUvh-EtES8dtgKiBRiLsA.png" />
              </div>
            </Col>
          </Row>
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
    RoutesResponseData: state.getAllListRoutes
  };
};
export default connect(getState, {
  getAllListRoutes
})(Routes);
