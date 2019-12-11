import React, { Component, Fragment } from "react";
import { List, Icon, Spin, PageHeader, Row, Col, Button, Tooltip } from "antd";
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
      let {
        routeName,
        isPrivate,
        designatedCharityName,
        comments,
        routeId
      } = element;
      let filePathJson = element.path || "[]";
      let filePathParsed = JSON.parse(filePathJson);
      let pathsToTravel = filePathParsed.routes[0].legs;
      let totalPaths = pathsToTravel.length;
      dataToDisplay.push({
        content: (
          <div className="route-list-card" key={key}>
            <Row>
              <Col className="route-maintitle" span={24}>
                <h3 className="route-name-h3">
                  {designatedCharityName}'s Travel Route
                </h3>
              </Col>
              <Col span={12}>
                <div>
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
                            <Icon
                              className="commands-info"
                              type="info-circle"
                            />
                          </span>
                        </Tooltip>
                      </span>
                    </h4>
                  </div>
                  <div>
                    <h4>Routes :</h4>
                    {pathsToTravel.map((travelPath, key) => {
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
                  <Link to={`/admin/viewRoute/${routeId}`}>
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

          // <div className="list-display" key={`list_${key}`}>
          //   <span className="color-g">
          //     {element.isPrivate ? "Is Private" : "Public"}
          //   </span>
          //   <p>
          //     <Icon type="environment" /> {element.country} , {element.state} ,
          //     {element.cityName} , {element.address}
          //   </p>
          //   <p>{element.comments}</p>
          //   <div className="item-center list-username">
          //     <Avatar icon="user" />
          //     <span>{element.designatedCharityName}</span>
          //   </div>
          // </div>
        )
      });
    });

    return (
      <Fragment>
        <PageHeader
          style={{
            border: "1px solid rgb(235, 237, 240)"
          }}
          title="List of Routes"
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

        {/* <Spin spinning={loading}>
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
        </Spin> */}
      </Fragment>
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
