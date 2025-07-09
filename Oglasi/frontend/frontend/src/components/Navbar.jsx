import { Link } from 'react-router-dom';

function Navbar({ isLoggedIn, username, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">Oglasi</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item">Zdravo, {username}</li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add-ad">Dodaj oglas</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-danger btn-sm" onClick={onLogout}>Sign out</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Sign up</Link>
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
