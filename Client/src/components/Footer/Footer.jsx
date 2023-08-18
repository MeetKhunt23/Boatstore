import "./Footer.scss";
import React from "react";
import { FaLocationArrow, FaMobileAlt, FaEnvelope } from "react-icons/fa";
import Payment from "../../assets/payments.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="col">
          <div className="title">About</div>
          <div className="text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perferendis, ex.
          </div>
        </div>
        <div className="col">
          <div className="title">Contact</div>
          <div className="c-item">
            <FaLocationArrow />
            <div className="text">Rajdeep-3 block no-204,Rajkot</div>
          </div>
          <div className="c-item">
            <FaMobileAlt />
            <div className="text">Phone:9106689874</div>
          </div>
          <div className="c-item">
            <FaEnvelope />
            <div className="text">Email:meetkhunt2301@gmail.com</div>
          </div>
        </div>
        <div className="col">
          <div className="title">Categories</div>
          <span className="text">Headphones</span>
          <span className="text">Smart Watches</span>
          <span className="text">Wireless earbuds</span>
          <span className="text">Bluetoth Speakers</span>
          <span className="text">Home Theaters</span>
          <span className="text">Projectors</span>
        </div>
        <div className="col">
          <div className="title">Pages</div>
          <span className="text">Home</span>
          <span className="text">About</span>
          <span className="text">Privercy Policy</span>
          <span className="text">Returns</span>
          <span className="text">Terms&conditions</span>
          <span className="text">Contact Us</span>
        </div>
      </div>
      <div className="bottom-bar">
        <div className="bottom-bar-content">
            <div className="text">
                BOAT STORE IS CREATED BY MEET INFOTECH PVT LTD. 
            </div>
            <img src={Payment}/>
        </div>
      </div>
    </div>
  );
};

export default Footer;
