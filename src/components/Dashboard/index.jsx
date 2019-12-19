import React, { Component, Fragment } from "react";
import { Row, Col, Card, Avatar, Table, Spin, Empty, Badge } from "antd";
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
import { getDashboardData } from "../../Redux/_actions";
import { Link } from "react-router-dom";

const { Meta } = Card;

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
    render: count => <Badge count={count} />
  }
];

const routeColumns = [
  {
    title: "Route Name",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Charity",
    dataIndex: "charity",
    key: "charity"
  },
  {
    title: "Distance",
    dataIndex: "distance",
    key: "distance",
    align: "center"
  }
];

class Dashboard extends Component {
  componentDidMount() {
    this.props.getDashboardData();
  }
  render() {
    const {
      DashboardData: { data = {}, loading }
    } = this.props;
    const {
      userCount = 0,
      savedDisplays = 0,
      savedRoutes = 0,
      popularDisplay = [],
      userWithDisplay = [],
      userWithRoutes = []
    } = data;

    return (
      <Fragment>
        <Spin spinning={loading}>
          <Row className="mb-2">
            <Col span={8}>
              <Card
                className="card-shodow"
                style={{ width: 300, marginTop: 16 }}
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
                style={{ width: 300, marginTop: 16 }}
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
              <Card
                className="card-shodow"
                style={{ width: 300, marginTop: 16 }}
              >
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
                title="Popular Display"
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
                title="Popular Route"
                bordered={false}
              >
                <Table
                  columns={routeColumns}
                  pagination={{ pageSize: 5 }}
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
    DashboardData: state.getDashboardData
  };
};

export default connect(getState, { getDashboardData })(Dashboard);
