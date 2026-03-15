import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card py-12">
    <div className="container">
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <span className="font-display text-lg font-bold">Crafts Hub</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Empowering rural women artisans through digital commerce. Connecting traditional craftsmanship with modern markets.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/products" className="hover:text-foreground transition-colors">Browse Products</Link>
            <Link to="/categories" className="hover:text-foreground transition-colors">Categories</Link>
            <Link to="/register" className="hover:text-foreground transition-colors">Join as Artisan</Link>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3">Contact</h4>
          <p className="text-sm text-muted-foreground">support@craftshub.in</p>
          <p className="text-sm text-muted-foreground mt-1">Made with ❤️ for SHG Women</p>
        </div>
      </div>
      <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
        © 2026 Crafts Hub. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
