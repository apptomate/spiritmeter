import React, { Component, Fragment } from 'react';
import { List, Spin, PageHeader } from 'antd';
import { getAllListRoutes } from '../../Redux/_actions';
import { connect } from 'react-redux';
import RouteCard from '../Common/RouteCard';
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
      dataToDisplay.push({
        content: <RouteCard key={key} data={element} />
      });
    });

    return (
      <Fragment>
        <PageHeader
          style={{
            border: '1px solid rgb(235, 237, 240)'
          }}
          title='List of Routes'
        />
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
    RoutesResponseData: state.getAllListRoutes
  };
};
export default connect(getState, {
  getAllListRoutes
})(Routes);
