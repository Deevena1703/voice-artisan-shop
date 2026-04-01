import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShoppingBag, User, Factory } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext.jsx";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [role, setRole] = useState("buyer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, role);
    navigate(role === "buyer" ? "/buyer/dashboard" : "/manufacturer/dashboard");
  };

  return (
    <div className="auth-page bg-gradient-hero">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: '28rem' }}>
        <div className="auth-card">
          <div className="auth-header">
            <Link to="/" className="auth-logo">
              <ShoppingBag className="auth-logo-icon" />
              <span className="auth-logo-text">Crafts Hub</span>
            </Link>
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Login to your account</p>
          </div>

          <div className="role-toggle">
            <button className={`role-toggle-btn ${role === "buyer" ? "active" : ""}`} onClick={() => setRole("buyer")}>
              <User className="role-toggle-icon" /> Buyer
            </button>
            <button className={`role-toggle-btn ${role === "manufacturer" ? "active" : ""}`} onClick={() => setRole("manufacturer")}>
              <Factory className="role-toggle-icon" /> Manufacturer
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input className="form-input" id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input className="form-input" id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary btn-lg btn-full">
              Login as {role === "buyer" ? "Buyer" : "Manufacturer"}
            </button>
          </form>

          <p className="form-footer">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
