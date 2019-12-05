import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import Logo from "../Logo";
import { Link } from "react-router-dom";

const { Sider } = Layout;

//Menu List

const menuList = [
  { icon: "dashboard", label: "Dashboard", path: "/admin/dashboard" },
  { icon: "unordered-list", label: "List of Display", path: "/admin/display" },
  { icon: "share-alt", label: "Routes", path: "/admin/routes" },
  { icon: "user", label: "Users", path: "/admin/users" }
];

export default class Sidebar extends Component {
  render() {
    const { collapseFlag } = this.props;
    return (
      <Sider trigger={null} collapsible collapsed={collapseFlag}>
        <Logo />
        <Menu theme='light' mode='inline' defaultSelectedKeys={["1"]}>
          {menuList.map((list, key) => (
            <Menu.Item key={key}>
              <Link to={list.path}>
                <Icon type={list.icon} />
                <span>{list.label}</span>
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    );
  }
}
