import React from "react";
import { Icon, Button } from "antd";
import { Link } from "react-router-dom";
export default function BackButton(props) {
  const { linkPath, linkText } = props;
  return (
    <Link to={linkPath}>
      <Button type="primary" className="back-button" ghost>
        <Icon type="left" />
        {linkText}
      </Button>
    </Link>
  );
}
