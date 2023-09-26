import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
      <Hamburger />
      <div className="details-container">
      <h2 className="header-for-userlist-text">User List</h2>
      <table className="header-for-tittle-names-users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Company</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="table-data-give">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="table-data-give">{user.id}</td>
                <td className="table-data-give">{user.username}</td>
                <td className="table-data-give">{user.email}</td>
                <td className="table-data-give">{user.company}</td>
                <td className="table-data-give">
                  <button
                    className="delete-btn-in-users"
                    onClick={() => handleDelete(user.username)}>
                    Delete User
                  </button>
                  <Link to='/update'>
                    <button className="update-btn-in-users" >Upate User</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllUsers;
