import React, { useState } from "react";
import "../css/Navebar.css";
import profile from '../img/profile.png'
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";


function Navebar() {
  const dispatch = useDispatch();

  // const [open, setOpen] = useState(false);
  // const { currentUser } = useSelector((state) => state.user);
  const handaleLogout = async(e)=>{
    e.preventDefault();
    dispatch(logout());
    Navigate("/Home")
  }

  return (
    <nav className="navebar">
      <div className="navBox">
        <div className="logo">
          <button onClick={handaleLogout}>log out</button>
        </div>
        {/* {currentUser?(
          <div onClick={()=>setOpen(true)}>
            logout
          </div>
        ):(
          <div>
            singin
          </div>
        )

        } */}
        <div className="profile">
        <img  className = "profileImg"src={profile} alt="profile" />
        </div>
      </div>
      <div className="lineBox"></div>
    </nav>
  );
}

export default Navebar;
