import React, { Component, Fragment } from "react";
import { Row, Col, Card, Avatar, Table, Spin, Empty, Tag } from "antd";
import { connect } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";
import { getDashboardData, getAllListRoutes } from "../../Redux/_actions";
import { Link } from "react-router-dom";
const { Meta } = Card;
const displayTableTitle = <Link to="/admin/display">Popular Display</Link>;
const routeTableTitle = <Link to="/admin/routes">Popular Route</Link>;
const COLORS = [
  "#E30022",
  "#FF8B00",
  "#F2B400",
  "#03C03C",
  "#1F75FE",
  "#431C53"
];
const displayColumns = [
  {
    title: "Display Name",
    dataIndex: "displayName",
    key: "displayName",
    render: (text, record) => (
      <Link
        to={{
          pathname: `/admin/viewDisplay/${record.displayId}`,
          state: { isRouteFromDashboard: true }
        }}
      >
        {record.name}
      </Link>
    )
  },
  {
    title: "Category",
    dataIndex: "categoryName",
    key: "categoryName"
  },
  {
    title: "Total Count",
    dataIndex: "count",
    key: "count",
    align: "center",
    render: count => <Tag color="#108ee9">{count}</Tag>
  }
];
const routeColumns = [
  {
    title: "Route Name",
    dataIndex: "routeName",
    key: "routeName",
    render: (text, record) => (
      <Link
        to={{
          pathname: `/admin/viewRoute/${record.routeId}`,
          state: { isRouteFromDashboard: true }
        }}
      >
        {record.routeName}
      </Link>
    )
  },
  {
    title: "Charity",
    dataIndex: "designatedCharityName",
    key: "designatedCharityName"
  },
  {
    title: "Distance",
    dataIndex: "totalMiles",
    key: "totalMiles",
    align: "center",
    render: distance => <Tag color="purple">{distance}</Tag>
  }
];
class Dashboard extends Component {
  componentDidMount() {
    this.props.getDashboardData();
    this.props.getAllListRoutes();
  }
  render() {
    let {
      DashboardData: { data = {}, loading },
      RoutesResponseData = []
    } = this.props;
    const {
      userCount = 0,
      savedDisplays = 0,
      savedRoutes = 0,
      popularDisplay = [],
      userWithDisplay = [],
      userWithRoutes = []
    } = data;
    if (RoutesResponseData && RoutesResponseData.length) {
      RoutesResponseData = RoutesResponseData.slice(-10);
    }
    return (
      <Fragment>
        <Spin spinning={loading}>
          <Row className="mb-1 p-1">
            <Col span={8}>
              <Card
                className="card-shodow"
                style={{ width: 400, marginTop: 16 }}
              >
                <Meta
                  avatar={
                    <Avatar
                      className="bg-info"
                      shape="square"
                      size={64}
                      icon="user"
                    />
                  }
                  title="User Count"
                  description={userCount}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card
                className="card-shodow"
                style={{ width: 400, marginTop: 16 }}
              >
                <Meta
                  avatar={
                    <Avatar
                      className="bg-warning"
                      shape="square"
                      size={64}
                      icon="home"
                    />
                  }
                  title="Display Count"
                  description={savedDisplays}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card className="card-shodow" style={{ marginTop: 16 }}>
                <Meta
                  avatar={
                    <Avatar
                      className="bg-danger"
                      shape="square"
                      size={64}
                      icon="environment"
                    />
                  }
                  title="Route Count"
                  description={savedRoutes}
                />
              </Card>
            </Col>
          </Row>
          <Row>
            <Col span={12} className="p-1">
              <Card
                className="card-shodow"
                title="User Vs Display"
                bordered={false}
              >
                {userWithDisplay && userWithDisplay.length ? (
                  <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                      <BarChart data={userWithDisplay}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="savedDisplays" name="Saved Display">
                          {userWithDisplay.map((list, key) => (
                            <Cell
                              key={`display-${key}`}
                              fill={COLORS[key % COLORS.length]}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <Empty />
                )}
              </Card>
            </Col>
            <Col span={12} className="p-1">
              <Card
                className="card-shodow"
                title="User Vs Routes"
                bordered={false}
              >
                {userWithRoutes && userWithRoutes.length ? (
                  <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                      <BarChart data={userWithRoutes}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="savedRoutes" name="Saved Routes">
                          {userWithRoutes.map((list, key) => (
                            <Cell
                              key={`route-${key}`}
                              fill={COLORS[key % COLORS.length]}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <Empty />
                )}
              </Card>
            </Col>
          </Row>
          <Row>
            <Col span={12} className="p-1">
              <Card
                className="card-shodow"
                title={displayTableTitle}
                bordered={false}
              >
                <Table
                  columns={displayColumns}
                  dataSource={popularDisplay}
                  rowKey={record => `display_${record.displayId}`}
                  pagination={{ pageSize: 5 }}
                  //pagination={{ pageSize: 100 }} scroll={{ y: 240 }}
                  //loading={loading}
                />
              </Card>
            </Col>
            <Col span={12} className="p-1">
              <Card
                className="card-shodow"
                title={routeTableTitle}
                bordered={false}
              >
                <Table
                  columns={routeColumns}
                  dataSource={RoutesResponseData}
                  pagination={{ pageSize: 5 }}
                  rowKey={record => `route_${record.routeId}`}
                  //loading={loading}
                />
              </Card>
            </Col>
          </Row>
        </Spin>
      </Fragment>
    );
  }
}
const getState = state => {
  return {
    DashboardData: state.getDashboardData,
    RoutesResponseData: state.getAllListRoutes.data
  };
};
export default connect(getState, { getDashboardData, getAllListRoutes })(
  Dashboard
);
