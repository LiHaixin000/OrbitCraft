import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

// Find the root element in your HTML
const rootElement = document.getElementById('root');

// Create a root
const root = createRoot(rootElement);

// Initial render
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
