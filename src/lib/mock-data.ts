import potteryImg from "@/assets/pottery.jpg";
import embroideryImg from "@/assets/embroidery.jpg";
import jewelryImg from "@/assets/jewelry.jpg";
import paintingsImg from "@/assets/paintings.jpg";
import basketsImg from "@/assets/baskets.jpg";
import artisanImg from "@/assets/artisan-weaving.jpg";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  manufacturerId: string;
  manufacturerName: string;
  craftVideo?: string;
  photos: string[];
}

export interface Manufacturer {
  id: string;
  name: string;
  groupName: string;
  location: string;
  bio: string;
  avatar: string;
  products: string[];
}

export const categories = [
  { id: "pottery", name: "Pottery", icon: "🏺", image: potteryImg },
  { id: "textiles", name: "Textiles & Embroidery", icon: "🧵", image: embroideryImg },
  { id: "jewelry", name: "Jewelry", icon: "📿", image: jewelryImg },
  { id: "paintings", name: "Paintings & Art", icon: "🎨", image: paintingsImg },
  { id: "baskets", name: "Baskets & Weaving", icon: "🧺", image: basketsImg },
];

export const manufacturers: Manufacturer[] = [
  {
    id: "m1",
    name: "Lakshmi SHG",
    groupName: "Lakshmi Self Help Group",
    location: "Pochampally, Telangana",
    bio: "A group of 12 women artisans specializing in traditional Pochampally Ikat weaving. Our textiles carry the legacy of centuries-old weaving techniques passed down through generations.",
    avatar: artisanImg,
    products: ["p1", "p2", "p5"],
  },
  {
    id: "m2",
    name: "Mitti Kala SHG",
    groupName: "Mitti Kala Self Help Group",
    location: "Khurja, Uttar Pradesh",
    bio: "We are a collective of 8 rural women who craft beautiful terracotta and clay pottery using traditional hand-molding and firing techniques.",
    avatar: artisanImg,
    products: ["p3", "p4"],
  },
  {
    id: "m3",
    name: "Rangoli Arts SHG",
    groupName: "Rangoli Arts Self Help Group",
    location: "Madhubani, Bihar",
    bio: "Our group preserves the ancient Madhubani painting tradition. Each piece tells a story of nature, mythology, and village life through vibrant natural colors.",
    avatar: artisanImg,
    products: ["p6", "p7"],
  },
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Pochampally Ikat Saree",
    description: "Hand-woven silk saree with traditional geometric Ikat patterns in red and black. Each saree takes 15-20 days to complete using tie-and-dye technique on the loom.",
    price: 3500,
    category: "textiles",
    image: embroideryImg,
    manufacturerId: "m1",
    manufacturerName: "Lakshmi SHG",
    photos: [embroideryImg, embroideryImg],
  },
  {
    id: "p2",
    name: "Mirror Work Cushion Cover",
    description: "Vibrant cushion cover with intricate mirror work and thread embroidery. Handcrafted using traditional Kutchi techniques.",
    price: 650,
    category: "textiles",
    image: embroideryImg,
    manufacturerId: "m1",
    manufacturerName: "Lakshmi SHG",
    photos: [embroideryImg],
  },
  {
    id: "p3",
    name: "Terracotta Water Pot",
    description: "Traditional clay water pot (matka) hand-shaped and kiln-fired. Keeps water naturally cool and adds an earthy aesthetic to your home.",
    price: 450,
    category: "pottery",
    image: potteryImg,
    manufacturerId: "m2",
    manufacturerName: "Mitti Kala SHG",
    photos: [potteryImg],
  },
  {
    id: "p4",
    name: "Decorative Clay Diya Set",
    description: "Set of 6 hand-painted terracotta diyas with floral motifs. Perfect for festivals and home decor.",
    price: 280,
    category: "pottery",
    image: potteryImg,
    manufacturerId: "m2",
    manufacturerName: "Mitti Kala SHG",
    photos: [potteryImg],
  },
  {
    id: "p5",
    name: "Wooden Bead Necklace",
    description: "Handcrafted wooden bead necklace with natural dyes. Each bead is individually carved and polished by hand.",
    price: 320,
    category: "jewelry",
    image: jewelryImg,
    manufacturerId: "m1",
    manufacturerName: "Lakshmi SHG",
    photos: [jewelryImg],
  },
  {
    id: "p6",
    name: "Madhubani Painting - Tree of Life",
    description: "Traditional Madhubani painting on handmade paper depicting the Tree of Life with birds and flowers using natural vegetable dyes.",
    price: 1200,
    category: "paintings",
    image: paintingsImg,
    manufacturerId: "m3",
    manufacturerName: "Rangoli Arts SHG",
    photos: [paintingsImg],
  },
  {
    id: "p7",
    name: "Bamboo Woven Basket",
    description: "Multi-purpose handwoven bamboo basket with intricate weave patterns. Eco-friendly and durable for everyday use.",
    price: 550,
    category: "baskets",
    image: basketsImg,
    manufacturerId: "m3",
    manufacturerName: "Rangoli Arts SHG",
    photos: [basketsImg],
  },
];
