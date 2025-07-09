import { useState } from 'react';

function LoginPage({ setIsLoggedIn, setUsername }) {
  const [username, setUser] = useState('');
  const [password, setPass] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Login failed');
        return;
      }

      const data = await res.json();
      // Sačuvaj token i korisničko ime u localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', username);

      setIsLoggedIn(true);
      setUsername(username);

    } catch (err) {
      setError('Greška na serveru');
    }
  };

  return (
    <div className="container col-md-4">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Korisničko ime</label>
          <input type="text" className="form-control" value={username} onChange={e => setUser(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Šifra</label>
          <input type="password" className="form-control" value={password} onChange={e => setPass(e.target.value)} required />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button className="btn btn-primary" type="submit">Prijavi se</button>
      </form>
    </div>
  );
}

export default LoginPage;
