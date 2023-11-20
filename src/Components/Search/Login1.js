import React, { useState } from "react";
import "./login1.css";
import Hamburger from "../Hamburger/Hamburger";

function Login1() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const reset=()=>{
    setUsername("")
  }

  const handleUsernameChange = (event) => {
    const inputUsername = event.target.value;
    // Remove the characters @, #, $, and %
    const validUsername = inputUsername.replace(/[@$#%]/g, "");
    setUsername(validUsername);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:8081/login?username=" + username, {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          setMessage("User Detected!");
          console.log("success")
        } else {
          setMessage("User not found!");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
    <div className="forhamburgermenuinsearch">
        <Hamburger/>
        </div>
    <div>
    <div className="container">
  <div className="sub-header">
    <h2 className="subtitlefrotext">Search by User name</h2>
  </div>
  <form className="form" onSubmit={handleSubmit}>
    {/* <label className="form-label" htmlFor="username">Username:</label> */}
    <input
      type="text"
      id="username"
      placeholder="Username"
      className="form-input"
      value={username}
      onChange={handleUsernameChange}
    />
    <div className="form-actions">
      <button className="form-button" type="submit">Search</button>
      <button className="form-button form-button-reset" type="reset" onClick={reset}>
        Reset
      </button>
    </div>
    <br/>
    <br/>
    <h3 className="form-error-message">{message}</h3>
  </form>
</div>
</div>
</div>
  );
}
export default Login1;
