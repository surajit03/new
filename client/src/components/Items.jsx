import React, { useEffect, useState } from "react";
import axios from "axios";
import Searchbar from "./Searchbar";
import Rectangle from "../img/Rectangle.png";
import "../css/Items.css";
import { useNavigate, Link } from "react-router-dom";

function Items() {
  const [allProduct, SetAllProduct] = useState([]);
  const navigate = useNavigate();

  // const hendalClick = () => {
  //   navigate("/ProductDetail");
  // };

  useEffect(() => {
    // Define the function inside useEffect to make it an effect
    const fetchProduct = async () => {
      const token = JSON.parse(localStorage.getItem("token"));

      try {
        const response = await axios.get(
          "/product/fachallproduct",
          {}, // Empty request body, as it seems you don't need to send any data
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          }
        );
        if (Array.isArray(response.data)) {
          SetAllProduct(response.data);
        } else {
          console.error("Invalid response data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchProduct(); // Call the function to fetch customers when the component mounts
  }, []); // Pass an empty dependency array to run this effect only once when the component mounts

  return (
    <div>
      <Searchbar title="All Items" />
      <div className="itembar">
        <div className="name">
          <img src={Rectangle} className="Rectangle" alt="Rectangle" />
          NAME
        </div>
        <div className="id">ID No.</div>
        <div className="no">Price</div>
        <div className="village"> Categary</div>
      </div>
      <div className="fetchProduct">
        {allProduct.length === 0 && "No. of Products is 0"}
        {allProduct.map((products) => (
          <div key={products.uniqueId} className="product_btn">
            <Link className="item-link" to={`/ProductDetail/${products._id}`}>
              <div className="item">
                <div className="nameitem">{products.name}</div>
                <div className="uniqueId">{products.uniqueId}</div>
                <div className="price">{products.price}</div>
                <div className="categary">{products.categary}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Items;
