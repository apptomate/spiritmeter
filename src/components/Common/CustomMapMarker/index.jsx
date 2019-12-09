import React from "react";
import { Icon } from "antd";
export default function CustomMapMarker(props) {
  const { text } = props;
  return (
    <div>
      <h1>
        <Icon type='environment' theme='twoTone' />
      </h1>
      {text}
    </div>
  );
}
