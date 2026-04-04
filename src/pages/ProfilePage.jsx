import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Shield, ArrowLeft, LogOut, ShoppingCart, Heart, Clock, Trash2, Plus, Minus, X, MapPin, IndianRupee, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { products as allProducts } from "../lib/mock-data.js";
import ProductCard from "../components/ProductCard.jsx";

const ProfilePage = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Cart functions
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) return prev.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { ...product, qty: 1 }];
    });
  };
  const removeFromCart = (productId) => setCart((prev) => prev.filter((item) => item.id !== productId));
  const updateQty = (productId, delta) => setCart((prev) => prev.map((item) => item.id === productId ? { ...item, qty: item.qty + delta } : item).filter((item) => item.qty > 0));
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  // Wishlist functions
  const toggleWishlist = (product) => {
    setWishlist((prev) => prev.find((w) => w.id === product.id) ? prev.filter((w) => w.id !== product.id) : [...prev, product]);
  };
  const isWishlisted = (id) => wishlist.some((w) => w.id === id);

  const isBuyer = user.role === "buyer";
  const isManufacturer = user.role === "manufacturer";

  // Manufacturer mock transactions
  const transactions = [
    { id: "t1", product: "Pochampally Ikat Saree", buyer: "Ravi Kumar", amount: 3500, date: "2026-03-28", status: "Completed" },
    { id: "t2", product: "Mirror Work Cushion Cover", buyer: "Priya Sharma", amount: 650, date: "2026-03-30", status: "Shipped" },
    { id: "t3", product: "Wooden Bead Necklace", buyer: "Anita Devi", amount: 320, date: "2026-04-01", status: "Processing" },
  ];

  const tabs = isBuyer
    ? [
        { id: "profile", label: "Profile", icon: User },
        { id: "cart", label: `Cart (${cartCount})`, icon: ShoppingCart },
        { id: "wishlist", label: `Wishlist (${wishlist.length})`, icon: Heart },
        { id: "recent", label: "Recently Viewed", icon: Clock },
      ]
    : [
        { id: "profile", label: "Group Profile", icon: Users },
        { id: "transactions", label: "Transactions", icon: IndianRupee },
      ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-10">
        <button className="btn btn-ghost btn-sm mb-6" onClick={() => navigate(isBuyer ? "/buyer/dashboard" : "/manufacturer/dashboard")}>
          <ArrowLeft style={{ height: '1rem', width: '1rem' }} /> Back to Dashboard
        </button>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="dashboard-title">{isManufacturer ? "Group Profile" : "My Profile"}</h1>
          <p className="dashboard-subtitle">{isManufacturer ? "Manage your SHG group details" : "Manage your account and shopping"}</p>
        </motion.div>

        {/* Tabs */}
        <div className="profile-tabs mt-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`profile-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon style={{ height: '1rem', width: '1rem' }} /> {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="profile-card-container mt-6">
            <div className="profile-info-card">
              <div className="profile-avatar-large">
                <User style={{ height: '3rem', width: '3rem', color: 'hsl(var(--primary))' }} />
              </div>
              {isManufacturer ? (
                <div className="profile-details">
                  <div className="profile-detail-row">
                    <Users style={{ height: '1rem', width: '1rem', color: 'hsl(var(--muted-foreground))' }} />
                    <div>
                      <p className="profile-detail-label">Group / SHG Name</p>
                      <p className="profile-detail-value">Lakshmi Self Help Group</p>
                    </div>
                  </div>
                  <div className="profile-detail-row">
                    <MapPin style={{ height: '1rem', width: '1rem', color: 'hsl(var(--muted-foreground))' }} />
                    <div>
                      <p className="profile-detail-label">Location</p>
                      <p className="profile-detail-value">Pochampally, Telangana</p>
                    </div>
                  </div>
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
                      <p className="profile-detail-value">Manufacturer (SHG)</p>
                    </div>
                  </div>
                </div>
              ) : (
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
              )}
              <div className="profile-action-buttons mt-6">
                <button className="btn btn-primary" onClick={() => navigate(isBuyer ? "/buyer/dashboard" : "/manufacturer/dashboard")}>
                  Go to Dashboard
                </button>
                <button className="btn btn-outline btn-logout" onClick={handleLogout}>
                  <LogOut style={{ height: '1rem', width: '1rem' }} /> Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Cart Tab (Buyer only) */}
        {activeTab === "cart" && isBuyer && (
          <div className="mt-6">
            {cart.length === 0 ? (
              <div className="empty-state-card">
                <ShoppingCart style={{ height: '2.5rem', width: '2.5rem', color: 'hsl(var(--muted-foreground))' }} />
                <p className="empty-state-title">Your cart is empty</p>
                <p className="empty-state-sub">Browse products and add items to your cart</p>
                <button className="btn btn-primary mt-4" onClick={() => navigate("/products")}>Browse Products</button>
              </div>
            ) : (
              <div className="cart-panel" style={{ margin: 0 }}>
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
              </div>
            )}
          </div>
        )}

        {/* Wishlist Tab (Buyer only) */}
        {activeTab === "wishlist" && isBuyer && (
          <div className="mt-6">
            {wishlist.length === 0 ? (
              <div className="empty-state-card">
                <Heart style={{ height: '2.5rem', width: '2.5rem', color: 'hsl(var(--muted-foreground))' }} />
                <p className="empty-state-title">Your wishlist is empty</p>
                <p className="empty-state-sub">Save products you love for later</p>
                <button className="btn btn-primary mt-4" onClick={() => navigate("/products")}>Browse Products</button>
              </div>
            ) : (
              <div className="products-grid">
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
            )}
          </div>
        )}

        {/* Recently Viewed Tab (Buyer only) */}
        {activeTab === "recent" && isBuyer && (
          <div className="mt-6">
            <div className="products-grid">
              {allProducts.map((p) => (
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
          </div>
        )}

        {/* Transactions Tab (Manufacturer only) */}
        {activeTab === "transactions" && isManufacturer && (
          <div className="mt-6">
            <div className="transactions-table-wrapper">
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Buyer</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t) => (
                    <tr key={t.id}>
                      <td>{t.product}</td>
                      <td>{t.buyer}</td>
                      <td>₹{t.amount.toLocaleString("en-IN")}</td>
                      <td>{t.date}</td>
                      <td>
                        <span className={`transaction-status status-${t.status.toLowerCase()}`}>
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
