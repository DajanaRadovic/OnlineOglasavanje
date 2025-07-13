import { Link } from 'react-router-dom';

function Navbar({ isLoggedIn, username, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar fixed-top">
      <div className="container">
        <Link className="navbar-brand fw-bold text-white" to="/">OGLASI</Link>
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav align-items-center gap-3">
            {isLoggedIn ? (
              <>
                <li className="nav-item text-white">Zdravo, <strong>{username}</strong></li>
                <li className="nav-item">
                  <Link className="nav-link text-white nav-link-hover" to="/add-ad">➕ Dodaj oglas</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-sm btn-light rounded-pill" onClick={onLogout}>Odjavi se</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white nav-link-hover" to="/login">Prijava</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white nav-link-hover" to="/register">Registracija</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
