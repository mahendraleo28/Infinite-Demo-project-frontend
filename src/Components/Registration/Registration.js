import "./registration.css";
import React, { useState } from 'react';
import {Link} from "react-router-dom";

function Registration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [role, setRole] = useState('');
  const reset =()=>{
    setUsername("")
    setPassword("")
    setCompany("")
    setEmail("")
    setMessage("")
    setRole("")
 }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCompanyChange = (event) => {
    setCompany(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8081/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, company, email ,role})
      });

      if (response.ok) {
        console.log("Registration successful!")
        setMessage('Registration successful!');
      } else {
        const errorData = await response.json();
        setMessage(`Registration failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setMessage('An error occurred, please try again later.');
    }
  };

  return (
    <div className="yedookati">
    <form className="form-container" onSubmit={handleSubmit}>
  <label>
    <span>Username:</span>
    <input className="form-container-input" type="text" value={username} onChange={handleUsernameChange} required />
  </label>
  <label>
    <span>Password:</span>
    <input  className="form-container-input" type="password" value={password} onChange={handlePasswordChange} required />
  </label>
  <label>
    <span>Company:</span>
    <input className="form-container-input" type="text" value={company} onChange={handleCompanyChange} required />
  </label>
  <label>
    <span>Email:</span>
    <input className="form-container-input" type="email" value={email} onChange={handleEmailChange} required />
  </label>
  <div >
          <label className="fornametagindrop" htmlFor="role">Role:</label>
          <select className="form-container-input1" id="role" name="role" value={role} onChange={handleRoleChange}>
            <option value="">Select Role</option>
            <option value="employee">Employee</option>
            <option value="officer">Officer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
  <div className="button-container">
    <button type="submit">Register</button>
    <button className="resetbuttoninreg" type="button" onClick={reset}>reset</button>
  </div>
  {message && <p>{message}</p>}
</form>
<h6 className="forbuttoninregistration"> If you have an Account!
<Link to ="/">
  <button className="login" type='button'>Login</button>
  </Link>
  </h6>
</div>

  );
}

export default Registration;
