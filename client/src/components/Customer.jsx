import React from "react";
import Searchbar from "./Searchbar.jsx";
import "../css/Customer.css";
import Rectangle from "../img/Rectangle.png";

function Customer() {
  return (
    <div>
      <Searchbar title="All Customer" />
      <div className="Citembar">
        <div className="Cname">
          <img src={Rectangle} className="CRectangle" alt="Rectangle" />
          NAME
        </div>
        <div className="Cid">ID No.</div>
        <div className="Cno">PHONE No.</div>
        <div className="Cvillage">VILLAGE</div>
      </div>
      <div className="Citem">
        <div className="Name">NAME</div>
        <div className="id">ID No.</div>
        <div className="no">PHONE No.</div>
        <div className="village">VILLAGE</div>
      </div>
    </div>
  );
}

export default Customer;
