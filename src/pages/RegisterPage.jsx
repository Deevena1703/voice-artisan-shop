import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShoppingBag, User, Factory, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("buyer");

  const handleRegister = (e) => {
    e.preventDefault();
    navigate(role === "buyer" ? "/buyer/dashboard" : "/manufacturer/dashboard");
  };

  return (
    <div className="auth-page bg-gradient-hero" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: '28rem' }}>
        <div className="auth-card">
          <button className="btn btn-ghost btn-sm mb-4" onClick={() => navigate("/")}>
            <ArrowLeft style={{ height: '1rem', width: '1rem' }} /> Back to Home
          </button>
          <div className="auth-header">
            <Link to="/" className="auth-logo">
              <ShoppingBag className="auth-logo-icon" />
              <span className="auth-logo-text">Crafts Hub</span>
            </Link>
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Join the artisan marketplace</p>
          </div>

          <div className="role-toggle">
            <button className={`role-toggle-btn ${role === "buyer" ? "active" : ""}`} onClick={() => setRole("buyer")}>
              <User className="role-toggle-icon" /> Buyer
            </button>
            <button className={`role-toggle-btn ${role === "manufacturer" ? "active" : ""}`} onClick={() => setRole("manufacturer")}>
              <Factory className="role-toggle-icon" /> Manufacturer
            </button>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="form-group">
              <label className="form-label" htmlFor="name">{role === "manufacturer" ? "Group / SHG Name" : "Full Name"}</label>
              <input className="form-input" id="name" placeholder={role === "manufacturer" ? "e.g. Lakshmi Self Help Group" : "Your name"} required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input className="form-input" id="email" type="email" placeholder="you@example.com" required />
            </div>
            {role === "manufacturer" && (
              <>
                <div className="form-group">
                  <label className="form-label" htmlFor="location">Location</label>
                  <input className="form-input" id="location" placeholder="Village, State" required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="bio">About Your Group</label>
                  <textarea className="form-textarea" id="bio" placeholder="Tell us about your craft and group..." rows={3} />
                </div>
              </>
            )}
            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input className="form-input" id="password" type="password" placeholder="••••••••" required />
            </div>
            <button type="submit" className="btn btn-primary btn-lg btn-full">
              Register as {role === "buyer" ? "Buyer" : "Manufacturer"}
            </button>
          </form>

          <p className="form-footer">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
