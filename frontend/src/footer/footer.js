import React from "react";
import "./footer.css";

const Footer = () => {
    return (
        <footer id="footer">
            <div className="leftfooter ">
                <h4>About Us</h4>
                <p>We are the Final Year Students of Institute of Technology Gopeshwar pursuing Computer science Engineering. This Website is about Online Ecommerce System represents our Web development skills. </p>
            </div>  
            <div className="midfooter">
                <h1>ecommerce</h1>
                <p>High Quality is our first priority</p>
                <p>Copyrights 2023 &copy; ecommerce</p>
            </div> 
            <div className="rightfooter">
                 <h4>Follow us</h4>
                 <a href="https://www.linkedin.com/in/himanshi-rawat">Himanshi Rawat</a>
                 <a href="https://www.linkedin.com/in/himanshi-rawat">Atul Paswan</a>
                 <a href="https://www.linkedin.com/in/himanshi-rawat">Vikash Nautiyal</a>
                 <a href="https://www.linkedin.com/in/himanshi-rawat">Praveen Negi</a>

            </div>      
        </footer>
    );
};

export default Footer;