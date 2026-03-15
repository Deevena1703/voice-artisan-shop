import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import { products, categories } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { ShoppingBag, Heart, Clock } from "lucide-react";

const BuyerDashboard = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold">Welcome, Buyer! 👋</h1>
          <p className="mt-1 text-muted-foreground">Explore authentic handmade products</p>
        </motion.div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 grid-cols-3">
          {[
            { icon: ShoppingBag, label: "Orders", value: "0" },
            { icon: Heart, label: "Wishlist", value: "0" },
            { icon: Clock, label: "Recently Viewed", value: products.length.toString() },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg border border-border bg-card p-4 shadow-card text-center">
              <stat.icon className="mx-auto h-5 w-5 text-primary mb-1" />
              <p className="font-display text-xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Categories */}
        <h2 className="mt-10 font-display text-2xl font-bold">Browse Categories</h2>
        <div className="mt-4 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((c) => (
            <CategoryCard key={c.id} {...c} />
          ))}
        </div>

        {/* All Products */}
        <h2 className="mt-10 font-display text-2xl font-bold">All Products</h2>
        <div className="mt-4 grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
