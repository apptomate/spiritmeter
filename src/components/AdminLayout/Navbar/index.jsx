import React, { Component } from "react";
import { Layout, Icon, Menu, Dropdown, Input, Button } from "antd";
import {
  loggedUserDetails,
  logout
} from "../../../Redux/_service/AuthenticationService";

const { Header } = Layout;
const { Search } = Input;
const menu = (
  <Menu>
    <Menu.Item key="0">
      <Button
        type="link"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => logout()}
      >
        Logout
      </Button>
    </Menu.Item>
  </Menu>
);

//Signout Button
function SignoutButton() {
  const { firstName } = loggedUserDetails();
  return (
    <Dropdown className="logout-btn" overlay={menu}>
      <Button type="link" className="ant-dropdown-link">
        <Icon type="user" />
        {firstName} <Icon type="down" />
      </Button>
    </Dropdown>
  );
}

export default class Navbar extends Component {
  render() {
    return (
      <Header style={{ background: "#fff", padding: 0 }}>
        {/* <Icon
          className="trigger pl-0-5"
          type={collapseFlag ? "menu-unfold" : "menu-fold"}
          onClick={collapseToggleFunc}
        /> */}
        <Search
          className="ml-1"
          placeholder="Search..."
          style={{ width: 200 }}
        />
        <SignoutButton />
      </Header>
    );
  }
}
