import React, { Component, Fragment } from "react";
import { List, Avatar, Icon, Spin } from "antd";
import { getAllListDisplay } from "../../Redux/_actions";
import { connect } from "react-redux";

class Display extends Component {
  componentDidMount() {
    this.props.getAllListDisplay();
  }
  render() {
    const {
      DisplayResponseData: { data = [], loading = true }
    } = this.props;
    let dataToDisplay = [];
    data.forEach((element, key) => {
      let filePathJson = element.filePath || "[]";
      let filePathParsed = JSON.parse(filePathJson);
      filePathParsed = filePathParsed.length ? filePathParsed[0].filePath : "";
      dataToDisplay.push({
        href: "http://ant.design",
        title: "element.name",
        filePath: filePathParsed,
        content: (
          <div className='list-display' key={`list_${key}`}>
            <span>
              <Icon type='home' theme='filled' /> {element.categoryName}
            </span>
            <span>
              <i className='fas fa-hand-holding-heart color-o'></i>{" "}
              {element.type}{" "}
            </span>
            <span className='color-g'>
              {element.isPrivate ? "Is Private" : "Public"}
            </span>
            <p>
              <Icon type='environment' /> {element.country} , {element.state} ,{" "}
              {element.cityName} , {element.address}
            </p>
            <div className='item-center list-username'>
              <Avatar icon='user' />
              <span>{element.createdName}</span>
            </div>
          </div>
        )
      });
    });

    return (
      <div>
        <div className='title-card'>
          <h4>List of Display</h4>
        </div>
        <Spin spinning={loading}>
          <List
            itemLayout='vertical'
            size='large'
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
                extra={<img width={272} alt='logo' src={item.filePath} />}
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
