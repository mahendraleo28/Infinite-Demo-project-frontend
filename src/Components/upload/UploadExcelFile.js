import Hamburger from "../Hamburger/Hamburger";
import "./upload.css";
import { useState } from "react";

export default function UploadExcelFile() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    fetch("http://localhost:8081/upload", {
      method: "POST",
      body: formData,
    })
    .then((response) => {
      if (response.ok) {
        setMessage("Success Uploading File!")
        console.log("Success Uploading File!");
      } else {
        console.error("Error uploading file");
        setMessage("Error Uploading File!")
      }
    })
    .catch((error) => {
      console.error(error);
    });
  };

  return (
    <div>
      <div className="forhamburgermenuinupdate">
        <Hamburger/>
        </div>
    <form className="form-container" onSubmit={handleSubmit}>
      <div>
        <label className="textdataforexcelfile" htmlFor="file">Select an Excel file:</label>
        <input type="file" id="file" onChange={handleFileChange} />
      </div>
      <button type="submit">Upload</button>
      {message && <p>{message}</p>}
    </form>
    </div>
  );
}