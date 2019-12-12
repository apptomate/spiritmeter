import React, { Component } from "react";
import { Layout, Icon, Button, Menu, Dropdown, Input } from "antd";
import {
  loggedUserDetails,
  logout
} from "../../../Redux/_service/AuthenticationService";

const { Header } = Layout;
const { Search } = Input;
const menu = (
  <Menu>
    <Menu.Item key="0">
      <a target="_blank" rel="noopener noreferrer" onClick={() => logout()}>
        Logout
      </a>
    </Menu.Item>
  </Menu>
);

//Signout Button
function SignoutButton() {
  const { firstName } = loggedUserDetails();
  return (
    <Dropdown className="logout-btn" overlay={menu}>
      <a className="ant-dropdown-link" href="#">
        <Icon type="user" />
        {firstName} <Icon type="down" />
      </a>
    </Dropdown>

    // <Button
    //
    //   type="default"
    //   shape="round"
    //   icon="logout"
    //   size="default"
    //   onClick={() => logout()}
    // >
    //   {firstName}
    // </Button>
  );
}

export default class Navbar extends Component {
  render() {
    const { collapseFlag, collapseToggleFunc } = this.props;
    return (
      <Header style={{ background: "#fff", padding: 0 }}>
        <Icon
          className="trigger pl-0-5"
          type={collapseFlag ? "menu-unfold" : "menu-fold"}
          onClick={collapseToggleFunc}
        />
        <Search
          className="ml-1"
          placeholder="search..."
          onSearch={value => console.log(value)}
          style={{ width: 200 }}
        />

        <SignoutButton />
      </Header>
    );
  }
}
