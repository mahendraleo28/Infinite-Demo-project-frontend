import "./addressdropdown.css";
import React, { useState, useEffect } from 'react';

const AddressDropdown = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [mandals, setMandals] = useState([]);
  const [villages, setVillages] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedMandal, setSelectedMandal] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/countries');
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchStates = async (countryId) => {
    try {
      const response = await fetch(`http://localhost:8081/api/states/byCountry/${countryId}`);
      const data = await response.json();
      setStates(data);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const fetchDistricts = async (stateId) => {
    try {
      const response = await fetch(`http://localhost:8081/api/districts/byState/${stateId}`);
      const data = await response.json();
      setDistricts(data);
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  const fetchMandals = async (districtId) => {
    try {
      const response = await fetch(`http://localhost:8081/api/mandals/byDistrict/${districtId}`);
      const data = await response.json();
      setMandals(data);
    } catch (error) {
      console.error('Error fetching mandals:', error);
    }
  };

  const fetchVillages = async (mandalId) => {
    try {
      const response = await fetch(`http://localhost:8081/api/villages/byMandal/${mandalId}`);
      const data = await response.json();
      setVillages(data);
    } catch (error) {
      console.error('Error fetching villages:', error);
    }
  };

  const handleCountryChange = (event) => {
    const selectedCountryId = event.target.value;
    setSelectedCountry(selectedCountryId);
    setSelectedState('');
    setSelectedDistrict('');
    setSelectedMandal('');
    setSelectedVillage('');
    fetchStates(selectedCountryId);
    
  };
 

  const handleStateChange = (event) => {
    const selectedStateId = event.target.value;
    setSelectedState(selectedStateId);
    setSelectedDistrict('');
    setSelectedMandal('');
    setSelectedVillage('');
    fetchDistricts(selectedStateId);
  };

  const handleDistrictChange = (event) => {
    const selectedDistrictId = event.target.value;
    setSelectedDistrict(selectedDistrictId);
    setSelectedMandal('');
    setSelectedVillage('');
    fetchMandals(selectedDistrictId);
  };

  const handleMandalChange = (event) => {
    const selectedMandalId = event.target.value;
    setSelectedMandal(selectedMandalId);
    setSelectedVillage('');
    fetchVillages(selectedMandalId);
  };

  return (
    <div className="main-container">
      <select className='advfhsdvfsd' value={selectedCountry} onChange={handleCountryChange}>
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option className="option-tag-for-select" key={country.id} value={country.id}>
            {country.name}
          </option>
        ))}
      </select>

      <select className='advfhsdvfsd' value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
        <option value="">Select State</option>
        {states.map((state) => (
          <option className="option-tag-for-select" key={state.id} value={state.id}>
            {state.name}
          </option>
        ))}
      </select>

      <select className='advfhsdvfsd' value={selectedDistrict} onChange={handleDistrictChange} disabled={!selectedState}>
        <option value="">Select District</option>
        {districts.map((district) => (
          <option className="option-tag-for-select" key={district.id} value={district.id}>
            {district.name}
          </option>
        ))}
      </select>

      <select className='advfhsdvfsd' value={selectedMandal} onChange={handleMandalChange} disabled={!selectedDistrict}>
        <option value="">Select Mandal</option>
        {mandals.map((mandal) => (
          <option className="option-tag-for-select" key={mandal.id} value={mandal.id}>
            {mandal.name}
          </option>
        ))}
      </select>

      <select className='advfhsdvfsd' value={selectedVillage} onChange={(e) => setSelectedVillage(e.target.value)} disabled={!selectedMandal}>
        <option value="">Select Village</option>
        {villages.map((village) => (
          <option className="option-tag-for-select" key={village.id} value={village.id}>
            {village.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AddressDropdown;
