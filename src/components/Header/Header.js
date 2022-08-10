import React, { Fragment } from "react";
import "../../styles/Header.css";
import HeaderCart from "./HeaderCart";
import mainImage from "../../assets/mainImage.jpg";

const Header = () => {
  return (
    <Fragment>
      <header className="header">
        <h1>Order Food</h1>
        <HeaderCart />
      </header>
      <div className="main-image">
        <img src={mainImage} alt="Order Food" />
      </div>
    </Fragment>
  );
};

export default Header;
