import { useParams, Link, useNavigate } from "react-router-dom";
import { products, manufacturers } from "@/lib/mock-data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, User, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const manufacturer = product ? manufacturers.find((m) => m.id === product.manufacturerId) : null;

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container py-20 text-center">
          <h1 className="font-display text-2xl font-bold">Product Not Found</h1>
          <Button variant="outline" className="mt-4" onClick={() => navigate("/products")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-10">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Images */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="overflow-hidden rounded-xl">
              <img src={product.image} alt={product.name} className="w-full aspect-square object-cover" />
            </div>
            {/* Craft Video Placeholder */}
            <div className="mt-4 rounded-xl border border-border bg-muted p-6 text-center">
              <Play className="mx-auto h-10 w-10 text-primary mb-2" />
              <p className="font-display font-semibold">Watch How It's Made</p>
              <p className="text-xs text-muted-foreground mt-1">
                See the crafting process behind this product
              </p>
            </div>
            {/* Photo gallery */}
            {product.photos.length > 1 && (
              <div className="mt-4 grid grid-cols-3 gap-2">
                {product.photos.map((photo, i) => (
                  <img key={i} src={photo} alt={`${product.name} photo ${i + 1}`} className="rounded-lg aspect-square object-cover" />
                ))}
              </div>
            )}
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-3">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </span>
            <h1 className="font-display text-3xl font-bold">{product.name}</h1>
            <p className="mt-3 text-lg font-display font-bold text-primary">
              ₹{product.price.toLocaleString("en-IN")}
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">{product.description}</p>

            <Button size="lg" className="mt-6 w-full md:w-auto">
              Add to Cart
            </Button>

            {/* Manufacturer Info */}
            {manufacturer && (
              <Link
                to={`/manufacturer/${manufacturer.id}`}
                className="mt-8 flex items-start gap-4 rounded-lg border border-border bg-card p-4 shadow-card hover:shadow-warm transition-shadow"
              >
                <img src={manufacturer.avatar} alt={manufacturer.name} className="h-14 w-14 rounded-full object-cover" />
                <div>
                  <p className="font-display font-semibold">{manufacturer.name}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                    <MapPin className="h-3 w-3" /> {manufacturer.location}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{manufacturer.bio}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary">
                    <User className="h-3 w-3" /> View Artisan Profile →
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
