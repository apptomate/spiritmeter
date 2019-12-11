import React, { Component } from "react";
import { Layout, Icon, Button } from "antd";
import {
  loggedUserDetails,
  logout
} from "../../../Redux/_service/AuthenticationService";

const { Header } = Layout;

//Signout Button
function SignoutButton() {
  const { firstName } = loggedUserDetails();
  return (
    <Button
      type='default'
      shape='round'
      icon='logout'
      size='default'
      onClick={() => logout()}
    >
      {firstName}
    </Button>
  );
}

export default class Navbar extends Component {
  render() {
    const { collapseFlag, collapseToggleFunc } = this.props;
    return (
      <Header style={{ background: "#fff", padding: 0 }}>
        <Icon
          className='trigger'
          type={collapseFlag ? "menu-unfold" : "menu-fold"}
          onClick={collapseToggleFunc}
        />
        <SignoutButton />
      </Header>
    );
  }
}
