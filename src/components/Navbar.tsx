import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <ShoppingBag className="h-6 w-6 text-primary" />
          <span className="font-display text-xl font-bold text-foreground">
            Crafts Hub
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-6 md:flex">
          <Link to="/products" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Browse Products
          </Link>
          <Link to="/categories" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Categories
          </Link>
          <Button variant="outline" size="sm" onClick={() => navigate("/login")}>
            <User className="mr-2 h-4 w-4" />
            Login
          </Button>
          <Button size="sm" onClick={() => navigate("/register")}>
            Get Started
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background p-4 md:hidden">
          <div className="flex flex-col gap-3">
            <Link to="/products" className="text-sm font-medium" onClick={() => setMobileOpen(false)}>Browse Products</Link>
            <Link to="/categories" className="text-sm font-medium" onClick={() => setMobileOpen(false)}>Categories</Link>
            <Button variant="outline" size="sm" onClick={() => { navigate("/login"); setMobileOpen(false); }}>Login</Button>
            <Button size="sm" onClick={() => { navigate("/register"); setMobileOpen(false); }}>Get Started</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
