import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import "./allusers.css";
import Hamburger from "../Hamburger/Hamburger";

function AllUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }, []);
const handleDelete = async (username) => {
    try {
      const response = await fetch(`http://localhost:8081/user/${username}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("User deleted successfully");
        setUsers(users.filter(user => user.username !== username));
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user: ", error);
      alert("Failed to delete user");
    }
  };
  return (
    <div>
    <div className="forhamburder">
      <Hamburger/>
      </div>
    <div className="user-list">
      <div className="toalter">
  <h2>User List</h2>
  <table>
    <thead>
      <tr>
        <th className="headerfortittlenames">ID</th>
        <th className="headerfortittlenames">Username</th>
        <th className="headerfortittlenames">Email</th>
        <th className="headerfortittlenames">Company</th>
        <th className="headerfortittlenames">Action</th>
      </tr>
    </thead>
    <tbody className="tabledatagive">
      {users.map((user) => (
        <tr key={user.id}>
          <td className="tabledatagive">{user.id}</td>
          <td className="tabledatagive">{user.username}</td>
          <td className="tabledatagive">{user.email}</td>
          <td className="tabledatagive">{user.company}</td>
          <td className="tabledatagive1">
            <button
              className="delete-btn"
              onClick={() => handleDelete(user.username)}>
              Delete User
            </button>
            <Link to = '/update'>
              <button className="update" >Upate User</button>
              </Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  </div>
</div>
</div>
  );
}

export default AllUsers;
