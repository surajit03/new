import React from "react";
import "../css/Searchbar.css";
import search from "../img/search.png";
import setting from "../img/setting.png";
import menu from "../img/menu.png";
import vector from "../img/vector.png";
import New from "../img/new.png";
import { useNavigate } from "react-router-dom";

function Searchbar(props) {
  const navigate = useNavigate();

  // const navigateToNew = () => {
  //   navigate('/New_coustomer');

  // };

  const navigateToNew = () => {
    if (props.title === "All Customer") {
      navigate("/New_coustomer");
    } else if (props.title === "All Items") {
      navigate("/NewProduct");
    }
  };

  return (
    <div className="searchbar">
      <div className="search">
        <div className="S_hader">
          {" "}
          {props.title}
          <img className="vector" src={vector} alt="vector" />
        </div>
        <div className="searchLIne">
          <input
            className=" SsearchInput"
            id="SsearchStr"
            placeholder="Search"
          ></input>
          <button className="searchBtm">
            <img className="searchImg" src={search} alt="Search" />
          </button>
        </div>
      </div>
      <div className="manubar">
        <div className="S_new">
          <button className="S_new" onClick={navigateToNew}>
            <img className="New" src={New} alt="New" />
            New
          </button>
        </div>
        <div>
          <img className="setting" src={setting} alt="setting" />
        </div>
        <div>
          <img className="menu" src={menu} alt="menu" />
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
