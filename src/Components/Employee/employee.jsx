import { Details } from '@mui/icons-material';
import React, { useState } from 'react';

function UploadEmployeeData() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8081/reg/employ', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email })
      });

      if (response.ok) {
        console.log('Employee data uploaded successfully!');
        alert("Details saved successfully")
        // Optionally display a success message or navigate to a confirmation page
      } else {
        console.log('Failed to upload employee data.');
        // Handle error case
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle error case
    }
  };

  return (
    <div>
      <h1>Upload Employee Data</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Phone:
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button type="submit">Upload Data</button>
      </form>
    </div>
  );
}

export default UploadEmployeeData;
