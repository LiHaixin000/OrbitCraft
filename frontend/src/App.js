// frontend/src/App.js
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import MentorshipPage from './pages/MentorshipPage';
import StudyGroupPage from './pages/StudyGroupPage';
import ResourcesPage from './pages/ResourcesPage';
import CareerInsightsPage from './pages/CareerInsightsPage';
import GroupChat from './components/GroupChat'; // Import the GroupChat component
import Header from './components/Header';
import Footer from './components/Footer';
import Profile from './pages/Profile'; // Import the Profile component

function App() {
  const location = useLocation(); // Hook to get the current route

  return (
    <div style={styles.appContainer}> {/* Ensure the styles are applied */}
      {location.pathname !== '/auth' && <Header />} {/* Conditionally render Header */}
      <main style={styles.mainContent}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/mentorship" element={<MentorshipPage />} />
          <Route path="/studygroup" element={<StudyGroupPage />} />
          <Route path="/resourcesharing" element={<ResourcesPage />} />
          <Route path="/careerinsights" element={<CareerInsightsPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/groups/:groupName" element={<GroupChat />} /> {/* Add the group chat route */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    width: '100vw',
    overflow: 'hidden', // Prevent any overflow
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    width: '100%', // Ensure it takes the full width
    overflow: 'hidden', // Prevent any overflow
  },
};

export default App;
