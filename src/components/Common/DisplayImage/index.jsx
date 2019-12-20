import React from "react";
import DefaultPlace from "../../../assets/img/defaultPlace.png";
export default function DisplayImage(props) {
  const { srcPath = DefaultPlace, height = "100%" } = props;
  return <img className="w-100" height={height} alt="no data" src={srcPath} />;
}
