import Hamburger from "../Hamburger/Hamburger";
import "./imageupload.css";
import React, { useState } from "react";

function ImageUpload() {
  const [image, setImage] = useState(null);

  function handleImageUpload(event) {
    setImage(event.target.files[0]);
  }

  function handleImageSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", image);

    fetch("http://localhost:8081/images", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          console.log("Image uploaded successfully");
          alert("Image uploaded successfully")
        } else {
          console.error("Error uploading image");
          alert("Error uploading image")
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
    <div className="forhamburgermenuinupload">
        <Hamburger/>
        </div>
    <div className="image-container">
  <h1 className="main-heading">Upload Image</h1>
  <form className="image-form" onSubmit={handleImageSubmit}>
    <input className="image-input" type="file" onChange={handleImageUpload} />
    <button className="image-upload-button" type="submit">Upload</button>
  </form>
</div>
</div>
  );
}

export default ImageUpload;
