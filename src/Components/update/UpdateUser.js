import Hamburger from "../Hamburger/Hamburger";
import "./update.css";
import React, { useState } from "react";

function UpdateUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");


  const reset = () => {
    setEmail("")
    setPassword("")
    setUsername("")
  }

  const handleUpdateUser = (event) => {
    event.preventDefault();
    const updateUser = { password: password, email: email };
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateUser),
    };
    fetch(`http://localhost:8081/user/${username}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();

      })
      .then((data) => {
        console.log("User updated successfully:", data);
        setMessage("User details updated successfully")
        alert("User details updated successfully")
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        setMessage("Error updating user")
      });
  };

  return (
    <div>
      <div className="forhamburgermenuinupdate">
        <Hamburger/>
        </div>
      <div className="update-user-form">
        <h2 className="fortexttaginupdate">Update User</h2>
        <form onSubmit={handleUpdateUser}>
          <label>
            Username:
            <input className="input-field" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <br />
          <label>
            SetPassword:
            <input className="input-field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <label>
            SetEmail:
            <input className="input-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <br />
          <div>
            <button className="submit-btn" type="submit">Update</button>
            <button className="reset-btn" type="button" onClick={reset}>reset</button>
          </div>
          {message && <p className="error-message">{message}</p>}
        </form>
      </div>
    </div>
  );
}
export default UpdateUser;