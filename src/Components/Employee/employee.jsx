import React, { useState , useEffect} from 'react';
import "./employee.css";


function UploadEmployeeData() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:8081/employ');
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
      } else {
        console.log('Failed to upload employee data.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <h1 className='thisisforheadingtag'>Upload Employee Data</h1>
      <form className='formforstatusofemployee' onSubmit={handleSubmit}>
        <label>
          <input className='inputtags' placeholder='Name' type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          <input className='inputtags' placeholder='Phone' type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </label>
        <label>
          <input className='inputtags' type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button className='uploadbuttoninemploy' type="submit">Upload Data</button>
      </form>
      <div className='gettingdatafromremian'>
        <h2>Fetched Employee Data</h2>
        
          <table className='ksdngwuerkgbsdvhdn'>
            <tr className='etxtfdsyucvshdfv'>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          {employees.map((employee) => (
            <tr className='etxtfdsyucvshdfv'>
              <td>{employee.name}</td>
              <td>{employee.phone}</td>
              <td>{employee.email}</td>
            </tr>
          ))}
          </table>
        
      </div>
    </div>
  );
}

export default UploadEmployeeData;
