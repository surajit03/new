import React, { useEffect, useState } from "react";
// import "./ProfileDetail.css"; // Import your CSS file
import axios from "axios"; // Import axios for making API requests
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import {
  fetchProfile,
  startLoading,
  endLoading,
} from "../redux/profileSlice.js"
import { Link } from 'react-router-dom'; 

function ProfileDetail() {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      // dispatch({ type: startLoading });

      const token = JSON.parse(localStorage.getItem("token"));
      try {
        const response = await axios.get(`/profile/OnegetProfile`, {
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });

        if (Array.isArray(response.data)) {
          setProfile(response.data);
          console.log(response.data);
        } else {
          console.error("Invalid response data:", response.data);
        }
        // setProfile(data);
        //   dispatch({ type: fetchProfile, payload: data })
        // dispatch({ type: endLoading });
      } catch (error) {
        console.error(error.response);
        // Handle the error as needed
      }
    };
    fetchProfile();
  }, []);
return (
  <div className="fetchCustomers">
    {/* Check if profile is not null */}
    {profile !== null ? (
      profile.length === 0 ? (
        "No. of customers is 0"
      ) : (
        profile.map((profileItem) => (
          <div key={profileItem.phoneNumber} className="customer_btn">
            <Link className="custom-link" to={`/CustomerDetail/${profileItem._id}`}>
              <div className="customer">
              {profileItem.imgUrl && (
            <div>
              <img src={profileItem.imgUrl} alt="Customer" />
            </div>
          )}
                <div className="Name">{profileItem.name}</div>
                <div className="id">{profileItem.contactAddress}</div>
                <div className="no">{profileItem.phoneNumber}</div>
                <div className="village">{profileItem.businessName}</div>
                <div className="village">{profileItem.email}</div>
                <div className="village">{profileItem.logo}</div>
              </div>
            </Link>
          </div>
        ))
      )
    ) : (
      // Render a loading state or message while profile is being fetched
      "Loading..."
    )}
  </div>
);
}
export default ProfileDetail;
