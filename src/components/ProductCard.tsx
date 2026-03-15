import { Link } from "react-router-dom";
import { Product } from "@/lib/mock-data";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => (
  <motion.div
    whileHover={{ y: -4 }}
    transition={{ duration: 0.2 }}
  >
    <Link
      to={`/product/${product.id}`}
      className="group block overflow-hidden rounded-lg border border-border bg-card shadow-card transition-shadow hover:shadow-warm"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <p className="text-xs font-medium text-primary mb-1">{product.manufacturerName}</p>
        <h3 className="font-display text-base font-semibold leading-tight text-foreground">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <p className="mt-2 font-display text-lg font-bold text-primary">
          ₹{product.price.toLocaleString("en-IN")}
        </p>
      </div>
    </Link>
  </motion.div>
);

export default ProductCard;
