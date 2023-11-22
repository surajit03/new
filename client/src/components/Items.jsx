import React, { useEffect, useState } from "react";
import axios from "axios";
import Searchbar from "./Searchbar";
// import Rectangle from "../img/Rectangle.png";
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
      <table className="items-table">

      <thead className="itembar">
        <tr className="Citembar">
        <th className="name">
          {/* <img src={Rectangle} className="Rectangle" alt="Rectangle" /> */}
          NAME
        </th>
        <th className="id">ID No.</th>
        <th className="no">Price</th>
        <th className="village"> Categary</th>
        </tr>
      </thead>
      <tbody className="fetchProduct">
        {allProduct.length === 0 &&    <tr>
              <td colSpan="4"> No. of customer is 0</td>
            </tr>}
        {allProduct.map((products) => (
            <Link className="item-link" to={`/ProductDetail/${products._id}`}>
              <tr className="item-row">
                <td className="nameitem">{products.name}</td>
                <td className="uniqueId">{products.uniqueId}</td>
                <td className="price">{products.price}</td>
                <td className="categary">{products.categary}</td>
              </tr>
            </Link>
        ))}
      </tbody>
      </table>

    </div>
  );
}

export default Items;
