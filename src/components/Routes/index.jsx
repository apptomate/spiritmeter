import React, { Component } from "react";
import { List, Avatar, Icon, Spin } from "antd";
import { getAllListRoutes } from "../../Redux/_actions";
import { connect } from "react-redux";
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
          <div className='list-display' key={`list_${key}`}>
            <span className='color-g'>
              {element.isPrivate ? "Is Private" : "Public"}
            </span>
            <p>
              <Icon type='environment' /> {element.country} , {element.state} ,
              {element.cityName} , {element.address}
            </p>
            <p>{element.comments}</p>
            <div className='item-center list-username'>
              <Avatar icon='user' />
              <span>{element.designatedCharityName}</span>
            </div>
          </div>
        )
      });
    });

    return (
      <div>
        <div className='title-card'>
          <h4>Routes</h4>
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
    RoutesResponseData: state.getAllListRoutes
  };
};
export default connect(getState, {
  getAllListRoutes
})(Routes);
