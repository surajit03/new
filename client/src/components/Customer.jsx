import React, { useEffect, useState } from "react";
import axios from "axios";
import Searchbar from "./Searchbar.jsx";
import "../css/Customer.css";
import Rectangle from "../img/Rectangle.png";
import { useNavigate, Link } from "react-router-dom";

function Customer() {
  const [allCustomers, setAllCustomers] = useState([]);
  // Changed to an array to store multiple customers
  const navigate = useNavigate();

  // const hendalClick = () => {
  //   navigate("/CustomerDetail");
  // };

  useEffect(() => {
    // Define the function inside useEffect to make it an effect
    const fetchCustomers = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        const response = await axios.get(
          "/coustomer/fachallcoustomer/", // Adjust the API endpoint to match your actual API
          {}, // Empty request body, as it seems you don't need to send any data
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          }
        );
        if (Array.isArray(response.data)) {
          setAllCustomers(response.data);
        } else {
          console.error("Invalid response data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers(); // Call the function to fetch customers when the component mounts
  }, []); // Pass an empty dependency array to run this effect only once when the component mounts

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
      <div className="fetchCustomers">
        {allCustomers.length === 0 && " No. of customer is 0"}
        {allCustomers.map((coustomer) => (
          <div key={coustomer.IdNumber} className="customer_btn">
            <Link  className="custom-link" to={`/CustomerDetail/${coustomer._id}` }>
              <div className="customer">
                <div className="Name">{coustomer.name}</div>
                <div className="id">{coustomer.IdNumber}</div>
                <div className="no">{coustomer.PhoneNumber}</div>
                <div className="village">{coustomer.village}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Customer;
