import Hamburger from "../Hamburger/Hamburger";
import AddressDropdown from "./AddressDropdown";
import "./task.css"
import React, { useState } from 'react';

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
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            name,
            password,
            email,
            age,
            provideAddress,
            addressType,
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
                            <h6>Select Address</h6>
                            <input className="sameclassnaemforinouttags" placeholder="H.no,Street" type="text" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} />
                            <div>
                                <AddressDropdown />
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
                        <div>
                            <div>
                                <h2>Submitted Data</h2>
                                <pre>{JSON.stringify(submittedData, null, 2)}</pre>
                            </div>
                            <h6>
                                {props.selectedCountry}
                            </h6>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserForm;