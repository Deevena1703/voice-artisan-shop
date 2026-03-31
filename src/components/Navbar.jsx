import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo">
          <ShoppingBag className="navbar-logo-icon" />
          <span className="navbar-logo-text">Crafts Hub</span>
        </Link>

        <div className="navbar-links">
          <Link to="/products" className="navbar-link">Browse Products</Link>
          <Link to="/categories" className="navbar-link">Categories</Link>
          <button className="btn btn-outline btn-sm" onClick={() => navigate("/login")}>
            <User style={{ height: '1rem', width: '1rem' }} /> Login
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => navigate("/register")}>
            Get Started
          </button>
        </div>

        <button className="navbar-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X style={{ height: '1.5rem', width: '1.5rem' }} /> : <Menu style={{ height: '1.5rem', width: '1.5rem' }} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="navbar-mobile-menu">
          <Link to="/products" className="navbar-link" onClick={() => setMobileOpen(false)}>Browse Products</Link>
          <Link to="/categories" className="navbar-link" onClick={() => setMobileOpen(false)}>Categories</Link>
          <button className="btn btn-outline btn-sm" onClick={() => { navigate("/login"); setMobileOpen(false); }}>Login</button>
          <button className="btn btn-primary btn-sm" onClick={() => { navigate("/register"); setMobileOpen(false); }}>Get Started</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
