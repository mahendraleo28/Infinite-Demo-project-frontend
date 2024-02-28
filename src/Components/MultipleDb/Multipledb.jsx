import React, { useEffect, useState } from 'react';
import Hamburger from "../Hamburger/Hamburger";
import "./multidb.css";

function Multipledb() {
  const [db1Data, setDb1Data] = useState([]);
  const [db2Data, setDb2Data] = useState([]);
  const [db3Data, setDb3Data] = useState([]);

  const [formData, setFormData] = useState({ id: '', name: '', email: '', phone: '' });
  const [formData1, setFormData1] = useState({ id: '', name: '', email: '', phone: '' });
  const [formData2, setFormData2] = useState({ id: '', name: '', email: '', phone: '' });

  // useEffect(() => {
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

  useEffect(() => {
    fetchDb1Data();
    fetchDb2Data();
    fetchDb3Data();
  }, []);

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    const newValue = value.replace(/\s+/g, ' ').trim();
    const sanitizedValue = newValue.replace(/[^A-Za-z ]/gi, '');
    setFormData({ ...formData, [name]: sanitizedValue });
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = value.replace(/[^A-Za-z0-9.@]/gi, ''); // Allow alphabets, numbers, dots, and '@'
    const newValue = sanitizedValue.replace(/\.+/g, '.'); // Remove multiple consecutive dots
    const newValue1 = newValue.replace(/\.@/g, '@'); // Remove dot before '@'
    setFormData({ ...formData, [name]: newValue1 });
  };

  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = value.replace(/\s+/g, '').trim(); // Remove whitespace
    const newValue = sanitizedValue.replace(/\D/g, ''); // Remove non-digit characters
    const onlyten = newValue.substring(0, 10);
    setFormData({ ...formData, [name]: onlyten });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in all required fields.");
      return;
    }
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
        fetchDb1Data();
        alert("sent data successfull");
        setFormData({ id: '', name: '', email: '', phone: '' });

      }
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleNameChange1 = (e) => {
    const { name, value } = e.target;
    const newValue = value.replace(/\s+/g, ' ').trim(); // to remove spaces
    const sanitizedValue = newValue.replace(/[^A-Za-z ]/gi, ''); // Allow alphabets only
    setFormData1({ ...formData1, [name]: sanitizedValue });
  };
  const handleEmailChange1 = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = value.replace(/[^A-Za-z0-9.@]/gi, ''); // Allow alphabets, numbers, dots, and '@'
    const newValue = sanitizedValue.replace(/\.+/g, '.'); // Remove multiple consecutive dots
    const newValue1 = newValue.replace(/\.@/g, '@'); // Remove dot before '@'
    setFormData1({ ...formData1, [name]: newValue1 });
  }
  const handlePhoneChange1 = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = value.replace(/\s+/g, '').trim(); // Remove whitespace
    const newValue = sanitizedValue.replace(/\D/g, ''); // Remove non-digit characters
    const onlyten = newValue.substring(0, 10);
    setFormData1({ ...formData1, [name]: onlyten });
  }

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
        fetchDb2Data();
        alert("sent data successfull");
        setFormData1({ id: '', name: '', email: '', phone: '' });

      }

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleNameChange2 = (e) => {
    const { name, value } = e.target;
    const newValue = value.replace(/\s+/g, ' ').trim();
    const sanitizedValue = newValue.replace(/[^A-Za-z ]/gi, '');
    setFormData2({ ...formData2, [name]: sanitizedValue });
  };
  const handleEmailChange2 = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = value.replace(/[^A-Za-z0-9.@]/gi, ''); // Allow alphabets, numbers, dots, and '@'
    const newValue = sanitizedValue.replace(/\.+/g, '.'); // Remove multiple consecutive dots
    const newValue1 = newValue.replace(/\.@/g, '@'); // Remove dot before '@'
    setFormData2({ ...formData2, [name]: newValue1 });
  }
  const handlePhoneChange2 = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = value.replace(/\s+/g, '').trim(); // Remove whitespace
    const newValue = sanitizedValue.replace(/\D/g, ''); // Remove non-digit characters
    const onlyten = newValue.substring(0, 10);
    setFormData2({ ...formData2, [name]: onlyten });
  }

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
        fetchDb3Data();
        alert("sent data successfull");
        setFormData2({ id: '', name: '', email: '', phone: '' })
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
          {/* <input className='for-input-tags-in-multidb' type="text" name="id" placeholder="Enter ID" value={formData.id} onChange={(e) => handleChange(e, setFormData)}  required/> */}
          <input className='for-input-tags-in-multidb' type="text" name="name" placeholder="Enter First Name" value={formData.name} onChange={(e) => handleNameChange(e, setFormData)} required pattern="[A-Za-z ]+" title="Name must contain only alphabets" />
          <input className='for-input-tags-in-multidb' type='email' name="email" placeholder='Enter Email' value={formData.email} onChange={(e) => handleEmailChange(e)} required title="Email must end with .com" />
          <input className='for-input-tags-in-multidb' type='text' name='phone' placeholder='Enter Phone Number (10 digits)' value={formData.phone} onChange={(e) => handlePhoneChange(e)} required pattern="\d{10}" title="Phone number should be 10 digits" />
          <button className='button-tag-in-multidb-page' type="submit">Save</button>
        </form>
        <form className='form-tag-in-multidb' onSubmit={handleSubmit1}>
          <span className='span-tag-in-multidb'>Database 2 :</span>
          {/* <input className='for-input-tags-in-multidb' type="text" name="id" placeholder="Enter ID" value={formData1.id} onChange={(e) => handleChange1(e, setFormData1)} required/> */}
          <input className='for-input-tags-in-multidb' type="text" name="name" placeholder="Enter First Name" value={formData1.name} onChange={(e) => handleNameChange1(e, setFormData1)} required pattern="[A-Za-z ]+" title="Name must contain only alphabets" />
          <input className='for-input-tags-in-multidb' type='email' name="email" placeholder='Enter Email' value={formData1.email} onChange={(e) => handleEmailChange1(e, setFormData1)} required />
          <input className='for-input-tags-in-multidb' type='text' name='phone' placeholder='Enter Phone Number (10 digits)' value={formData1.phone} onChange={(e) => handlePhoneChange1(e, setFormData1)} required pattern="\d{10}" title="Phone number should be 10 digits" />
          <button className='button-tag-in-multidb-page' type="submit">Save</button>
        </form>
        <form className='form-tag-in-multidb' onSubmit={handleSubmit2}>
          <span className='span-tag-in-multidb'>Database 3 :</span>
          {/* <input className='for-input-tags-in-multidb' type="text" name="id" placeholder="Enter ID" value={formData2.id} onChange={(e) => handleChange2(e, setFormData2)} required /> */}
          <input className='for-input-tags-in-multidb' type="text" name="name" placeholder="Enter First Name" value={formData2.name} onChange={(e) => handleNameChange2(e, setFormData2)} required pattern="[A-Za-z ]+" title="Name must contain only alphabets" />
          <input className='for-input-tags-in-multidb' type='email' name="email" placeholder='Enter Email' value={formData2.email} onChange={(e) => handleEmailChange2(e, setFormData2)} required />
          <input className='for-input-tags-in-multidb' type='text' name='phone' placeholder='Enter Phone Number (10 digits)' value={formData2.phone} onChange={(e) => handlePhoneChange2(e, setFormData2)} required pattern="\d{10}" title="Phone number should be 10 digits" />
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
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {db1Data.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <br />
          <div>
            <h3 className='header-tag-fordb-dat'>Db2 details</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {db2Data.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
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
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {db3Data.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
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