import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { categories, products } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { ArrowRight, Heart, ShieldCheck, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroCrafts from "@/assets/hero-crafts.jpg";
import artisanImg from "@/assets/artisan-weaving.jpg";

const features = [
  { icon: Heart, title: "Empower Artisans", desc: "Buy directly from SHG women artisans, ensuring fair prices and sustainable livelihoods." },
  { icon: Video, title: "Watch the Craft", desc: "See how each product is made through authentic craft-making videos and photo stories." },
  { icon: ShieldCheck, title: "Authentic & Handmade", desc: "Every product is verified handmade, preserving traditional techniques and cultural heritage." },
];

const Index = () => {
  const navigate = useNavigate();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="container py-20 md:py-28">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-4">
                🪔 Empowering Rural Women Artisans
              </span>
              <h1 className="font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                Handcrafted with{" "}
                <span className="text-gradient-primary">Love & Tradition</span>
              </h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-lg">
                Discover authentic handmade products from Self-Help Group women across India. 
                Every purchase empowers a rural artisan.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" onClick={() => navigate("/products")}>
                  Browse Products <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate("/register")}>
                  Join as Artisan
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="overflow-hidden rounded-2xl shadow-warm">
                <img src={heroCrafts} alt="Handcrafted products" className="w-full" />
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-xl bg-card p-4 shadow-card border border-border">
                <div className="flex items-center gap-3">
                  <img src={artisanImg} alt="Artisan" className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <p className="text-xs font-semibold">500+ Artisans</p>
                    <p className="text-xs text-muted-foreground">Across 10 states</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-20">
        <div className="container">
          <h2 className="text-center font-display text-3xl font-bold">Why Crafts Hub?</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="rounded-lg border border-border bg-card p-6 shadow-card text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-card py-16 md:py-20">
        <div className="container">
          <h2 className="font-display text-3xl font-bold">Shop by Category</h2>
          <p className="mt-2 text-muted-foreground">Explore traditional crafts organized by type</p>
          <div className="mt-8 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {categories.map((c) => (
              <CategoryCard key={c.id} {...c} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display text-3xl font-bold">Featured Crafts</h2>
              <p className="mt-2 text-muted-foreground">Handpicked products from our artisans</p>
            </div>
            <Button variant="outline" onClick={() => navigate("/products")}>
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-warm py-16 md:py-20">
        <div className="container text-center">
          <h2 className="font-display text-3xl font-bold text-primary-foreground">
            Are You an Artisan?
          </h2>
          <p className="mt-3 text-primary-foreground/80 max-w-lg mx-auto">
            Join Crafts Hub to showcase your handmade products, share your craft stories through videos, and reach customers across India.
          </p>
          <Button
            size="lg"
            variant="outline"
            className="mt-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            onClick={() => navigate("/register")}
          >
            Register as Manufacturer
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
