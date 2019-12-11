import React from "react";
import DefaultPlace from "../../../assets/img/defaultPlace.png";
export default function DisplayImage(props) {
  const { srcPath = DefaultPlace } = props;
  return <img alt='no data' src={srcPath} />;
}
