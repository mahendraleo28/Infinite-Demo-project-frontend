import Hamburger from "../Hamburger/Hamburger";
import AddressDropdown from "./AddressDropdown";
import "./task.css"
import React, { useState , useEffect } from 'react';

const UserForm = (props) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [provideAddress, setProvideAddress] = useState(false);
    const [addressType, setAddressType] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [submittedData, setSubmittedData] = useState(null);
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

    // const [selectedCountryName, setSelectedCountryName] = useState('');

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
    const selectedCountry123 = countries.find((countries) => selectedCountry === countries.id ? countries.name :'No Countrty');
    const selectedState123 = states.find((states) => selectedState === states.id ? states.name :'No state');
    const selectedDisrtrict123 = districts.find((districts) => selectedDistrict === districts.id ? districts.name :'No district');
    const selectedMandal123 = mandals.find((mandals) => selectedMandal === mandals.id ? mandals.name :'No mandal');
    const selectedVillage123 = villages.find((villages) => selectedVillage === villages.id ? villages.name :'No village');

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

    

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            name,
            password,
            email,
            age,
            provideAddress,
            addressType,
            countries,
            streetAddress,
            postalCode,
        };
        setSubmittedData(formData);
    };

    return (
        <div>
            <Hamburger />
            <div className="togoelftsienkn">
                <form onSubmit={handleSubmit}>
                    <br />
                    <br />
                    <h1 className="textinhead">User Information Form</h1>
                    <div>
                        <input className="sameclassnaemforinouttags" placeholder="Username" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div>
                        <input className="sameclassnaemforinouttags" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div>
                        <input className="sameclassnaemforinouttags" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <input className="sameclassnaemforinouttags" placeholder="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
                    </div>
                    <br />
                    <div>
                        <label>Do you want to provide an address?</label>
                        <label>
                            <input type="radio" value="yes" checked={provideAddress} onChange={() => setProvideAddress(true)} />
                            Yes
                        </label>
                        <label>
                            <input type="radio" value="no" checked={!provideAddress} onChange={() => setProvideAddress(false)} />
                            No
                        </label>
                    </div>
                    <br />
                    {provideAddress && (
                        <div>
                            <h6 className="wmidh">Select Address</h6>
                            <input className="sameclassnaemforinouttags" placeholder="H.no,Street" type="text" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} />
                            <div>
                                {/* <AddressDropdown /> */}
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
                            </div>
                        </div>
                    )}
                    {provideAddress && (
                        <div>
                            <input className="sameclassnaemforinouttags" placeholder="Postal Code" type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                        </div>
                    )}
                    {provideAddress && (
                        <div>
                            <label className="ldsjbgfdkgbjk">Address Type:</label>
                            <select className="sameclassnaemforinouttags1" value={addressType} onChange={(e) => setAddressType(e.target.value)}>
                                <option value="">Select</option>
                                <option value="home">Home</option>
                                <option value="work">Work</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    )}
                    <br />
                    <div>
                        <label>
                            <input type="checkbox" required />
                            I agree to the terms and conditions.
                        </label>
                    </div>
                    <br />
                    <button className="buttontosbumittheform" type="submit">Submit</button>
                </form>
                <br />
                <br />
                <br />
                <div className="submitted-data">
                    {submittedData && (
                            <div className="names-submit-data">
                                <h3>Name:{name}</h3>
                                <h3>Email:{email}</h3>
                                <h3>Age:{age}</h3>
                                <h3>Address Type:{addressType}</h3>
                                <h3>Street Address:{streetAddress}</h3>
                                <h3>Postal code:{postalCode}</h3>
                                <h3>Country:{selectedCountry123.name}</h3>
                                <h3>State:{selectedState123.name}</h3>
                                <h3>District:{selectedDisrtrict123.name}</h3>
                                <h3>Mandal:{selectedMandal123.name}</h3>
                                <h3>Village:{selectedVillage123.name}</h3>
                            </div>
                        
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserForm;