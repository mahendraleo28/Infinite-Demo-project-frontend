import React, { useState, useEffect } from 'react';
import "./officer.css";

function OfficerPage() {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:8081/employ'); // Update the URL as needed
      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
      } else {
        console.log('Failed to fetch employee data.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleStatusChange = async (employeeId, newStatus, comment) => {
    try {
      const response = await fetch(`http://localhost:8081/${employeeId}/approve}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        console.log(`Employee ${newStatus.toLowerCase()}ed successfully!`);
        // Update employees with the new status
        const updatedEmployees = employees.map(employee => {
          if (employee.id === employeeId) {
            return { ...employee, status: newStatus, comment: comment };
          }
          return employee;
        });
        setEmployees(updatedEmployees);
      } else {
        console.log(`Failed to ${newStatus.toLowerCase()} employee.`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
    
  };

  return (
    <div>
      <h1 className='officer-heading'>Officer Page</h1>
      <table className='officer-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Status</th>
            <th>Comment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.phone}</td>
              <td>{employee.email}</td>
              <td>{employee.status}</td>
              <td>{employee.comment}</td>
              <td>
                <button onClick={() => handleStatusChange(employee.id, 'Approved', 'Approved by Officer')}>Approve</button>
                <button onClick={() => handleStatusChange(employee.id, 'Rejected', 'Rejected by Officer')}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OfficerPage;
