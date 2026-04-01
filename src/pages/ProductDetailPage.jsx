import { useParams, Link, useNavigate } from "react-router-dom";
import { products, manufacturers } from "../lib/mock-data.js";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { ArrowLeft, Play, User, MapPin, ShoppingCart, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext.jsx";
import { useState } from "react";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [wishlisted, setWishlisted] = useState(false);
  const product = products.find((p) => p.id === id);
  const manufacturer = product ? manufacturers.find((m) => m.id === product.manufacturerId) : null;

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    alert("Added to cart! Go to Buyer Dashboard to view your cart.");
  };

  const handleWishlist = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    setWishlisted(!wishlisted);
  };

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container py-10 text-center">
          <h1 className="section-title">Product Not Found</h1>
          <button className="btn btn-outline mt-4" onClick={() => navigate("/products")}>
            <ArrowLeft style={{ height: '1rem', width: '1rem' }} /> Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-10">
        <button className="btn btn-ghost btn-sm mb-6" onClick={() => navigate(-1)}>
          <ArrowLeft style={{ height: '1rem', width: '1rem' }} /> Back
        </button>

        <div className="detail-grid">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <img src={product.image} alt={product.name} className="detail-img" />
            <div className="detail-video-placeholder">
              <Play className="detail-video-icon" />
              <p className="detail-video-title">Watch How It's Made</p>
              <p className="detail-video-desc">See the crafting process behind this product</p>
            </div>
            {product.photos.length > 1 && (
              <div className="detail-photos">
                {product.photos.map((photo, i) => (
                  <img key={i} src={photo} alt={`${product.name} photo ${i + 1}`} className="detail-photo" />
                ))}
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <span className="detail-badge">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </span>
            <h1 className="detail-title">{product.name}</h1>
            <p className="detail-price">₹{product.price.toLocaleString("en-IN")}</p>
            <p className="detail-description">{product.description}</p>

            <div className="detail-actions">
              <button className="btn btn-primary btn-lg" onClick={handleAddToCart}>
                <ShoppingCart style={{ height: '1.125rem', width: '1.125rem' }} /> Add to Cart
              </button>
              <button className={`btn btn-lg ${wishlisted ? 'btn-wishlist-active' : 'btn-outline'}`} onClick={handleWishlist}>
                <Heart style={{ height: '1.125rem', width: '1.125rem', fill: wishlisted ? 'currentColor' : 'none' }} />
                {wishlisted ? "Wishlisted" : "Wishlist"}
              </button>
            </div>

            {manufacturer && (
              <Link to={`/manufacturer/${manufacturer.id}`} className="manufacturer-link">
                <img src={manufacturer.avatar} alt={manufacturer.name} className="manufacturer-link-avatar" />
                <div>
                  <p className="manufacturer-link-name">{manufacturer.name}</p>
                  <div className="manufacturer-link-location">
                    <MapPin className="manufacturer-link-location-icon" /> {manufacturer.location}
                  </div>
                  <p className="manufacturer-link-bio">{manufacturer.bio}</p>
                  <span className="manufacturer-link-cta">
                    <User style={{ height: '0.75rem', width: '0.75rem' }} /> View Artisan Profile →
                  </span>
                </div>
              </Link>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
