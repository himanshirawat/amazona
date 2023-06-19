import React from "react";
import "./footer.css";
import logo from "../photo/logo.png";
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
    return (
        <footer id="footer">
            <div className="leftfooter ">
                <p><h4>ABOUT US</h4>The best and authenticate pahadi goods</p>
                <span></span>
                <p><h4>CONTACT US</h4>
                    <FacebookIcon />
                    <GoogleIcon />
                    <LinkedInIcon />
                    <GitHubIcon />                
                </p>
            </div>  
            <div className="midfooter ">
                <img src={logo} alt="logo" className="logo"/>
                <p>High Quality is our first priority</p>
                <p>Copyrights 2023 &copy; ecommerce</p>
            </div> 
            <div className="rightfooter ">
                 <h4>CONTRIBUTORS </h4>
                 <a href="https://www.linkedin.com/in/himanshi-rawat">Himanshi Rawat</a>
                 <a href="https://www.linkedin.com/in/himanshi-rawat">Atul Paswan</a>
                 <a href="https://www.linkedin.com/in/himanshi-rawat">Vikash Nautiyal</a>
                 <a href="https://www.linkedin.com/in/himanshi-rawat">Praveen Negi</a>

            </div>      
        </footer>
    );
};

export default Footer;