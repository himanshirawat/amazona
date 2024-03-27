import React from "react";
import "./footer.css";
import logo from "../photo/logo.png";
import PinterestIcon from "@mui/icons-material/Pinterest";
import GoogleIcon from "@mui/icons-material/Google";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftfooter ">
        {/* <p><h4>ABOUT US</h4>The best and authenticate pahadi goods</p> */}
        <span></span>
        <h4>Contact Us</h4>
        <div style={{ display: "flex", gap: "10px" }}>
          <a href={"https://in.pinterest.com/himanshikarawat/"} style={{ textDecoration: "none", color: "black" }}>
            <PinterestIcon />
          </a>
          <a href={"https://e-commerce-6g18.onrender.com/"} style={{ textDecoration: "none", color: "black" }}>
            <GoogleIcon />
          </a>
          <a href={"https://www.linkedin.com/in/himanshi-rawat/"} style={{ textDecoration: "none", color: "black" }}>
            <LinkedInIcon />
          </a>
          <a href={"https://github.com/himanshirawat"} style={{ textDecoration: "none", color: "black" }}>
            <GitHubIcon />
          </a>
        </div>
      </div>
      <div className="midfooter ">
        <img src={logo} alt="logo" className="logooo" />
        <p>High Quality is our first priority</p>
        <p style={{ fontWeight: "lighter", fontSize: "14px" }}>
          Copyrights 2023 &copy; ecommerce
        </p>
      </div>
      <div className="rightfooter ">
        <h4>Developed By </h4>
        <a href="https://www.linkedin.com/in/himanshi-rawat">
          Himanshika Rawat
        </a>
      </div>
    </footer>
  );
};

export default Footer;
