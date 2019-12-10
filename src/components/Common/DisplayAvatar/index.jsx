import React from "react";
import { Avatar } from "antd";

export default function DisplayAvatar(props) {
  const { srcPath } = props;
  if (srcPath) return <Avatar src={srcPath} />;
  else return <Avatar icon='user' />;
}
