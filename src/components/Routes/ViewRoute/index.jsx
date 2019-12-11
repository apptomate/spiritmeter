import React, { Component, Fragment } from "react";
import { Tabs, Spin, Tag, Icon, Badge, Avatar } from "antd";
import { getRouteDetails } from "../../../Redux/_actions";
import { connect } from "react-redux";

const { TabPane } = Tabs;

class ViewRoute extends Component {
  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    if (id) {
      let routeParam = { routeId: id };
      this.props.getRouteDetails(routeParam);
    }
  }
  render() {
    const RouteDetails = this.props.RouteDetails.data || "{}";
    const { loading } = this.props.RouteDetails;

    return (
      <Fragment>
        <Spin spinning={loading}>
          <Tabs defaultActiveKey='1'>
            <TabPane tab='Routes' key='1'>
              <div className='routes'>
                <div className='mb-2 mt-1'>
                  <span className='route-title'>Route Name :</span>
                  <Tag color='red'>
                    Lorem Ipsum - All the facts - Lipsum generator
                  </Tag>
                </div>
                <div className='mb-2'>
                  <span className='route-title'>Map Points :</span>
                  <div className='route-map'>
                    <img
                      className='w-100'
                      src='https://unitednewsdesk.com/wp-content/uploads/2019/02/Wired.jpg'
                    />
                  </div>
                </div>

                <div className='mb-2'>
                  <span className='route-title'>Map Routes Names :</span>
                  <div className='mt-1 route-list'>
                    <Icon type='right-square' />{" "}
                    <Tag color='blue'> New York</Tag>
                    <Icon type='swap' />
                    <Tag color='blue'>California</Tag>
                    <Icon type='swap' />
                    <Tag color='blue'>Illinois</Tag>
                    <Icon type='swap' />
                    <Tag color='blue'>Pennsylvania</Tag>
                    <Icon type='swap' />
                    <Tag color='blue'>North Carolina</Tag>
                    <Icon type='left-square' />
                  </div>
                </div>

                <div className='mb-2'>
                  <span className='route-title'>Total Miles :</span>
                  <Badge count={25} />
                </div>
              </div>
            </TabPane>
            <TabPane tab='Display List' key='2'>
              <div className='p-1'>
                <div className='list-card mb-1'>
                  <div className='list-img'>
                    <img
                      alt='example'
                      src='https://images.unsplash.com/photo-1508985307703-52d13b2b06b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
                    />
                  </div>
                  <div className='listing-contant'>
                    <h4 className='list-name'>
                      Cathedral of Saint Paul, St. Paul, Minnesota
                    </h4>
                    <div className='list-name-imp'>
                      <Icon type='home' /> Home
                    </div>
                    <div className='list-name-imp'>
                      <Icon type='radar-chart' /> Charity
                    </div>

                    <div className='list-name-imp'>
                      <Icon type='environment' /> United States , Texas ,
                      Houston , Apartment1
                    </div>

                    <div className='list-name-imp'>
                      <i className='fas fa-user-lock color-g'></i> Is Private /{" "}
                      <i class='fas fa-globe-asia color-r'></i>Is Public
                    </div>

                    <div className='item-center list-username mt-2'>
                      <Avatar icon='user' />
                      <span>User Name</span>
                      <span>
                        {/* <Link to={"/admin/viewDisplay/" + element.displayId}>View</Link> */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane tab='Near By' key='3'>
              Tab3
            </TabPane>
          </Tabs>
        </Spin>
      </Fragment>
    );
  }
}

const getState = state => {
  return {
    RouteDetails: state.getRouteDetails
  };
};

export default connect(getState, {
  getRouteDetails
})(ViewRoute);
