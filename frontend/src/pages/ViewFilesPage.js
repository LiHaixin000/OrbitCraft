import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FileText, Image, Video, Music, File, ArrowLeft } from 'lucide-react'; // Added ArrowLeft
import '../pagesCss/ViewFilesPage.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const styles = {
  feature: {
    flex: '1 1 calc(33.333% - 30px)',
    maxWidth: 'calc(33.333% - 30px)',
    minWidth: '250px',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  featureHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
  title: {
    color: '#333',
    fontSize: '24px',
    marginBottom: '10px',
    textAlign: 'center',
  },
  description: {
    color: '#666',
    fontSize: '16px',
    marginBottom: '10px',
    textAlign: 'center',
  },
  link: {
    color: '#ff7043',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

function ViewFilesPage() {
  const [files, setFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate(); // Initialize useNavigate

  const categories = [
    'Computer Science', 'Engineering', 'Business', 'Math', 'Law', 'Arts & Social Sciences',
    'Science', 'Design & Environment', 'Medicine', 'Music', 'Others', 'No Category'
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
        return <Image size={24} />;
      case 'mp4':
      case 'mkv':
      case 'avi':
        return <Video size={24} />;
      case 'mp3':
      case 'wav':
        return <Music size={24} />;
      case 'pdf':
      case 'doc':
      case 'docx':
      case 'txt':
        return <FileText size={24} />;
      default:
        return <File size={24} />;
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
      <button className="back-button" onClick={() => navigate('/resourcesharing')}>
        <ArrowLeft size={32} /> {/* Increase the size of the icon */}
      </button>
      <h2>Uploaded Files</h2>
      <div className="categories-container">
        {categories.map((category, index) => (
          <div
            key={index}
            className="category-container"
            onClick={() => setSelectedCategory(category)}
            style={styles.feature}
          >
            <h3>{category}</h3>
          </div>
        ))}
      </div>
      {selectedCategory && (
        <div className="files-section">
          <div className="files-header">
            <h3>{selectedCategory}</h3>
            <button className="view-toggle-button" onClick={() => setViewMode(viewMode === 'list' ? 'icon' : 'list')}>
              {viewMode === 'list' ? 'Switch to Icon View' : 'Switch to List View'}
            </button>
          </div>
          <ul className={`files-list ${viewMode}`}>
            {(groupedFiles[selectedCategory] || []).map((file, idx) => (
              <li key={idx} className={viewMode === 'icon' ? 'icon-view' : ''}>
                <a href={file.url} target="_blank" rel="noopener noreferrer" className="file-link">
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

