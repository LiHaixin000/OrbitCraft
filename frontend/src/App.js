import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Header />
      <main style={styles.main}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
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
