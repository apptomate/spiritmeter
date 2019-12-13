import React from "react";
import { Icon, Button } from "antd";
import { Link } from "react-router-dom";
export default function BackButton(props) {
  const { linkPath, linkText } = props;
  return (
    <Link to={linkPath}>
      <Button type="dashed " className="back-button">
        <Icon type="left" />
        {linkText}
      </Button>
    </Link>
  );
}
