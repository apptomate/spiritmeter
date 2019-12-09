import React, { Component } from "react";
import { Layout, Icon } from "antd";
const { Header } = Layout;
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
      </Header>
    );
  }
}
