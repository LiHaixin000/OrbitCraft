import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../pagesCss/ViewFilesPage.css';

function ViewFilesPage() {
  const [files, setFiles] = useState([]);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/resources/list`);
        setFiles(response.data.files);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, [API_BASE_URL]);

  return (
    <div className="view-files-page">
      <h2>Uploaded Files</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewFilesPage;
