import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="brand-icon">⚡</span>
        <span>
          AI Quiz<span className="brand-highlight"> Arena</span>
        </span>
      </Link>

      <div className="navbar-links">
        <NavLink to="/" end>
          Home
        </NavLink>

        {currentUser ? (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <span className="navbar-user">
              👋 {currentUser.name || currentUser.email}
            </span>
            <button className="nav-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <Link to="/signup" className="nav-signup">
              Get Started <span>→</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;