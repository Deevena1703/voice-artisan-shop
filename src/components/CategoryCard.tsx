import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface CategoryCardProps {
  id: string;
  name: string;
  icon: string;
  image: string;
}

const CategoryCard = ({ id, name, icon, image }: CategoryCardProps) => (
  <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
    <Link
      to={`/products?category=${id}`}
      className="group relative block aspect-[4/3] overflow-hidden rounded-lg"
    >
      <img
        src={image}
        alt={name}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-earth/80 via-earth/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span className="text-2xl">{icon}</span>
        <h3 className="mt-1 font-display text-lg font-semibold text-primary-foreground">
          {name}
        </h3>
      </div>
    </Link>
  </motion.div>
);

export default CategoryCard;
