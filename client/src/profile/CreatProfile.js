import React, { useEffect, useState } from "react";
import "../css/New_coustomer.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfile } from "../redux/profileSlice";
import { fetchStart, fetchSuccess, fetchFailuer } from "../redux/imgSlice";


const CreatProfile = () => {
  const [logo, setLogo] = useState(undefined);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [contactAddress, setContactAddress] = useState("");
  const [imgPerc, setImgPerc] = useState(0);
  const [imgUrl, setimgUrl] = useState({});

  // const [userData, setUserData] = useState({
  //   imgUrl: "",
  //   name: "",
  //   email: "",
  //   phoneNumber: "",
  //   businessName: "",
  //   contactAddress: "",
  // });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    // const profile = useSelector((state) => state.profile.userData);

    uploadTask.on(
      "state_changed",
      (snapnot) => {
        const progress = (snapnot.bytesTransferred / snapnot.totalBytes) * 100;
        if (urlType === "imgUrl") {
          setImgPerc(Math.round(progress));
        }
        switch (snapnot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.error("Error during upload:", error);
      },
      () => getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadURL) => {
          setimgUrl((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        })
        .catch((error) => {
          console.error("Error getting download URL:", error);
          // Handle the error here, for example, by displaying an error message to the user.
        })
    );
  };

  useEffect(() => {
    logo && uploadFile(logo, "imgUrl");
  }, [logo]);



  // useEffect(() => {
  //   // This effect will run whenever userData changes
  //   console.log("Updated userData:", userData);
  // }, [userData]);

  const handleUpload = async (e) => {
    e.preventDefault();
    // dispatch({ type: startLoading });
    try {
      const token = JSON.parse(localStorage.getItem("token")); // Use the same key 'token'
      const response = await axios.post(
        "/profile/createProfile",
        {
          imgUrl,
          name,
          email,
          phoneNumber,
          businessName,
          contactAddress,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token, // Use the 'token' you retrieved earlier
          },
        }
      );
      const data = response.data;
      dispatch(fetchProfile(data));
      // setUserData(data)
      console.log(data);
      navigate("/Dashboard")
    } catch (error) {
      dispatch(fetchFailuer());
      console.error(error.response);

    }
  };

  const navigateToSetting = () => {
    navigate("/Profile");
  }


  return (
    <div className="New_coustomer">
      <div className="hading">Create Profile</div>
      <div className="customer_detal">
        <div className="Cdetal">

          <div className="Cimg">
            {imgPerc > 0 ? (
              "Uploading:" + imgPerc + "%"
            ) : (
              <input
                type="file"
                placeholder="Img"
                accept="image/*"
                onChange={(e) => setLogo(e.target.files[0])}
              />
            )}
          </div>
          <div className="CName">
            <input
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="CIdNumber">
            <input
              placeholder="BusinessName"
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </div>
          <div className="CNumber">
            <input
              placeholder="Phone Number"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="CVillage">
            <input
              placeholder="ContactAddres"
              onChange={(e) => setContactAddress(e.target.value)}
            />
          </div>
          <div className="CEmail">
            <input
              type="Email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
      </div>
      <button onClick={handleUpload} style={{ marginLeft: '48px', cursor: 'pointer', padding: '2px 16px', backgroundColor: '#ff7660', }} >Upload</button>

      <button onClick={navigateToSetting}
        style={{
          marginLeft: '8px',
          cursor: 'pointer',
          padding: '2px 16px',
          backgroundColor: '#ff7660',
        }}
      >
        Setting
      </button>




    </div>
  );
}

export default CreatProfile;


