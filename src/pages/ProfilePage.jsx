import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Shield, ArrowLeft } from "lucide-react";
import { useEffect } from "react";

const ProfilePage = () => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-10">
        <button className="btn btn-ghost btn-sm mb-6" onClick={() => navigate(-1)}>
          <ArrowLeft style={{ height: '1rem', width: '1rem' }} /> Back
        </button>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="dashboard-title">My Profile</h1>
          <p className="dashboard-subtitle">Manage your account details</p>
        </motion.div>

        <div className="profile-card-container mt-8">
          <div className="profile-info-card">
            <div className="profile-avatar-large">
              <User style={{ height: '3rem', width: '3rem', color: 'hsl(var(--primary))' }} />
            </div>
            <div className="profile-details">
              <div className="profile-detail-row">
                <Mail style={{ height: '1rem', width: '1rem', color: 'hsl(var(--muted-foreground))' }} />
                <div>
                  <p className="profile-detail-label">Email</p>
                  <p className="profile-detail-value">{user.email}</p>
                </div>
              </div>
              <div className="profile-detail-row">
                <Shield style={{ height: '1rem', width: '1rem', color: 'hsl(var(--muted-foreground))' }} />
                <div>
                  <p className="profile-detail-label">Role</p>
                  <p className="profile-detail-value" style={{ textTransform: 'capitalize' }}>{user.role}</p>
                </div>
              </div>
            </div>
            <button className="btn btn-primary mt-6" onClick={() => navigate(user.role === "manufacturer" ? "/manufacturer/dashboard" : "/buyer/dashboard")}>
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
