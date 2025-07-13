import { useState } from 'react';
import {login} from '../services/authService';
import {useNavigate} from 'react-router-dom';

function LoginPage({ setIsLoggedIn, setUsername }) {
  const [username, setUser] = useState('');
  const [password, setPass] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = await login(username, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      
      setIsLoggedIn(true);
      setUsername(data.username);
      navigate('/');

    } catch (err) {
      setError('Greška na serveru');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form
        onSubmit={handleSubmit}
        className="border rounded shadow p-4"
        style={{ minWidth: '350px', maxWidth: '400px', width: '100%' }}
      >
        <h2 className="mb-4 text-center">Prijava</h2>

        <div className="mb-3">
        <label>Korisničko ime</label>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={e => setUser(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label>Šifra</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={e => setPass(e.target.value)}
          required
        />
      </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button className="btn btn-pink w-100" type="submit">
          Prijavi se
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
