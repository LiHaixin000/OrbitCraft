import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FileText, Image, Video, Music, File } from 'lucide-react';
import '../pagesCss/ViewFilesPage.css';

function ViewFilesPage() {
  const [files, setFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const categories = [
    'Computer Science', 'Engineering', 'Business', 'Medicine', 'Law', 'Arts & Social Sciences',
    'Science', 'Design & Environment', 'Dentistry', 'Music', 'Others', 'No Category'
  ];

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

  const getFileIcon = (fileName) => {
    const fileExtension = fileName.split('.').pop().toLowerCase();
    switch (fileExtension) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <Image />;
      case 'mp4':
      case 'mkv':
      case 'avi':
        return <Video />;
      case 'mp3':
      case 'wav':
        return <Music />;
      case 'pdf':
      case 'doc':
      case 'docx':
      case 'txt':
        return <FileText />;
      default:
        return <File />;
    }
  };

  const groupedFiles = files.reduce((acc, file) => {
    const category = file.category || 'No Category';
    acc[category] = acc[category] || [];
    acc[category].push(file);
    return acc;
  }, {});

  return (
    <div className="view-files-page">
      <h2>Uploaded Files</h2>
      <div className="categories-container">
        {categories.map((category, index) => (
          <div key={index} className="category-container" onClick={() => setSelectedCategory(category)}>
            <h3>{category}</h3>
          </div>
        ))}
      </div>
      {selectedCategory && (
        <div className="files-section">
          <h3>{selectedCategory}</h3>
          <ul>
            {(groupedFiles[selectedCategory] || []).map((file, idx) => (
              <li key={idx}>
                <a href={file.url} target="_blank" rel="noopener noreferrer">
                  {getFileIcon(file.name)}
                  <span>{file.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ViewFilesPage;



