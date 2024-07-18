// frontend/src/pages/ResourcesPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './commonStyles.css'; // Import the common styles
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../pagesCss/ResourcesPage.css';

function ResourcesPage() {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false); // New state for preview loading
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newFileName, setNewFileName] = useState(''); // New state for the file name

  const categories = [
    'Computer Science', 'Engineering', 'Business', 'Math', 'Law', 'Arts & Social Sciences',
    'Science', 'Design & Environment', 'Medicine', 'Music', 'Others'
  ];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      console.log('Selected file:', file);
      setPreviewLoading(true); // Set loading state to true
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        setPreviewLoading(false); // Set loading state to false
        console.log('Preview URL:', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file to upload');
      return;
    }

    if (!selectedCategory) {
      toast.error('Please select a category');
      return;
    }

    if (!newFileName) {
      toast.error('Please enter a new file name');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('category', selectedCategory);
    formData.append('newFileName', newFileName); // Add the new file name to the form data

    const url = `${API_BASE_URL}/api/resources/upload`;

    try {
      await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });

      toast.success('File uploaded successfully');
      setSelectedFile(null);
      setUploadProgress(0);
      setPreviewUrl(null);
      setSelectedCategory('');
      setNewFileName(''); // Reset the file name input
    } catch (error) {
      console.error('Error uploading file:', error);
      if (error.response) {
        toast.error('File upload failed: ' + error.response.data.message);
      } else if (error.request) {
        toast.error('File upload failed: No response from server');
      } else {
        toast.error('File upload failed: ' + error.message);
      }
      setUploadProgress(0);
    }
  };

  return (
    <div className="resources-container">
      <button className="back-button" onClick={() => navigate('/')}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7M8 12H21" />
        </svg>
      </button>
      <ToastContainer />
      <h2>Upload a File</h2>
      <p className="description">Please follow the steps below to upload your file. Ensure the file is in the correct format and category.</p>
      <div className="upload-section">
        <input
          type="file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="fileInput"
        />
        <div className="button-group">
          <button
            className="cssbuttons-io-button"
            onClick={() => {
              document.getElementById('fileInput').click();
            }}
          >
            <svg viewBox="0 0 640 512" fill="white" height="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
            </svg>
            <span>Choose File</span>
          </button>
          <input
            type="text"
            placeholder="Enter new file name"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            className="file-name-input"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            <option value="" disabled>Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
          <button
            className="cssbuttons-io-button"
            onClick={handleFileUpload}
          >
            <span>Submit Upload</span>
          </button>
          <button
            className="cssbuttons-io-button"
            onClick={() => navigate('/view-files')}
          >
            <span>View Uploaded Files</span>
          </button>
        </div>
        {previewLoading && (
          <div className="preview-loading">
            <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="gray" strokeWidth="4" fill="none" />
              <path fill="gray" d="M12 2a10 10 0 0 0-7.071 17.071l14.142-14.142A9.953 9.953 0 0 0 12 2z">
                <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite" />
              </path>
            </svg>
            <p>Loading preview...</p>
          </div>
        )}
        {previewUrl && !previewLoading && (
          <div className="file-preview">
            {selectedFile && selectedFile.type === 'application/pdf' ? (
              <embed src={previewUrl} type="application/pdf" width="100%" height="400px" />
            ) : selectedFile && selectedFile.type.startsWith('image/') ? (
              <img src={previewUrl} alt="File Preview" />
            ) : (
              <div className="file-icon">
                <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                  <path fill="gray" d="M6 2h9l5 5v15H6zM5 0h10l6 6v16a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm7 14h4v2h-4v-2zm-4-2h8v2H8v-2zm0-2h8v2H8V8z"/>
                </svg>
                <p>{selectedFile.name}</p>
              </div>
            )}
          </div>
        )}
        {uploadProgress > 0 && (
          <div className="progress-bar">
            <div className="progress" style={{ width: `${uploadProgress}%` }}></div>
          </div>
        )}
      </div>
      <div className="instructions">
        <h3>Instructions to Upload Files</h3>
        <ol>
          <li>Click on the "Choose File" button to select the file you want to upload.</li>
          <li>Preview the selected file to ensure it is correct. (Preview may take very long if the file is too big)</li>
          <li>Enter a meaningful name for the file in the "Enter new file name" field.</li>
          <li>Select the appropriate category for the file from the dropdown menu.</li>
          <li>Click on the "Submit Upload" button to upload the file.</li>
          <li>Once the upload is complete, you will see a success message.</li>
          <li>You can click on the "View Uploaded Files" button to see all uploaded files.</li>
        </ol>
      </div>
    </div>
  );
}

export default ResourcesPage;
