import React, { Component, Fragment } from "react";
import { Tabs, Descriptions, Card, Row, Col, Spin } from "antd";
import { getDisplayDetails } from "../../../Redux/_actions";
import { connect } from "react-redux";
import { defaultPlace } from "../../../Redux/_helpers/Constants";
const { TabPane } = Tabs;
const { Meta } = Card;

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
    const DisplayDetails = this.props.DisplayDetails.data || "{}";
    const { loading } = this.props.DisplayDetails;
    console.log(loading);
    let {
      name,
      categoryName,
      type,
      isPrivate,
      createdByName,
      createdDate,
      country,
      state,
      cityName,
      address,
      filePath
    } = DisplayDetails;
    //console.log(filePath);
    const imgPath = filePath ? filePath[0].FilePath : "";
    //const imgPath = "";
    return (
      <Fragment>
        <Spin spinning={loading}>
          <Tabs defaultActiveKey='1'>
            <TabPane tab='Display Details' key='1'>
              <Row>
                <Col span={18}>
                  <Descriptions title='Display Info'>
                    <Descriptions.Item label='Name'>{name}</Descriptions.Item>
                    <Descriptions.Item label='Category Name'>
                      {categoryName}
                    </Descriptions.Item>
                    <Descriptions.Item label='Type'>{type}</Descriptions.Item>
                    <Descriptions.Item label='is Private'>
                      {isPrivate ? "Private" : "Public"}
                    </Descriptions.Item>
                    <Descriptions.Item label='Created By'>
                      {createdByName}
                    </Descriptions.Item>
                    <Descriptions.Item label='Created Date'>
                      {createdDate}
                    </Descriptions.Item>
                    <Descriptions.Item label='Address'>
                      {country}
                      {state && ` , ${state}`}
                      {cityName && ` , ${cityName}`}
                      {address && ` , ${address}`}
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
                <Col span={6}>
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt='example' src={imgPath || defaultPlace} />}
                  ></Card>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab='Maping Routes' key='2'>
              <Card
                hoverable
                style={{ width: 200 }}
                cover={
                  <img
                    style={{ width: 200, height: 200 }}
                    alt='example'
                    src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                  />
                }
              >
                <Meta
                  title='Europe Street beat'
                  description='www.instagram.com'
                />
              </Card>
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
