import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryCard from "@/components/CategoryCard";
import { categories } from "@/lib/mock-data";

const CategoriesPage = () => (
  <div className="min-h-screen">
    <Navbar />
    <div className="container py-10">
      <h1 className="font-display text-3xl font-bold">Categories</h1>
      <p className="mt-1 text-muted-foreground">Explore crafts by type</p>
      <div className="mt-8 grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {categories.map((c) => (
          <CategoryCard key={c.id} {...c} />
        ))}
      </div>
    </div>
    <Footer />
  </div>
);

export default CategoriesPage;
