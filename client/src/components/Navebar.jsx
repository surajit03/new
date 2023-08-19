import React, { useState } from "react";
import "../css/Navebar.css";
import profile from '../img/profile.png'
import {  useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";


function Navebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handaleLogout = async(e)=>{
    e.preventDefault();
    dispatch(logout());
    navigate("/Home")
  }

  return (
    <nav className="navebar">
      <div className="navBox">
        <div className="logo">
          <button onClick={handaleLogout}>log out</button>
        </div>
        <div className="profile">
        <img  className = "profileImg"src={profile} alt="profile" />
        </div>
      </div>
      <div className="lineBox"></div>
    </nav>
  );
}

export default Navebar;
