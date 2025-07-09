import { useState } from 'react';
import { register } from '../services/authService';

function RegisterPage() {
  const [username, setUser] = useState('');
  const [password, setPass] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const data = await register(username, password, phone);
      setSuccess(data.message);
      setUser('');
      setPass('');
      setPhone('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form
        onSubmit={handleSubmit}
        className="border rounded shadow p-4"
        style={{ minWidth: '350px', maxWidth: '400px', width: '100%' }}
      >
        <h2 className="mb-4 text-center">Registracija</h2>

        <div className="mb-3">
          <label className="form-label">Korisničko ime</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={e => setUser(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Šifra</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPass(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Broj telefona</label>
          <input
            type="text"
            className="form-control"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <button className="btn btn-primary w-100" type="submit">
          Registruj se
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
