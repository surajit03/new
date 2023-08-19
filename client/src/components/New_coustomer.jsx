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
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchStart, fetchSuccess, fetchFailuer } from "../redux/imgSlice";
 
function New_coustomer() {
  const [img, setImg] = useState(undefined);
  const [name, setName] = useState("");
  const [ID, setID] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [village, setVillage] = useState("");
  const [email, setEmail] = useState("");
  const [imgPerc, setImgPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

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
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          })
        );
      }
    );
  };

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const token = JSON.parse(localStorage.getItem("token")); // Use the same key 'token'

  const handleUpload = async (e) => {
    e.preventDefault();
    dispatch(fetchStart());
    try {
      const res = await axios.post(
        "/coustomer/addCoustomer",
        {
          ...inputs,
          name,
          ID,
          PhoneNumber,
          village,
          email,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token, // Use the 'token' you retrieved earlier
          },
        }
      );
      if (res.status === 200) {
        dispatch(fetchSuccess(res.data._id));
        console.log(res.data);
        // navigate(`/New_coustomer/${res.data._id}`);
        navigate("/New_coustomer")
      } else {
        console.log("Unexpected response status:", res.status);
        // Handle other response statuses if needed
      }
    } catch (error) {
      dispatch(fetchFailuer());
      console.error("Error uploading customer:", error);
      
      // Handle error scenarios, such as network issues
    }
  };
  

  return (
    <div className="New_coustomer">
      <div className="hading">Customer Detal</div>
      <div className="customer_detal">
        <div className="Cimg">
          {imgPerc > 0 ? (
            "Uploading:" + imgPerc + "%"
          ) : (
            <input
              type="file"
              placeholder="Img"
              accept="image/*"
              onChange={(e) => setImg(e.target.files[0])}
            />
          )}
        </div>
        <div className="Cdetal">
          <div className="CName">
            <input
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="CID">
            <input
              placeholder="ID Number"
              onChange={(e) => setID(e.target.value)}
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
              placeholder="Village"
              onChange={(e) => setVillage(e.target.value)}
            />
          </div>
          <div className="CEmail">
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
      </div>
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default New_coustomer;
