import React from 'react'
import Searchbar from './Searchbar'
import Rectangle from "../img/Rectangle.png";
import "../css/Items.css"

function Items() {
  return (
    <div>
     <Searchbar title='All Items'/>
     <div className="itembar">
        <div className="name">
          <img src={Rectangle} className="Rectangle" alt="Rectangle" />
          NAME
        </div>
        <div className="id">ID No.</div>
        <div className="no">PHONE No.</div>
        <div className="village">VILLAGE</div>
      </div>
      <div className="item">
        <div className="nameitem">NAME</div>
        <div className="iditem">ID No.</div>
        <div className="noitem">PHONE No.</div>
        <div className="villageitem">VILLAGE</div>
      </div>
    </div>
  )
}

export default Items
