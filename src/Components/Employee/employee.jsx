import React, { useState , useEffect} from 'react';
import "./employee.css";
import Hamburger from "../Hamburger/Hamburger";


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
        console.log(data)
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
      <Hamburger/>
      <br/>
      <div className='forsomethingtomovedown'>
      <form className='formforstatusofemployee' onSubmit={handleSubmit}>
      <h1 className='thisisforheadingtag'>Upload Employee Data</h1>
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
              <th>Officer Status</th>
              <th>Officer comment</th>
              <th>Admin Status</th>
              <th>Admin comment</th>
            </tr>
          {employees.map((employee) => (
            <tr className='etxtfdsyucvshdfv'>
              <td>{employee.name}</td>
              <td>{employee.phone}</td>
              <td>{employee.email}</td>
              <td>{employee.status || "pending"}</td>
              <td>{employee.comment ||"pending"}</td>
              <td>{employee.admin_status || "pending"}</td>
              <td>{employee.comment1|| "pending"}</td>
            </tr>
          ))}
          </table>
          </div>
      </div>
    </div>
  );
}

export default UploadEmployeeData;
