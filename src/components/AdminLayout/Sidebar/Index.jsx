import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import Logo from "../Logo";
import { Link } from "react-router-dom";

const { Sider } = Layout;

//Menu List
const menuList = [
  {
    menuKey: "dashboard",
    icon: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard"
  },
  {
    menuKey: "display",
    icon: "unordered-list",
    label: "List of Display",
    path: "/admin/display"
  },
  {
    menuKey: "routes",
    icon: "share-alt",
    label: "Routes",
    path: "/admin/routes"
  },
  {
    menuKey: "users",
    icon: "user",
    label: "Users",
    path: "/admin/users"
  }
];

export default class Sidebar extends Component {
  render() {
    const { collapseFlag } = this.props;
    console.log(this.props);
    return (
      <Sider trigger={null} collapsible collapsed={collapseFlag}>
        <Logo />
        <Menu theme='light' mode='inline' defaultSelectedKeys='dashboard'>
          {menuList.map(list => (
            <Menu.Item key={list.menuKey}>
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
