import React, { useState, useEffect } from 'react';
import Hamburger from "../Hamburger/Hamburger";
import "./multidb.css";

function Multipledb() {
    const [db1Data, setDb1Data] = useState([]);
    const [db2Data, setDb2Data] = useState([]);
    const [db3Data, setDb3Data] = useState([]);
    
  
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
    

  return (
    <div>
      <div className="forhamburgermenuinsearch">
        <Hamburger/>
      </div>
      <div className="container">
        <h3 className="container-for-remainnng-space-in-multidb">Data From The Multiple DataBase</h3>
        <div className='div-tag-for-all-tables-in-multidb'>
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
      </div>
    </div>
  );
}

export default Multipledb;