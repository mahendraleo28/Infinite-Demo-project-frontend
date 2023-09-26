import React, { useState } from "react";
import "./imageupload.css";
import Hamburger from "../Hamburger/Hamburger";

function ImageComponent1() {
  const [imageName, setImageName] = useState("");
  const [imageData, setImageData] = useState("");

  const handleImageNameChange = (event) => {
    setImageName(event.target.value);
  };
const handleGetImageClick = () => {
    fetch(`http://localhost:8081/images/${imageName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        setImageData(`data:image/jpeg;base64,${data}`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  return (
    <div>
     <div className="forhamburgermenuinview">
        <Hamburger/>
        </div>
    <div className="image-container1">
      
  <h1 className="image-heading">Get Image By Id</h1>
  <label>
    <span className="image-label">Image Id:</span>
    <input type="text" className="image-input" value={imageName} onChange={handleImageNameChange} />
  </label>
  <button className="image-button" onClick={handleGetImageClick}>Get Image</button>
  {imageData && <img src={imageData} alt="img" className="image" />}
</div>
</div>
  );
}

export default ImageComponent1;
