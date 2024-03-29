import React, { Component, Fragment } from "react";
import { Layout } from "antd";
import { Route, Switch } from "react-router-dom";

//Admin Components
//Layout
import Sidebar from "./Sidebar/Index";

//Component
import Dashboard from "../Dashboard";
import Routes from "../Routes";
import Display from "../Display";
import Navbar from "./Navbar";
import Users from "../Users";
import ViewDisplay from "../Display/ViewDisplay";
import Unauthorized from "../Unauthorizrd";
import ViewRoute from "../Routes/ViewRoute";
import ViewUser from "../Users/ViewUser";

const { Content } = Layout;

export default class AdminLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
    this.toggleCollapse = this.toggleCollapse.bind(this);
  }
  //Toggle Collapse
  toggleCollapse = () => {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }));
  };
  render() {
    const { collapsed } = this.state;
    const {
      match: { url }
    } = this.props;

    return (
      <Layout>
        {/* Sidebar */}
        <Sidebar collapseFlag={collapsed} />
        {/* Sidebar */}
        <Layout className="layout-left">
          {/* Navbar */}
          <Navbar
            collapseFlag={collapsed}
            collapseToggleFunc={this.toggleCollapse}
          />
          {/* Navbar */}
          {/* Main Content */}
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: 280
            }}
          >
            <Fragment>
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path={url + "/dashboard"} component={Dashboard} />
                <Route exact path={url + "/display"} component={Display} />
                <Route
                  path={url + "/viewDisplay/:id"}
                  component={ViewDisplay}
                />
                <Route exact path={url + "/routes"} component={Routes} />
                <Route path={url + "/viewRoute/:id"} component={ViewRoute} />
                <Route exact path={url + "/users"} component={Users} />
                <Route path={url + "/viewUser/:id"} component={ViewUser} />
                <Route path="*" component={Unauthorized} />
              </Switch>
            </Fragment>
          </Content>
          {/* Main Content */}
        </Layout>
      </Layout>
    );
  }
}
