import React, { useEffect, useState } from "react";
import axios from "axios";
import Searchbar from "./Searchbar.jsx";
import "../css/Customer.css";
// import Rectangle from "../img/Rectangle.png";
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
      <table className="customer-table">
        <thead>
          <tr className="Citembar">
            <th className="Cname">
              {/* <img src={Rectangle} className="CRectangle" alt="Rectangle" /> */}
              NAME
            </th>
            <th className="Cid">ID No.</th>
            <th className="Cno">PHONE No.</th>
            <th className="Cvillage">VILLAGE</th>
          </tr>
        </thead>
        <tbody className="fetchCustomers">
          {allCustomers.length === 0 && (
            <tr>
              <td colSpan="4"> No. of customer is 0</td>
            </tr>
          )}
          {allCustomers.map((coustomer) => (
              <Link
                className="custom-link"
                to={`/CustomerDetail/${coustomer._id}`}
              >
                <tr className="customer-row">
                <td className="Name">{coustomer.name}</td>
                <td className="id">{coustomer.IdNumber}</td>
                <td className="no">{coustomer.PhoneNumber}</td>
                <td className="village">{coustomer.village}</td>
                </tr>
              </Link>
          ))}
          
        </tbody>
      </table>
    </div>
  );
}

export default Customer;
