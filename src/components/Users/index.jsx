import React, { Component, Fragment } from "react";
import { getAllListUsers } from "../../Redux/_actions";
import { connect } from "react-redux";
import { List, Avatar, Icon, Spin, PageHeader, Row, Col } from "antd";
import { DefaultAvatar } from "../../Redux/_helpers/Constants";

class Users extends Component {
  componentDidMount() {
    this.props.getAllListUsers();
  }
  render() {
    const {
      UsersResponse: { data = [], loading }
    } = this.props;
    let dataToDisplay = [];
    // const defaultImg = DefaultAvatar();
    data.forEach((element, key) => {
      dataToDisplay.push({
        imgPath: element.profileImage,
        title: element.name,
        gender: element,
        content: (
          <Fragment key={key}>
            <span>
              <span className="color-g">{element.gender}</span>{" "}
              <Icon type="user" theme="filled" /> {element.role}
            </span>
            <div>
              <p>
                <Icon type="mobile" theme="twoTone" /> {element.phoneNumber}{" "}
                <br />
                <Icon type="environment" /> {element.country} , {element.state}{" "}
                , {element.cityName} , {element.address}
              </p>
              <div>
                <button className="cus-btn f-r mt--2">
                  <span className="circle">
                    <span className="icon arrow"></span>
                  </span>
                  <span className="button-text">View</span>
                </button>
              </div>
            </div>
          </Fragment>
        )
      });
    });

    return (
      <Fragment>
        <PageHeader
          style={{
            border: "1px solid rgb(235, 237, 240)"
          }}
          title="List of Users"
        />

        <Spin spinning={loading}>
          <List
            itemLayout="horizontal"
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
                <List.Item.Meta
                  avatar={
                    !item.imgPath ? (
                      <Avatar src={item.imgPath} />
                    ) : (
                      DefaultAvatar
                    )
                  }
                  title={<a href="#">{item.title}</a>}
                  description={item.content}
                />
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
    UsersResponse: state.getAllListUsers
  };
};
export default connect(getState, {
  getAllListUsers
})(Users);
