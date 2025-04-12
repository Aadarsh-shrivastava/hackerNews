import React from "react";
import Logo from "../../assets/hackernews.svg";
import "./Header.css";

export const Header = () => {
  return (
    <div className="header-container casts-shadow">
      <img src={Logo} />
    </div>
  );
};
