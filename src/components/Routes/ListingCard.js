import React, { Fragment } from 'react';
import { Icon, Row, Col, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
// import MyMapComponent from '../Common/googleMap/Routing';
// import { DirectionsRenderer } from 'react-google-maps';
import RouteMap from '../Common/googleMap/RouteMap';

function ListingCard(props) {
  const { data } = props;
  const routeData = JSON.parse(data.path || null);
  console.log(routeData);
  return (
    <Fragment>
      <div className='route-list-card'>
        <Row>
          <Col span={12}>
            <div>
              <h4 className='route-title'>Route names</h4>
              <h4 className='route-title'>
                Cathedral of Saint Paul, St. Paul, Minnesota
              </h4>
              <div>
                <h4>
                  Commands :
                  <Tooltip title='prompt text'>
                    <span>
                      <Icon className='color-y' type='info-circle' />
                    </span>
                  </Tooltip>
                </h4>
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
              <Link to={'/admin/viewRoute/1'}>
                <button className='cus-btn f-r'>
                  <span className='circle'>
                    <span className='icon arrow'></span>
                  </span>
                  <span className='button-text'>View</span>
                </button>
              </Link>
            </div>
          </Col>
          <Col span={12}>
            <div className='route-card-map'>
              <RouteMap data={data} />
              {/* <MyMapComponent>
                {routeData && (
                  <DirectionsRenderer
                    directions={props.directions || routeData}
                  />
                )}
              </MyMapComponent> */}
            </div>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
}

export default ListingCard;
