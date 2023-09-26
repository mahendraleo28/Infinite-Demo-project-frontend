import React, { useState, useEffect } from 'react';
import Hamburger from '../Hamburger/Hamburger';
import './filtertask.css';

function Filtertask() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [warnings, setWarnings] = useState([]);   

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setError(null);
  };

  useEffect(() => {
    fetchAllEmployees();
    fetchFilteredEmployees();
  }, []);

  const fetchAllEmployees = () => {
    setLoading(true);
    fetch('http://localhost:8081/api/excelemploy/list')
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching all employees. Please try again later.');
        setLoading(false);
      });
  };

  const fetchFilteredEmployees = () => {
    setLoading(true);
    fetch('http://localhost:8081/api/excelemploy/filtered-employees')
      .then((response) => response.json())
      .then((data) => {
        setFilteredEmployees(data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching filtered employees. Please try again later.');
        setLoading(false);
      });
  };

  
  const handleFileUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      fetch('http://localhost:8081/api/excelemploy/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            alert('File upload successful');
          } else {
            return response.text(); // Extract the error message
          }
        })
        .then((errorMessage) => {
          if (errorMessage) {
            setError(errorMessage); // Set the error message in state
          }
        })
        .catch((error) => {
          setError('Error uploading file. Please try again.'); 
        })
        .finally(() => {
          fetch('http://localhost:8081/api/excelemploy/warnings')
            .then((response) => response.json())
            .then((data) => {
              setWarnings(data);
            });
        });
    } else {
      alert('Please select an Excel file before submitting.');
    }
  };

  return (
    <div>
      <Hamburger />
      <br />
      <br />
      <br />
      <h1 className='header-for-emp-data'>Employee Data</h1>
      <input
        className='input-tag-to-upload-excel'
        type='file'
        accept='.xlsx'
        onChange={(event) => setSelectedFile(event.target.files[0])}
      />
      <br />
      <button className='button-to-submit-excel' onClick={handleFileUpload}>
        Submit
      </button>
      <br/>
      <br/>
      {error && <div className="error-alert">{error}</div>}
      {warnings.length > 0 && (
        <div className='warning-messages'>
          <ul>
            {warnings.map((warning, index) => (
              <ul key={index}>{warning}</ul>
            ))}
          </ul>
        </div>
      )}
      <div className='div-tag-for-texts'>
        <h3>Excel Must Include</h3>
        
        <span>*The format of the excel sheet is FirstName,LastName,CoeCid,Date-of-birth,Mail</span>
        <br/>
      </div>
      <div className='div-for-two-tables'>
      <div className='gwild'>
        <h2>All Employees</h2>
        {loading && <p>Loading...</p>}
          <table className='table-in-filtertask-allemp'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Ceocid</th>
                <th>Date-of-Birth</th>
                <th>Age</th>
                <th>Mail</th>
                <th>Eligibility Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.firstName} {employee.lastName}</td>
                  <td>{employee.ceoCid}</td>
                  <td>{new Date(employee.dateOfBirth).toLocaleDateString()}</td>
                  <td>{employee.age} years old</td>
                  <td>{employee.mail}</td>
                  <td>{employee.eligibilityStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
      <br/>
      <div className='employee-filter'>
        <h2>Filtered Employees</h2>
        {loading && <p>Loading...</p>}
          <table className='table-in-filtertask-filteremploy'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Ceocid</th>
                <th>Date-of-birth</th>
                <th>Age</th>
                <th>Mail</th>
                <th>Eligibility Status</th>
                
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.firstName} {employee.lastName}</td>
                  <td>{employee.ceoCid}</td>
                  <td>{new Date(employee.dateOfBirth).toLocaleDateString()}</td>
                  <td>{employee.age} years old</td>
                  <td>{employee.mail}</td>
                  <td>{employee.eligibilityStatus}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        <h6 className='matter'>*Filtered Employees are eligible to take the internal courses</h6>
      </div>
      </div>
    </div>
  );
}

export default Filtertask;
