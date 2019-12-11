import React from "react";
import { Link } from "react-router-dom";
export default function LinkButton(props) {
  const { linkPath, linkText } = props;
  return (
    <Link className="f-r mt--2" to={linkPath}>
      <button className="cus-btn ml-a">
        <span className="circle">
          <span className="icon arrow"></span>
        </span>
        <span className="button-text">{linkText}</span>
      </button>
    </Link>
  );
}
