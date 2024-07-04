// frontend/src/pages/ResourcesPage.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../pagesCss/ResourcesPage.css';

function ResourcesPage() {
  const [uploadStatus, setUploadStatus] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [allFiles, setAllFiles] = useState([]);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  console.log('API_BASE_URL:', API_BASE_URL);

  const buildUrl = (base, path) => {
    if (base.endsWith('/')) {
      base = base.slice(0, -1);
    }
    if (!path.startsWith('/')) {
      path = '/' + path;
    }
    return base + path;
  };

  const fetchAllFiles = useCallback(() => {
    const url = buildUrl(API_BASE_URL, '/api/resources/files');
    axios.get(url)
      .then(response => setAllFiles(response.data))
      .catch(error => console.error('Error fetching files:', error));
  }, [API_BASE_URL]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const url = buildUrl(API_BASE_URL, '/api/resources/check');
      axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          setUploadStatus(response.data.uploadStatus);
          if (response.data.uploadStatus) {
            fetchAllFiles();
          }
        })
        .catch(error => console.error('Error fetching upload status:', error));
    }
  }, [API_BASE_URL, fetchAllFiles]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (!selectedFile) {
      alert('Please select a file to upload');
      return;
    }
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', selectedFile);

    const url = buildUrl(API_BASE_URL, '/api/resources/upload');
    axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setUploadStatus(true);
        fetchAllFiles();
        alert('File uploaded successfully');
      })
      .catch(error => {
        console.error('Error uploading file:', error);
        alert('File upload failed');
      });
  };

  return (
    <div className="resources-page">
      <h2>Upload a File</h2>
      <p className="upload-explanation">You do not have a history of uploading files, you need to upload files to access the resource.</p>
      {!uploadStatus ? (
        <div className="upload-section">
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="fileInput"
          />
          <button className="cssbuttons-io-button" onClick={() => document.getElementById('fileInput').click()}>
            <svg viewBox="0 0 640 512" fill="white" height="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
            </svg>
            <span>Upload</span>
          </button>
          <button onClick={handleFileUpload} className="upload-button">Upload File</button>
        </div>
      ) : (
        <div className="files-section">
          <h3>Uploaded Files</h3>
          <ul>
            {allFiles.map((file, index) => (
              <li key={index}>{file}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ResourcesPage;

