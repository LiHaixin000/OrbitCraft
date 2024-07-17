// frontend/src/pages/ResourcesPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../pagesCss/ResourcesPage.css';

function ResourcesPage() {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate(); // Initialize useNavigate

  console.log('API_BASE_URL:', API_BASE_URL);
  console.log('ResourcesPage component rendered');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log('File input change event triggered');
    console.log('File selected:', file);
    handleFileUpload(file); // Call handleFileUpload after file selection
  };

  const handleFileUpload = async (file) => {
    console.log('handleFileUpload called');
    if (!file) {
      toast.error('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const url = `${API_BASE_URL}/api/resources/upload`;
    console.log('Uploading to:', url);

    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File upload response:', response.data);
      toast.success('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
        toast.error('File upload failed: ' + error.response.data.message);
      } else if (error.request) {
        console.error('Error request:', error.request);
        toast.error('File upload failed: No response from server');
      } else {
        console.error('Error message:', error.message);
        toast.error('File upload failed: ' + error.message);
      }
    }
  };

  return (
    <div className="resources-page">
      <ToastContainer />
      <h2>Upload a File</h2>
      <div className="upload-section">
        <input
          type="file"
          onChange={(event) => {
            console.log('File input change handler attached');
            handleFileChange(event);
          }}
          style={{ display: 'none' }}
          id="fileInput"
        />
        <button className="cssbuttons-io-button" onClick={() => {
          console.log('Upload button clicked');
          document.getElementById('fileInput').click();
        }}>
          <svg viewBox="0 0 640 512" fill="white" height="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
          </svg>
          <span>Upload</span>
        </button>
      </div>
      <div className="view-files-container" onClick={() => navigate('/view-files')}>
        <span>View Uploaded Files</span>
      </div>
    </div>
  );
}

export default ResourcesPage;















