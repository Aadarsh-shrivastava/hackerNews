import React from "react";
import Logo from "../../assets/hackernews.svg";
import "./Header.css";

export const Header = () => {
  return (
    <a className="header-container casts-shadow" href="/">
      <img src={Logo} />
    </a>
  );
};
