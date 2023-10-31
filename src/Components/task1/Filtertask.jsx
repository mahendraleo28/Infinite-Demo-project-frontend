import React, { useState, useEffect } from 'react';
import Hamburger from '../Hamburger/Hamburger';
import './filtertask.css';
import Modal from 'react-modal';

function Filtertask() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [warnings, setWarnings] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAllEmployees();
    fetchFilteredEmployees();
  }, []);

  // This method is used to fetch all the employees from backend
  const fetchAllEmployees = () => {
    setLoading(true); // Set loading to true before fetching
    fetch('http://localhost:8081/api/excelemploy/list')
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching all employees. Please try again later.');
        setLoading(false);
      });
  };

  // This method is used to fetch all the filtered employees
  const fetchFilteredEmployees = () => {
    setLoading(true); // Set loading to true before fetching
    fetch('http://localhost:8081/api/excelemploy/filtered-employees')
      .then((response) => response.json())
      .then((data) => {
        setFilteredEmployees(data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching filtered employees. Please try again later.');
        setLoading(false);
      });
  };

  // This method is used to upload the file
  // const handleFileUpload = () => {
  //   if (selectedFile) {
  //     setIsUploading(true); // Start uploading
  //     const formData = new FormData();
  //     formData.append('file', selectedFile);
  //     fetch('http://localhost:8081/api/excelemploy/upload', {
  //       method: 'POST',
  //       body: formData,
  //     })
  //       .then((response) => {
  //         setIsUploading(false); // Finished uploading
  //         if (response.ok) {
  //           alert('File upload successful');
  //           setSelectedFile(null); // Reset the selectedFile state to null

  //           // Reset the file input element
  //           const fileInput = document.getElementById('fileInput');
  //           if (fileInput) {
  //             fileInput.value = ''; // Clear the input value
  //           }

  //           // Fetch employee data again to update the tables
  //           fetchAllEmployees();
  //           fetchFilteredEmployees();
  //         } else {
  //           return response.text(); // Extract the error message
  //         }
  //       })
  //       .then((errorMessage) => {
  //         if (errorMessage) {
  //           setError(errorMessage); // Set the error message in state
  //         }
  //       })
  //       .catch((error) => {
  //         setError('Error uploading file. Please try again.');
  //       })
  //       .finally(() => {
  //         fetch('http://localhost:8081/api/excelemploy/warnings')
  //           .then((response) => response.json())
  //           .then((data) => {
  //             setWarnings(data);
  //           });
  //       });
  //   } else {
  //     alert('Please select an Excel file before submitting.');
  //   }
  // };

  const handleFileUpload = () => {
    if (selectedFile) {
      setIsUploading(true); // Start uploading
      const formData = new FormData();
      formData.append('file', selectedFile);
      fetch('http://localhost:8081/api/excelemploy/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          setIsUploading(false); // Finished uploading
          if (response.ok) {
            alert('File upload successful');
            setSelectedFile(null); // Reset the selectedFile state to null

            // Reset the file input element
            const fileInput = document.getElementById('fileInput');
            if (fileInput) {
              fileInput.value = ''; // Clear the input value
            }

            // Fetch employee data again to update the tables
            fetchAllEmployees();
            fetchFilteredEmployees();
          } else {
            return response.text(); // Extract the error message
          }
        })
        .then((errorMessage) => {
          if (errorMessage) {
            setError(errorMessage); // Set the error message in state
          }
        })
        .catch((error) => {
          setError('Error uploading file. Please try again.');
        })
        .finally(() => {
          fetch('http://localhost:8081/api/excelemploy/warnings')
            .then((response) => response.json())
            .then((data) => {
              setWarnings(data);
            });
        });
        setIsModalOpen(false);
    } else {
      // Open the modal if no file is selected
      setIsModalOpen(true);
    }
  };

  const closeUploadModal = () => {
    setIsModalOpen(false);
  };



  const handleRecipientEmailChange = (e) => {
    setRecipientEmail(e.target.value);
  }

  const modalStyles = {
    overlay: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.75)', // Semi-transparent background
      zIndex: 1000, // Adjust this value as needed
    },
    content: {
      position: 'relative',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      border: 'none',
      padding: '0',
      backgroundColor: 'transparent',
      color: 'white' // No background color
    },
  };

  const storeEmail = () => {
    if (recipientEmail.trim() === '') {
      alert('Please enter a valid recipient email address.');
      return;
    }

    // Make a POST request to the backend to store the email
    fetch('http://localhost:8081/api/excelemploy/store-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipientEmail }),
    })
      .then(response => {
        if (response.ok) {
          alert('Email stored successfully.');
        } else {
          alert('Failed to store email. Please try again later.');
        }
      })
      .catch(error => {
        alert('Error storing email: ' + error.message);
      });
  }

  const sendEmail = () => {
    // Make a POST request to the backend to send the email
    fetch('http://localhost:8081/api/excelemploy/send-warnings-email', {
      method: 'POST',
    })
      .then(response => {
        if (response.ok) {
          alert('Email sent successfully!');
        } else {
          alert('Failed to send email. Please try again later.');
        }
      })
      .catch(error => {
        alert('Error sending email: ' + error.message);
      });
  }

  return (
    <div>
      <Hamburger />
      <br />
      <br />
      <br />
      <div className='to-give-margin'>
        <div className='div-tag-for-background-to-3d-effect'>
          <h1 className='header-for-emp-data'>Employee Data</h1>
          <div className='this-is-to-store-the-email'>
          <label htmlFor="recipientEmail">Recipient Email:</label>
            <input
              type="email"
              id="recipientEmail"
              value={recipientEmail}
              onChange={handleRecipientEmailChange}
              required
            />
          <button onClick={storeEmail}>Store Email</button>
          </div>
          <input
            id="fileInput"
            className='input-tag-to-upload-excel'
            type='file'
            accept='.xlsx'
            onChange={(event) => setSelectedFile(event.target.files[0])}
          />
          <br />
          <span className='text-in-span-tag-for-filter'>*The format of the excel sheet is FirstName,LastName,CeoCid,Date-of-birth,Mail</span>
          <button
            className='button-to-submit-excel'
            onClick={handleFileUpload}
            disabled={isUploading} // Disable the button during upload
          >
            {isUploading ? 'Uploading...' : 'Submit'}
          </button>
          <br />
          <br />
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {error && <div className="error-alert">{error}</div>}
              {warnings.length > 0 && (
                <div className='warning-messages'>
                  <ul>
                    {warnings.map((warning, index) => (
                      <ul key={index}>{warning}</ul>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
        <div>
      <button onClick={handleFileUpload}>Upload File</button>

      {/* Define the modal */}
      {/* <Modal 
        isOpen={isModalOpen}
        style={modalStyles}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="No File Selected Modal"
      >
        <h2 className='this-is-for-h2tag-for-visble'>Please select an Excel file before submitting.</h2>
        {/* <button className='this-is-for-close-button' onClick={() => setIsModalOpen(false)}>Close</button> */}
        {/* <button className='this-is-for-close-button' onClick={closeUploadModal}>Close</button> */}
      {/* </Modal> */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeUploadModal}
        shouldCloseOnOverlayClick={false} // Prevent closing when clicking outside the modal
        style={modalStyles}
        contentLabel="No File Selected Modal"
      >
        <h2 className='this-is-for-h2tag-for-visble'>Please select an Excel file before submitting.</h2>
        <button className='this-is-for-close-button' onClick={closeUploadModal}>Close</button>
      </Modal>
    </div>
        <div className='div-for-two-tables'>
          <div className='gwild'>
            <h2>All Employees</h2>
            {loading && <p>Loading...</p>}
            <table className='table-in-filtertask-allemp'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Ceocid</th>
                  <th>Date-of-Birth</th>
                  <th>Age</th>
                  <th>Mail</th>
                  <th>Eligibility Status</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.firstName} {employee.lastName}</td>
                    <td>{employee.ceoCid}</td>
                    <td>{new Date(employee.dateOfBirth).toLocaleDateString()}</td>
                    <td>{employee.age} years old</td>
                    <td>{employee.mail}</td>
                    <td>{employee.eligibilityStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <br />
          <div className='employee-filter'>
            <h2>Filtered Employees</h2>
            {loading && <p>Loading...</p>}
            <table className='table-in-filtertask-filteremploy'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Ceocid</th>
                  <th>Date-of-birth</th>
                  <th>Age</th>
                  <th>Mail</th>
                  <th>Eligibility Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.firstName} {employee.lastName}</td>
                    <td>{employee.ceoCid}</td>
                    <td>{new Date(employee.dateOfBirth).toLocaleDateString()}</td>
                    <td>{employee.age} years old</td>
                    <td>{employee.mail}</td>
                    <td>{employee.eligibilityStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h6 className='matter'>*Filtered Employees are eligible to take the internal courses</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filtertask;