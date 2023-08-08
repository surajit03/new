import React from "react";
import "../css/Sell.css";
import New from "../img/new.png";

function Sell() {
  return (
    <div className="sell">
      <div className="invoice">New Retainer invoice</div>
      <div className="Invoice_detal">
        <div className="customer_detal">
          <div className="CName">
            Customer Name
            <input
              className=" searchInput"
              id="searchStr"
              placeholder="Search"
            ></input>
          </div>
          <div className="Cid">
            Customer ID.
            <input
              className=" searchInput"
              id="searchStr"
              placeholder="Search"
            ></input>
          </div>
          <div className="CAdd"></div>
        </div>
        <div className="invoice_detal">
          <div className="Inumber">
            Invoice Number 
            {/* todo */}
          </div>
          <div className="Idate">
            Invoice Date
            {/* todo */}
          </div>
        </div>
        <div className="Items">
          <div className="Item_detal">Items Details</div>
          <div className="quantity">Quantity</div>
          <div className="rate">Rate</div>
          <div className="discount">Discount</div>
        </div>
        <div className="price_detal">
          <div className="img">img</div>
          <div className="total_item">
          <input
              className=" searchInput"
              id="searchStr"
              placeholder="Search"
            ></input>
          </div>
          <div className="total_quntity">
          <input
              className=" SmallsearchInput"
              id="SmallsearchStr"
            ></input>
          </div>
          <div className="One_rate">
            {/* todo */}
          </div>
          <div className="Discount">
            {/* todo */}
          </div>
        </div>
        <button className="new">
          <img className="New" src={New} alt="New" />
          <div className="Add_items">Add another items</div>
        </button>
        <div className="Total_div">
          <div className="sub_total">Sub Total</div>
          <div className="Adjustment">Adjustment 
          <input
              className=" SmallsearchInput"
              id="SmallsearchStr"
            ></input> 
          </div>
          <div className="total">Total</div>
        </div>
        <div className="Payment_options">Payment Options 
        <button>
          p
        </button>
        </div>
      </div>
    </div>
  );
}

export default Sell;
