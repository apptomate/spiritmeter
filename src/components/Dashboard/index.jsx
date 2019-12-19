import React, { Component, Fragment } from "react";
import { Row, Col, Card, Avatar, Table, Spin } from "antd";
import { connect } from "react-redux";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { getDashboardData } from "../../Redux/_actions";

const { Meta } = Card;

const displayColumns = [
  {
    title: "Display Name",
    dataIndex: "name",
    key: "name"
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
    align: "center"
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

const chartData = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
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
      popularDisplay = []
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
                title="User Vs Routes"
                bordered={false}
              >
                <BarChart
                  width={400}
                  height={300}
                  data={chartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pv" stackId="a" fill="#f62d51" />
                  <Bar dataKey="uv" stackId="a" fill="#ffbc34" />
                </BarChart>
              </Card>
            </Col>
            <Col span={12} className="p-1">
              <Card
                className="card-shodow"
                title="User Vs Display"
                bordered={false}
              >
                <div style={{ width: "100%", height: 300 }}>
                  <ResponsiveContainer>
                    <BarChart
                      width={400}
                      height={300}
                      data={chartData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="pv" fill="#2962ff" />
                      <Bar dataKey="uv" fill="#36bea6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
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
                  rowKey={record => record.displayId}
                  pagination={{ pageSize: 5 }}
                />
              </Card>
            </Col>
            <Col span={12} className="p-1">
              <Card
                className="card-shodow"
                title="Popular Route"
                bordered={false}
              >
                <Table columns={routeColumns} />
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
