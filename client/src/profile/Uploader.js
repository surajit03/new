import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebase";
const DropzoneUploader = () => {
  const [imgUrl, setImgUrl] = useState({});
  const storage = getStorage(app); // Assuming you have 'app' defined somewhere
  const [imgPerc, setImgPerc] = useState(0);


  const onDrop = (acceptedFiles) => {
    // Handle each dropped file here
    acceptedFiles.forEach((file) => {
      // You can customize 'urlType' according to your needs
      const urlType = "imgUrl";
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // Update the progress based on 'urlType'
          if (urlType === "imgUrl") {
            // Assuming you have a 'setImgPerc' function to update the progress
            setImgPerc(Math.round(progress));
          }
          // Handle other snapshot states if needed
        },
        (error) => {
          console.error("Error during upload:", error);
          // Handle the error here
        },
        () => {
          // Get the download URL once the upload is complete
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              setImgUrl((prevUrls) => ({
                ...prevUrls,
                [urlType]: downloadURL,
              }));
            })
            .catch((error) => {
              console.error("Error getting download URL:", error);
              // Handle the error here
            });
        }
      );
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*", // Restrict to image files only
  });

  return (
    <div>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag & drop an image file here, or click to select one</p>
        <div>
          {imgPerc > 0 ? (
            // Display the upload progress if imgPerc is greater than 0
            "Uploading: " + imgPerc + "%"
          ) : (
            // Display the uploaded image if imgUrl.imgUrl is defined
            imgUrl.imgUrl && <img src={imgUrl.imgUrl} alt="Uploaded" />
          )}
        </div>
      </div>
    </div>

  );
};

export default DropzoneUploader;
