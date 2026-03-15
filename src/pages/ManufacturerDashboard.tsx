import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { products } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { Plus, Package, Mic, Video, Edit } from "lucide-react";
import { useState } from "react";

const ManufacturerDashboard = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const myProducts = products.slice(0, 3); // Mock: first 3 products belong to this manufacturer

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold">Manufacturer Dashboard 🏭</h1>
              <p className="mt-1 text-muted-foreground">Manage your products and craft stories</p>
            </div>
            <Button onClick={() => setShowAddForm(!showAddForm)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 grid-cols-3">
          {[
            { icon: Package, label: "Products", value: myProducts.length.toString() },
            { icon: Video, label: "Videos", value: "2" },
            { icon: Edit, label: "Pending", value: "0" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg border border-border bg-card p-4 shadow-card text-center">
              <stat.icon className="mx-auto h-5 w-5 text-primary mb-1" />
              <p className="font-display text-xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Add Product Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-8 rounded-xl border border-border bg-card p-6 shadow-card"
          >
            <h2 className="font-display text-xl font-bold mb-4">Add New Product</h2>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowAddForm(false); }}>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="productName">Product Name</Label>
                  <Input id="productName" placeholder="e.g. Hand-woven Silk Scarf" />
                </div>
                <div>
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input id="price" type="number" placeholder="500" />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe your product..." rows={3} />
              </div>
              <div>
                <Label>Or describe using voice</Label>
                <Button type="button" variant="outline" className="mt-1 w-full">
                  <Mic className="mr-2 h-4 w-4 text-primary" />
                  Record Voice Description
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Product Photos</Label>
                  <div className="mt-1 rounded-lg border-2 border-dashed border-border bg-muted p-6 text-center">
                    <p className="text-sm text-muted-foreground">Click or drag to upload photos</p>
                  </div>
                </div>
                <div>
                  <Label>Craft-Making Video</Label>
                  <div className="mt-1 rounded-lg border-2 border-dashed border-border bg-muted p-6 text-center">
                    <Video className="mx-auto h-6 w-6 text-muted-foreground mb-1" />
                    <p className="text-sm text-muted-foreground">Upload manufacturing video</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button type="submit">Save Product</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
              </div>
            </form>
          </motion.div>
        )}

        {/* My Products */}
        <h2 className="mt-10 font-display text-2xl font-bold">Your Products</h2>
        <div className="mt-4 space-y-4">
          {myProducts.map((p) => (
            <div key={p.id} className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 shadow-card">
              <img src={p.image} alt={p.name} className="h-16 w-16 rounded-lg object-cover" />
              <div className="flex-1">
                <h3 className="font-display font-semibold">{p.name}</h3>
                <p className="text-sm text-muted-foreground">{p.category} · ₹{p.price.toLocaleString("en-IN")}</p>
              </div>
              <Button variant="outline" size="sm">
                <Edit className="mr-1 h-3 w-3" /> Edit
              </Button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ManufacturerDashboard;
