import React, { useState, useEffect } from 'react';
import Hamburger from "../Hamburger/Hamburger";
import './person.css';

export default function Person() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [educationDetails, setEducationDetails] = useState(null);
  const [workDetails, setWorkDetails] = useState(null);
  const [activeTab, setActiveTab] = useState('basic'); // Default tab is 'Basic Details'
  const [tabsVisible, setTabsVisible] = useState(false);

  useEffect(() => {
    // Fetch a list of users from your API endpoint
    fetch("http://localhost:8081/basic-details/all")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }, []);

  const fetchEducationDetails = (personId) => {
    if (personId) {
      fetch(`http://localhost:8081/education-details/ed/${personId}`)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error('Education details not found');
          }
        })
        .then((data) => setEducationDetails(data))
        .catch((error) => console.error(error));
    } else {
      // Handle the case when personId is undefined
      console.error('Person ID is undefined');
    }
  };

  const fetchWorkDetails = (personId) => {
    if (personId) {
      fetch(`http://localhost:8081/work-details/wd/${personId}`)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error('Work details not found');
          }
        })
        .then((data) => setWorkDetails(data))
        .catch((error) => console.error(error));
    } else {
      // Handle the case when personId is undefined
      console.error('Person ID is undefined');
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setActiveTab('basic'); // Set the default tab to 'Basic Details'
    
    fetchEducationDetails(user.personId);
    fetchWorkDetails(user.personId);
    setTabsVisible(true);
  };

  return (
    <div>
      <div>
        <Hamburger />
      </div>
      <br />
      <div className="the-overall-div-tag-for-persons">
      {/* Table for Users */}
      <div>
      <table className="header-for-tittle-names-users-table-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody className="table-data-give">
          {users.map((user) => (
            <tr key={user.id} onClick={() => handleUserClick(user)}>
              <td className="table-data-give">{user.personId}</td>
              <td className="table-data-give">{user.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {/* <br /> */}
            <div className='this-is-for-two-all'>
      {/* Tabs for Basic, Education, and Work Details */}
      {tabsVisible && (
      <div className="tab-buttons">
        <button
          onClick={() => setActiveTab('basic')}
          className={activeTab === 'basic' ? 'active-tab' : ''}
        >
          Basic Details
        </button>
        <button
          onClick={() => setActiveTab('education')}
          className={activeTab === 'education' ? 'active-tab' : ''}
        >
          Education Details
        </button>
        <button
          onClick={() => setActiveTab('work')}
          className={activeTab === 'work' ? 'active-tab' : ''}
        >
          Work Details
        </button>
      </div>
      )}
      <div className='all-the-texts-names'>
        {activeTab === 'basic' && selectedUser && (
          <div>
            <h2>Basic Details for {selectedUser.name}</h2>
            <p>ID: {selectedUser.personId}</p>
            <p>Name: {selectedUser.name}</p>
            <p>Email: {selectedUser.email}</p>
            <p>Phone: {selectedUser.phone}</p>
            <p>Address: {selectedUser.address}</p>
            {/* Render basic details here */}
          </div>
        )}

        {activeTab === 'education' && educationDetails && (
          <div>
            <h2>Education Details for {selectedUser.name}</h2>
            <p>Degree: {educationDetails.degree}</p>
            <p>Institution: {educationDetails.institution}</p>
            <p>yearCompleted: {educationDetails.yearCompleted}</p>
            {/* Render education details here */}
          </div>
        )}

        {activeTab === 'work' && workDetails && (
          <div>
            <h2>Work Details for {selectedUser.name}</h2>
            <p>company: {workDetails.company}</p>
            <p>position: {workDetails.position}</p>
            <p>startYear: {workDetails.startYear}</p>
            <p>endYear: {workDetails.endYear}</p>  
          </div>
        )}
      </div>
      </div>
    </div>
    </div>
  );
}
