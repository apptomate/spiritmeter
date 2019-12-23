import React from "react";
import logoimg from "../../../assets/img/logo.png";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <div className="logo">
      <Link to="/">
        <img className="w-100" src={logoimg} alt="no data" />
      </Link>
    </div>
  );
}
