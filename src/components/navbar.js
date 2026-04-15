import { Link } from "react-router-dom";

function Navbar({ setSearch, darkMode, setDarkMode, user, setUser }) {

  return (
    <nav className={`navbar navbar-expand-lg px-4 ${darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"}`}>

      <Link className="navbar-brand fw-bold" to="/">📱 PhoneStore</Link>

      <div className="collapse navbar-collapse">

        {user && (
          <>
            <ul className="navbar-nav me-auto">
              <li><Link className="nav-link" to="/products">Products</Link></li>
              <li><Link className="nav-link" to="/cart">🛒</Link></li>
              <li><Link className="nav-link" to="/wishlist">❤️</Link></li>
            </ul>

            <input
              className="form-control me-2"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </>
        )}

        <button className="btn btn-outline-secondary me-2"
          onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️" : "🌙"}
        </button>

        {user ? (
          <>
            <span className="me-2">👤 {user.username}</span>
            <button className="btn btn-danger" onClick={() => {
              localStorage.removeItem("loggedUser");
              setUser(null);
            }}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn btn-primary">Login</Link>
        )}

      </div>
    </nav>
  );
}

export default Navbar;