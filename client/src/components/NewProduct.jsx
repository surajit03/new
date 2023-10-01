import React, { useEffect, useState } from "react";
import "../css/NewProduct.css";
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

function NewProduct() {
  const [img, setImg] = useState(undefined);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categary, setCategary] = useState("");
  const [imgPerc, setImgPerc] = useState(0);
  const [imgUrl, setimgUrl] = useState({});
  const [uniqueId, setUniqueId] = useState({});
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
      () =>
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setimgUrl((prev) => {
              return { ...prev, [urlType]: downloadURL };
            });
          })
          .catch((error) => {
            console.error("Error getting download URL", error);
            // Handle the error here, for example, by displaying an error message to the user.
          })
    );
  };

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const handleUpload = async (e) => {
    e.preventDefault();
    dispatch(fetchStart());

    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const res = await axios.post(
        "product/addProduct",
        {
          imgUrl,
          name,
          price,
          description,
          categary,
          uniqueId
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );
      if (res.status === 200) {
        dispatch(fetchSuccess(res.data._IdNumber));
        console.log(res.data);
        navigate("/NewProduct");
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
    <div className="NewProduct">
      <div className="hading">Add new Product</div>
      <div className="Product_detal">
        <div className="Pimg">
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
        <div className="Pname">
          <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="Pprice">
          <input
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="Pdescription">
          <input
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="Pcategary">
          <input
            placeholder="Categary"
            onChange={(e) => setCategary(e.target.value)}
          />
        </div>
        <div className="P">
          <input
            placeholder="CuniqueId"
            onChange={(e) => setUniqueId(e.target.value)}
          />
        </div>
      </div>
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default NewProduct;
