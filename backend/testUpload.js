const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const API_BASE_URL = 'http://localhost:5001'; // Replace with your backend URL

const testFileUpload = async () => {
  const formData = new FormData();
  const filePath = '/path/to/your/test-file.txt'; // Replace with your test file path
  formData.append('file', fs.createReadStream(filePath));

  try {
    const response = await axios.post(`${API_BASE_URL}/api/resources/upload`, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });
    console.log('File upload response:', response.data);
  } catch (error) {
    console.error('Error uploading file:', error.response ? error.response.data : error.message);
  }
};

testFileUpload();
