import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ProductCard from "../components/ProductCard.jsx";
import CategoryCard from "../components/CategoryCard.jsx";
import { products, categories } from "../lib/mock-data.js";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart, Clock, ShoppingCart, Trash2, Plus, Minus, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const BuyerDashboard = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn, navigate]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQty = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId ? { ...item, qty: item.qty + delta } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const toggleWishlist = (product) => {
    setWishlist((prev) =>
      prev.find((w) => w.id === product.id)
        ? prev.filter((w) => w.id !== product.id)
        : [...prev, product]
    );
  };

  const isWishlisted = (id) => wishlist.some((w) => w.id === id);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="dashboard-header-row">
            <div>
              <h1 className="dashboard-title">Welcome, Buyer! 👋</h1>
              <p className="dashboard-subtitle">Explore authentic handmade products</p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn btn-primary cart-toggle-btn" onClick={() => setCartOpen(!cartOpen)}>
                <ShoppingCart style={{ height: '1.25rem', width: '1.25rem' }} />
                Cart
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </button>
            </div>
          </div>
        </motion.div>

        <div className="stats-grid">
          {[
            { icon: ShoppingBag, label: "Orders", value: "0" },
            { icon: Heart, label: "Wishlist", value: String(wishlist.length) },
            { icon: ShoppingCart, label: "Cart Items", value: String(cartCount) },
            { icon: Clock, label: "Recently Viewed", value: String(products.length) },
          ].map((stat) => (
            <div key={stat.label} className="stat-card">
              <stat.icon className="stat-icon" />
              <p className="stat-value">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Cart Panel */}
        <AnimatePresence>
          {cartOpen && (
            <motion.div
              className="cart-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="cart-panel-header">
                <h2 className="cart-panel-title">
                  <ShoppingCart style={{ height: '1.25rem', width: '1.25rem' }} /> Your Cart
                </h2>
                <button className="btn btn-ghost btn-sm" onClick={() => setCartOpen(false)}>
                  <X style={{ height: '1rem', width: '1rem' }} />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="cart-empty">
                  <ShoppingCart style={{ height: '2.5rem', width: '2.5rem', color: 'hsl(var(--muted-foreground))' }} />
                  <p className="cart-empty-text">Your cart is empty</p>
                  <p className="cart-empty-sub">Add products from below to get started!</p>
                </div>
              ) : (
                <>
                  {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <img src={item.image} alt={item.name} className="cart-item-img" />
                      <div className="cart-item-info">
                        <h4 className="cart-item-name">{item.name}</h4>
                        <p className="cart-item-price">₹{item.price.toLocaleString("en-IN")}</p>
                      </div>
                      <div className="cart-item-actions">
                        <div className="cart-qty-controls">
                          <button className="btn btn-outline btn-sm cart-qty-btn" onClick={() => updateQty(item.id, -1)}>
                            <Minus style={{ height: '0.75rem', width: '0.75rem' }} />
                          </button>
                          <span className="cart-qty-value">{item.qty}</span>
                          <button className="btn btn-outline btn-sm cart-qty-btn" onClick={() => updateQty(item.id, 1)}>
                            <Plus style={{ height: '0.75rem', width: '0.75rem' }} />
                          </button>
                        </div>
                        <button className="btn btn-ghost btn-sm" onClick={() => removeFromCart(item.id)}>
                          <Trash2 style={{ height: '0.875rem', width: '0.875rem', color: 'hsl(var(--destructive))' }} />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="cart-footer">
                    <div className="cart-total">
                      <span>Total:</span>
                      <span className="cart-total-value">₹{cartTotal.toLocaleString("en-IN")}</span>
                    </div>
                    <button className="btn btn-primary btn-full">Proceed to Checkout</button>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <h2 className="section-title mt-10">Browse Categories</h2>
        <div className="categories-grid mt-4">
          {categories.map((c) => (
            <CategoryCard key={c.id} {...c} />
          ))}
        </div>

        <h2 className="section-title mt-10">All Products</h2>
        <div className="products-grid mt-4">
          {products.map((p) => (
            <div key={p.id} className="product-card-wrapper">
              <ProductCard product={p} />
              <div className="product-card-actions">
                <button className="btn btn-primary btn-sm add-to-cart-btn" onClick={() => addToCart(p)}>
                  <ShoppingCart style={{ height: '0.875rem', width: '0.875rem' }} /> Add to Cart
                </button>
                <button className={`btn btn-sm ${isWishlisted(p.id) ? 'btn-wishlist-active' : 'btn-outline'}`} onClick={() => toggleWishlist(p)}>
                  <Heart style={{ height: '0.875rem', width: '0.875rem', fill: isWishlisted(p.id) ? 'currentColor' : 'none' }} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {wishlist.length > 0 && (
          <>
            <h2 className="section-title mt-10">Your Wishlist ❤️</h2>
            <div className="products-grid mt-4">
              {wishlist.map((p) => (
                <div key={p.id} className="product-card-wrapper">
                  <ProductCard product={p} />
                  <div className="product-card-actions">
                    <button className="btn btn-primary btn-sm add-to-cart-btn" onClick={() => addToCart(p)}>
                      <ShoppingCart style={{ height: '0.875rem', width: '0.875rem' }} /> Add to Cart
                    </button>
                    <button className="btn btn-sm btn-wishlist-active" onClick={() => toggleWishlist(p)}>
                      <Heart style={{ height: '0.875rem', width: '0.875rem', fill: 'currentColor' }} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BuyerDashboard;
