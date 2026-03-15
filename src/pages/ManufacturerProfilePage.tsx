import { useParams, useNavigate } from "react-router-dom";
import { manufacturers, products } from "@/lib/mock-data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Play } from "lucide-react";
import { motion } from "framer-motion";

const ManufacturerProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const manufacturer = manufacturers.find((m) => m.id === id);

  if (!manufacturer) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container py-20 text-center">
          <h1 className="font-display text-2xl font-bold">Artisan Not Found</h1>
          <Button variant="outline" className="mt-4" onClick={() => navigate("/products")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </div>
      </div>
    );
  }

  const manufacturerProducts = products.filter((p) => p.manufacturerId === manufacturer.id);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-10">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-border bg-card p-8 shadow-card"
        >
          <div className="flex flex-col md:flex-row items-start gap-6">
            <img
              src={manufacturer.avatar}
              alt={manufacturer.name}
              className="h-24 w-24 rounded-full object-cover ring-4 ring-primary/20"
            />
            <div className="flex-1">
              <h1 className="font-display text-2xl font-bold">{manufacturer.groupName}</h1>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <MapPin className="h-4 w-4" /> {manufacturer.location}
              </div>
              <p className="mt-3 text-muted-foreground leading-relaxed max-w-2xl">{manufacturer.bio}</p>
            </div>
          </div>

          {/* Craft Video Section */}
          <div className="mt-6 rounded-lg border border-border bg-muted p-6 text-center">
            <Play className="mx-auto h-12 w-12 text-primary mb-2" />
            <p className="font-display text-lg font-semibold">Our Craft Journey</p>
            <p className="text-sm text-muted-foreground mt-1">
              Watch how we create our handmade products using traditional techniques
            </p>
          </div>
        </motion.div>

        {/* Products */}
        <div className="mt-10">
          <h2 className="font-display text-2xl font-bold mb-6">
            Products by {manufacturer.name}
          </h2>
          <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {manufacturerProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ManufacturerProfilePage;
