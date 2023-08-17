import "./login.css";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const reset =()=>{
    setUsername("")
    setPassword("")
 }
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8081/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful!', data);
        setMessage('Login successful!');
        navigate('/users');
        alert("Login success");
      } else {
        const errorData = await response.json();
        console.log('Login failed:', errorData);
        setMessage(`Login failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setMessage('An error occurred, please try again later.');
    }
  };

  return (
    <div className="yedookatiinlogin">
    <form className="login-form" onSubmit={handleSubmit}>
      <label>
        Username:
        <input className="username-input" type="text" value={username} onChange={handleUsernameChange} required />
      </label>
      <label>
        Password:
        <input className="password-input" type="password" value={password} onChange={handlePasswordChange} required/>
      </label>
      <div className="button-container">
        <button className="login-button" type="submit">Login</button>
        <br/>
        <button className="reset-button" type="button" onClick={reset}>reset</button>
      </div>
      {message && <p className="error-message">{message}</p>}
    </form>
    <h6 className="formmovingthetagtoleft">If you don't have an Acccount!
    <Link to ="/Registration">
      <button className="registration" type="button"> Register </button>
    </Link>
    </h6>
    </div>
  );
}

export default Login;