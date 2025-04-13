import React from "react";
import logo from "../../assets/hackernews-footer.svg";
import "./Footer.css";

export const Footer = () => {
  return (
    <div className="footer-container">
      <img src={logo} data-testid="footer-logo" />
    </div>
  );
};
