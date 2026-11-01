import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <Link to="/" className="footer-brand">
          ⚡ AI Quiz Arena
        </Link>

        <p>Challenge your mind. Level up your knowledge.</p>

        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} AI Quiz Arena. Made for curious minds.
        </p>
      </div>
    </footer>
  );
}

export default Footer;