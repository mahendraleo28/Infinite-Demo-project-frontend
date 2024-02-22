import React, { useState, useEffect } from 'react';
import Hamburger from "../Hamburger/Hamburger";
import "./multidb.css";

function Multipledb() {
  const [db1Data, setDb1Data] = useState([]);
  const [db2Data, setDb2Data] = useState([]);
  const [db3Data, setDb3Data] = useState([]);
  const [formData, setFormData] = useState({ id: '', name: '' });
  const [formData1, setFormData1] = useState({ id: '', name: '' });
  const [formData2, setFormData2] = useState({ id: '', name: '' });

  useEffect(() => {
    const fetchDb1Data = async () => {
      try {
        const response = await fetch('http://localhost:7979/db1/all');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setDb1Data(result);
      } catch (error) {
        console.error('Error fetching db1 data:', error);
      }
    };

    const fetchDb2Data = async () => {
      try {
        const response = await fetch('http://localhost:7979/db2/all');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setDb2Data(result);
      } catch (error) {
        console.error('Error fetching db2 data:', error);
      }
    };
    const fetchDb3Data = async () => {
      try {
        const response = await fetch('http://localhost:7979/db3/all');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setDb3Data(result);
      } catch (error) {
        console.error('Error fetching db3 data:', error);
      }
    };

    fetchDb1Data();
    fetchDb2Data();
    fetchDb3Data();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("FormData:", formData); // Log formData before sending
      const response = await fetch('http://localhost:7979/db1/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert("sent data successfull");
        setFormData('');

      }

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setFormData1({ ...formData1, [name]: value });
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    try {
      console.log("FormData1:", formData1); // Log formData before sending
      const response = await fetch('http://localhost:7979/db2/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData1)
      });
      if (response.ok) {
        alert("sent data successfull");
        setFormData1('');

      }

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setFormData2({ ...formData2, [name]: value });
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    try {
      console.log("FormData2:", formData2); // Log formData before sending
      const response = await fetch('http://localhost:7979/db3/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData2)
      });
      if (response.ok) {
        alert("sent data successfull");
        setFormData2('');

      }

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div>
      <div className="forhamburgermenuinsearch">
        <Hamburger />
      </div>
      <div className="container">
        <h3 className="container-for-remainnng-space-in-multidb">Sending Data to Multiple DataBase</h3>
        <form onSubmit={handleSubmit}>
          <span className='span-tag-in-multidb'>Database 1 :</span>
          <input className='for-input-tags-in-multidb' type="text" name="id" placeholder="Enter ID" value={formData.id} onChange={(e) => handleChange(e, setFormData)} />
          <input className='for-input-tags-in-multidb' type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={(e) => handleChange(e, setFormData)} />
          <button className='button-tag-in-multidb-page' type="submit">Save</button>
        </form>
        <form className='form-tag-in-multidb' onSubmit={handleSubmit1}>
          <span className='span-tag-in-multidb'>Database 2 :</span>
          <input className='for-input-tags-in-multidb' type="text" name="id" placeholder="Enter ID" value={formData1.id} onChange={(e) => handleChange1(e, setFormData1)} />
          <input className='for-input-tags-in-multidb' type="text" name="name" placeholder="Enter Name" value={formData1.name} onChange={(e) => handleChange1(e, setFormData1)} />
          <button className='button-tag-in-multidb-page' type="submit">Save</button>
        </form>
        <form className='form-tag-in-multidb' onSubmit={handleSubmit2}>
          <span className='span-tag-in-multidb'>Database 3 :</span>
          <input className='for-input-tags-in-multidb' type="text" name="id" placeholder="Enter ID" value={formData2.id} onChange={(e) => handleChange2(e, setFormData2)} />
          <input className='for-input-tags-in-multidb' type="text" name="name" placeholder="Enter Name" value={formData2.name} onChange={(e) => handleChange2(e, setFormData2)} />
          <button className='button-tag-in-multidb-page' type="submit">Save</button>
        </form>
        <h3 className="container-for-remainnng-space-in-multib">Data From The Multiple DataBase</h3>
        <div className='div-tag-for-all-tables-in-multidb'>
          <div>
            <h3 className='header-tag-fordb-dat'>Db1 details</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {db1Data.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h3 className='header-tag-fordb-dat'>Db2 details</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {db2Data.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h3 className='header-tag-fordb-dat'>Db3 details</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {db3Data.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Multipledb;