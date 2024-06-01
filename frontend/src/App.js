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
  main: {
    paddingTop: '60px', // Adjust this value based on your header's height
  },
};

export default App;
