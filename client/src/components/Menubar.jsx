import React from "react";
import "../css/Menubar.css";
import { Link } from "react-router-dom";
import Deshboard from "../img/Deshboard.png";
import userList from "../img/userList.png";
import items from "../img/itemsList.png";
import Sell from '../img/Sell.png'
import accountant from '../img/Accountant.png'

function Menubar() {
  const linkStyle = {
    textDecoration: "none",
    color: "rgba(239, 255, 255, 1)",
    fontSize: "1rem",
    padding: "3px",
    marginLeft: "12px",
  };

  return (
    <>
      <div className="menubar">
        <ul className="menuUl">
          <li>
            {" "}
            <Link to="/Dashboard" style={linkStyle}>
              <img className="Deshboard" src={Deshboard} alt="" />
              Dashboard
            </Link>
          </li>
          <li>
            {" "}
            <Link to="/Customer" style={linkStyle}>
              <img className="userList" src={userList} alt="" />
              Customer
            </Link>
          </li>
          <li>
            {" "}
            <Link to="/Items" style={linkStyle}>
              <img className="items" src={items} alt="" />
              Items
            </Link>
          </li>
          <li>
            {" "}
            <Link to="/Sell" style={linkStyle}>
              <img className="Sell" src={Sell} alt="" />
              Sell
            </Link>
          </li>
          <li>
            {" "}
            <Link to="/Accountant" style={linkStyle}>
              <img className="accountant" src={accountant} alt="" />
              Accountant
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Menubar;
