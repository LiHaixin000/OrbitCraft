// frontend/src/App.js
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import MentorshipPage from './pages/MentorshipPage';
import StudyGroupPage from './pages/StudyGroupPage';
import ResourcesPage from './pages/ResourcesPage';
import CareerInsightsPage from './pages/CareerInsightsPage';
import GroupChat from './components/GroupChat';
import Header from './components/Header';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import ViewPosts from './components/ViewPosts';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <div style={styles.appContainer}>
        {location.pathname !== '/auth' && <Header />}
        <main style={styles.mainContent}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/mentorship" element={<PrivateRoute><MentorshipPage /></PrivateRoute>} />
            <Route path="/studygroup" element={<PrivateRoute><StudyGroupPage /></PrivateRoute>} />
            <Route path="/resourcesharing" element={<PrivateRoute><ResourcesPage /></PrivateRoute>} />
            <Route path="/careerinsights" element={<PrivateRoute><CareerInsightsPage /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/groups/:groupName" element={<PrivateRoute><GroupChat /></PrivateRoute>} />
            <Route path="/view-posts" element={<PrivateRoute><ViewPosts /></PrivateRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    width: '100vw',
    overflow: 'hidden',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden',
  },
};

export default App;


