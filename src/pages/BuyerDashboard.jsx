import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ProductCard from "../components/ProductCard.jsx";
import CategoryCard from "../components/CategoryCard.jsx";
import { products, categories } from "../lib/mock-data.js";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const BuyerDashboard = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn, navigate]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-10">
        <button className="btn btn-ghost btn-sm mb-6" onClick={() => navigate("/")}>
          <ArrowLeft style={{ height: '1rem', width: '1rem' }} /> Back to Home
        </button>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="dashboard-title">Welcome, Buyer! 👋</h1>
          <p className="dashboard-subtitle">Explore authentic handmade products</p>
        </motion.div>

        <h2 className="section-title mt-10">Browse Categories</h2>
        <div className="categories-grid mt-4">
          {categories.map((c) => (
            <CategoryCard key={c.id} {...c} />
          ))}
        </div>

        <h2 className="section-title mt-10">All Products</h2>
        <div className="products-grid mt-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BuyerDashboard;
