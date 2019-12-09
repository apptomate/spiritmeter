import React, { Component, Fragment } from "react";
import { getAllListUsers } from "../../Redux/_actions";
import { connect } from "react-redux";
import { List, Avatar, Icon, Spin } from "antd";
import { defaultAvatar } from "../../Redux/_helpers/Constants";

class Users extends Component {
  componentDidMount() {
    this.props.getAllListUsers();
  }
  render() {
    const {
      UsersResponse: { data = [], loading }
    } = this.props;
    let dataToDisplay = [];
    const defaultImg = defaultAvatar();
    data.forEach((element, key) => {
      dataToDisplay.push({
        imgPath: element.profileImage,
        title: element.name,
        gender: element,
        content: (
          <Fragment key={key}>
            <span>
              <span className='color-g'>{element.gender}</span>{" "}
              <Icon type='user' theme='filled' /> {element.role}
            </span>
            <p>
              <Icon type='mobile' theme='twoTone' /> {element.phoneNumber}{" "}
              <br />
              <Icon type='environment' /> {element.country} , {element.state} ,{" "}
              {element.cityName} , {element.address}
            </p>
          </Fragment>
        )
      });
    });

    return (
      <Fragment>
        <div className='title-card'>
          <h4>Users</h4>
        </div>
        <Spin spinning={loading}>
          <List
            itemLayout='horizontal'
            size='large'
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
                    item.imgPath ? <Avatar src={item.imgPath} /> : defaultImg
                  }
                  title={<a href='#'>{item.title}</a>}
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
