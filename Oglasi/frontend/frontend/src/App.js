import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddAdvertisementPage from './pages/AddAdvertisementPage';
import AdDetailsPage from './pages/AdDetailsPage';
import './App.css';
import EditAdvertisementPage from './pages/EditAdvertisementPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [refreshAds, setRefreshAds] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('username');
    if (token && user) {
      setIsLoggedIn(true);
      setUsername(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
    setRefreshAds(true);
  };

  return (
  <div
      style={{
        backgroundColor: "#f8f2f7ff",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
  <BrowserRouter>
    <Navbar isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} />
    <div className="container mt-5 pt-4">
      <Routes>
        <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} username={username} />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/add-ad" element={isLoggedIn ? <AddAdvertisementPage /> : <Navigate to="/login" />} />
        <Route path="/ads/:id" element={<AdDetailsPage isLoggedIn={isLoggedIn} username={username} />} />
        <Route path="/edit-ad/:id" element={<EditAdvertisementPage />} />
      </Routes>
    </div>
  </BrowserRouter>
  </div>
);
}

export default App;
