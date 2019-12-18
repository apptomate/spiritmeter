import React, { Component, Fragment } from "react";

import { Row, Col, Card, Skeleton, Switch, Icon, Avatar } from "antd";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const { Meta } = Card;

const data = [
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
  render() {
    return (
      <Fragment>
        <Row className="mb-2">
          <Col span={8}>
            <Card className="card-shodow" style={{ width: 300, marginTop: 16 }}>
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
                description="00"
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card className="card-shodow" style={{ width: 300, marginTop: 16 }}>
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
                description="00"
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card className="card-shodow" style={{ width: 300, marginTop: 16 }}>
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
                description="00"
              />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={12} className="p-1">
            <Card
              className="card-shodow"
              title="User and User Created Routes"
              bordered={false}
            >
              <BarChart
                width={400}
                height={300}
                data={data}
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
              title="User and User Created Display"
              bordered={false}
            >
              <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                  <BarChart
                    width={400}
                    height={300}
                    data={data}
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
              Table
            </Card>
          </Col>
          <Col span={12} className="p-1">
            <Card
              className="card-shodow"
              title="Popular Route"
              bordered={false}
            >
              Table
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default Dashboard;
