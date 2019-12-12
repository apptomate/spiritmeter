import React, { Component, Fragment } from 'react';
import { Tabs, Row, Col, Spin, Icon, Avatar } from 'antd';
import { getDisplayDetails } from '../../../Redux/_actions';
import { connect } from 'react-redux';

import GoogleMapReact from 'google-map-react';
import CustomMapMarker from '../../Common/CustomMapMarker';
import DisplaySlider from '../../Common/DisplaySlider';
import MarkerMap from '../../Common/googleMap/MarkerMap';

const GOOGLE_MAP_API_KEY =
  'AIzaSyCSTfXlm6bBFV5-o5RawVMKvhOd4foWnw4' || process.env.GOOGLE_MAP_API_KEY;

const { TabPane } = Tabs;

class ViewDisplay extends Component {
  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    this.props.getDisplayDetails(id);
  }
  render() {
    const DisplayDetails = this.props.DisplayDetails.data || '{}';
    const { loading } = this.props.DisplayDetails;
    let {
      name,
      categoryName,
      type,
      isPrivate,
      createdByName,
      country,
      state,
      cityName,
      address,
      filePath,
      routes,
      latitude,
      longitude,
      notes
    } = DisplayDetails;
    let routesData = routes || '[]';
    let parsedRoutes = JSON.parse(routesData);
    parsedRoutes = parsedRoutes[0] || {};

    let defaultCenter = {};
    if (latitude && longitude) {
      latitude = parseFloat(latitude);
      longitude = parseFloat(longitude);
      defaultCenter = {
        lat: latitude,
        lng: longitude
      };
    }
    const defaultZoom = 15;

    return (
      <Fragment>
        <Spin spinning={loading}>
          <Tabs defaultActiveKey='1'>
            <TabPane tab='Display Details' key='1'>
              <Row>
                <Col span={12}>
                  <div>
                    <h4 className='list-name'>{categoryName}</h4>
                    <div className='list-name-imp'>
                      <Icon type='home' /> {categoryName}
                    </div>
                    <div className='list-name-imp'>
                      <Icon type='radar-chart' /> {type}
                    </div>

                    <div className='list-name-imp'>
                      <Icon type='environment' /> {country}
                      {state && ` , ${state}`}
                      {cityName && ` , ${cityName}`}
                      {address && ` , ${address}`}
                    </div>

                    <div className='list-name-imp'>
                      <i
                        className={
                          isPrivate
                            ? 'fas fa-user-lock color-g'
                            : 'fas fa-globe-asia color-r'
                        }
                      />
                      {isPrivate ? 'Is Private' : 'Is Public'}
                    </div>

                    <p className='mt-1'>
                      <h4>Note :</h4>
                      {notes}
                    </p>

                    <div className='item-center list-username mt-2'>
                      <Avatar icon='user' />
                      <span>{createdByName}</span>
                      <span>
                        {/* <Link to={"/admin/viewDisplay/" + element.displayId}>View</Link> */}
                      </span>
                    </div>
                  </div>
                </Col>
                <Col span={12}>
                  {filePath && <DisplaySlider srcPaths={filePath} />}
                </Col>
              </Row>
              <Row>
                <Col className='mt-2'>
                  <div className='listing-map-div my-card'>
                    <MarkerMap lat={latitude} lng={longitude} />
                  </div>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab='Maping Routes' key='2'>
              <div className='route-card'>
                <Row>
                  <Col className='route-maintitle' span={24}>
                    <h3 className='route-name-h3'>'s Travel Route</h3>
                  </Col>
                  <Col span={12}>
                    <div>
                      <h4 className='route-title'>Route names</h4>
                      <h4 className='route-title'>
                        Cathedral of Saint Paul, St. Paul, Minnesota
                      </h4>
                      <div className='item-center list-username mt-1 mb-1'>
                        <Avatar icon='user' />
                        <span>User Name</span>
                      </div>
                      <div>
                        <h4>Routes :</h4>
                        <div className='route-name'>
                          <Icon type='swap' />
                          Oklahoma City
                        </div>

                        <div className='route-name'>
                          <Icon type='swap' />
                          Lake Aluma
                        </div>

                        <div className='route-name'>
                          <Icon type='swap' />
                          Forest Park
                        </div>

                        <div className='route-name'>
                          <Icon type='swap' />
                          McLoud
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className='route-card-map'>
                      <img
                        src='https://miro.medium.com/max/5334/1*qYUvh-EtES8dtgKiBRiLsA.png'
                        alt='no data'
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </TabPane>
          </Tabs>
        </Spin>
      </Fragment>
    );
  }
}

const getState = state => {
  return {
    DisplayDetails: state.getDisplayDetails
  };
};

export default connect(getState, {
  getDisplayDetails
})(ViewDisplay);
