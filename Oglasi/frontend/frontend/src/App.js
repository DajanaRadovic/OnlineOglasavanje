import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddAdvertisementPage from './pages/AddAdvertisementPage';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

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
  };

  return (
  <div
      style={{
        backgroundImage: "url('/images/pozadina.jpg')",
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
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/add-ad" element={isLoggedIn ? <AddAdvertisementPage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  </BrowserRouter>
  </div>
);
}

export default App;
