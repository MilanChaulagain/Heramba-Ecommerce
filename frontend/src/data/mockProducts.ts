// Mock Product Data
// This file contains all mock product data for the application
// When switching to real API, this file won't be needed

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  image?: string; //Multiple Images can be added later if needed
  images?: string[];
  badge?: string;
  rating?: number;
  category?: string;
  ageGroup?: string;
  stock?: number;
  featured?: boolean;
  flashDeal?: boolean;
};

export const mockProducts: Product[] = [
  {
    id: 1,
    title: "Organic Cotton Onesie",
    description: "Ultra-soft, breathable onesie made from certified organic cotton. Gentle on delicate skin with easy snap buttons for quick changes.",
    price: 599,
    originalPrice: 899,
    badge: "Bestseller",
    rating: 4.8,
    category: "Clothing",
    ageGroup: "0-3m",
    stock: 50,
    featured: true,
    flashDeal: true,
    image: "https://via.placeholder.com/900x900?text=Organic+Cotton+Onesie",
    images: [
      "https://via.placeholder.com/900x900?text=Organic+Cotton+Onesie+1",
      "https://via.placeholder.com/900x900?text=Organic+Cotton+Onesie+2",
      "https://via.placeholder.com/900x900?text=Organic+Cotton+Onesie+3",
    ],
  },
  {
    id: 2,
    title: "Bamboo Baby Blanket",
    description: "Feather-light bamboo blend blanket that keeps your baby cozy without overheating. Perfect for naps, stroller rides, and cuddles.",
    price: 749,
    originalPrice: 1099,
    badge: "New",
    rating: 4.9,
    category: "Bedding",
    ageGroup: "0-3m",
    stock: 35,
    featured: true,
    flashDeal: true,
    image: "https://via.placeholder.com/900x900?text=Bamboo+Baby+Blanket",
    images: [
      "https://via.placeholder.com/900x900?text=Bamboo+Baby+Blanket+1",
      "https://via.placeholder.com/900x900?text=Bamboo+Baby+Blanket+2",
      "https://via.placeholder.com/900x900?text=Bamboo+Baby+Blanket+3",
    ],
  },
  {
    id: 3,
    title: "Wooden Rattle Set",
    description: "Natural wooden rattles designed for tiny hands. Smooth finish, rounded edges, and sensory-friendly sound for safe early play.",
    price: 349,
    rating: 4.6,
    category: "Toys",
    ageGroup: "3-12m",
    stock: 100,
    featured: true,
    image: "https://via.placeholder.com/900x900?text=Wooden+Rattle+Set",
    images: [
      "https://via.placeholder.com/900x900?text=Wooden+Rattle+Set+1",
      "https://via.placeholder.com/900x900?text=Wooden+Rattle+Set+2"],
  },
  {
    id: 4,
    title: "Baby Skincare Gift Box",
    description: "Complete skincare kit with mild cleanser, lotion, and massage oil. Dermatologically tested and crafted for everyday baby care.",
    price: 999,
    originalPrice: 1499,
    badge: "33% OFF",
    rating: 4.7,
    category: "Skincare",
    ageGroup: "0-3m",
    stock: 25,
    featured: true,
    flashDeal: true,
    image: "https://via.placeholder.com/900x900?text=Skincare+Gift+Box",
    images: [
      "https://via.placeholder.com/900x900?text=Skincare+Gift+Box+1",
      "https://via.placeholder.com/900x900?text=Skincare+Gift+Box+2",
      "https://via.placeholder.com/900x900?text=Skincare+Gift+Box+3",
    ],
  },
  {
    id: 5,
    title: "Muslin Swaddle Pack (3)",
    description: "Set of three airy muslin swaddles with playful prints. Multi-use for swaddling, burping, nursing cover, and stroller shade.",
    price: 649,
    rating: 4.5,
    category: "Bedding",
    ageGroup: "0-3m",
    stock: 60,
    featured: true,
    image: "https://via.placeholder.com/900x900?text=Muslin+Swaddle+Pack",
    images: [
      "https://via.placeholder.com/900x900?text=Muslin+Swaddle+Pack+1",
      "https://via.placeholder.com/900x900?text=Muslin+Swaddle+Pack+2",
      "https://via.placeholder.com/900x900?text=Muslin+Swaddle+Pack+3",
    ],
  },
  {
    id: 6,
    title: "Soft Plush Teddy Bear",
    description: "Huggable plush companion made with baby-safe fabric. Lightweight and comforting for bedtime and travel.",
    price: 499,
    originalPrice: 699,
    rating: 4.8,
    category: "Toys",
    ageGroup: "1-3y",
    stock: 45,
    featured: true,
    image: "https://via.placeholder.com/900x900?text=Plush+Teddy+Bear",
  },
  {
    id: 7,
    title: "Natural Teething Toy",
    description: "Soothing teether made from non-toxic materials with textured grip points to support oral development and comfort sore gums.",
    price: 299,
    badge: "Eco",
    rating: 4.4,
    category: "Toys",
    ageGroup: "3-12m",
    stock: 80,
    featured: true,
    flashDeal: true,
    image: "https://via.placeholder.com/900x900?text=Natural+Teething+Toy",
  },
  {
    id: 8,
    title: "Baby Milestone Cards",
    description: "Set of beautifully designed milestone cards to capture your baby's first year. Perfect for photos and keepsakes.",
    price: 399,
    rating: 4.6,
    category: "Accessories",
    ageGroup: "0-3m",
    stock: 40,
    featured: true,
    image: "https://via.placeholder.com/900x900?text=Baby+Milestone+Cards",
  },
  {
    id: 9,
    title: "Organic Baby Lotion",
    description: "Nourishing lotion with natural ingredients. Hypoallergenic formula for daily moisturizing and massage.",
    price: 449,
    originalPrice: 599,
    rating: 4.7,
    category: "Skincare",
    ageGroup: "3-12m",
    stock: 70,
    image: "https://via.placeholder.com/900x900?text=Organic+Baby+Lotion",
  },
  {
    id: 10,
    title: "Cotton Bib Set (5)",
    description: "Pack of five soft, absorbent bibs with adjustable snaps. Machine washable and quick-drying.",
    price: 379,
    rating: 4.5,
    category: "Clothing",
    ageGroup: "3-12m",
    stock: 90,
    image: "https://via.placeholder.com/900x900?text=Cotton+Bib+Set",
  },
  {
    id: 11,
    title: "Stacking Ring Toy",
    description: "Colorful stacking rings that help develop motor skills and hand-eye coordination. Made from safe, non-toxic materials.",
    price: 259,
    badge: "Popular",
    rating: 4.3,
    category: "Toys",
    ageGroup: "1-3y",
    stock: 55,
    image: "https://via.placeholder.com/900x900?text=Stacking+Ring+Toy",
  },
  {
    id: 12,
    title: "Baby Bath Towel Set",
    description: "Ultra-absorbent hooded towel set with soft terry cloth. Perfect for bath time and beach days.",
    price: 549,
    originalPrice: 799,
    rating: 4.6,
    category: "Accessories",
    ageGroup: "3-12m",
    stock: 40,
    image: "https://via.placeholder.com/900x900?text=Baby+Bath+Towel+Set",
  },
  {
    id: 13,
    title: "Kids Art Smock",
    description: "Waterproof art smock with long sleeves and pockets. Keeps clothes clean during creative play.",
    price: 329,
    rating: 4.2,
    category: "Clothing",
    ageGroup: "3-5y",
    stock: 30,
    image: "https://via.placeholder.com/900x900?text=Kids+Art+Smock",
  },
  {
    id: 14,
    title: "Building Blocks Set",
    description: "Large set of colorful building blocks that encourage creativity and problem-solving. Safe, smooth edges.",
    price: 899,
    originalPrice: 1199,
    badge: "New",
    rating: 4.7,
    category: "Toys",
    ageGroup: "3-5y",
    stock: 35,
    image: "https://via.placeholder.com/900x900?text=Building+Blocks+Set",
  },
  {
    id: 15,
    title: "Junior Backpack",
    description: "Lightweight, ergonomic backpack perfect for preschool. Multiple compartments and adjustable straps.",
    price: 699,
    rating: 4.5,
    category: "Accessories",
    ageGroup: "5-10y",
    stock: 45,
    image: "https://via.placeholder.com/900x900?text=Junior+Backpack",
  },
  {
    id: 16,
    title: "Science Experiment Kit",
    description: "Fun, educational STEM kit with safe experiments. Includes instruction booklet and all necessary materials.",
    price: 1299,
    originalPrice: 1599,
    badge: "STEM",
    rating: 4.9,
    category: "Toys",
    ageGroup: "5-10y",
    stock: 20,
    image: "https://via.placeholder.com/900x900?text=Science+Experiment+Kit",
  },
];

// Helper functions to filter mock data
export const getFeaturedProducts = (limit?: number): Product[] => {
  const featured = mockProducts.filter(p => p.featured);
  return limit ? featured.slice(0, limit) : featured;
};

export const getFlashDeals = (limit?: number): Product[] => {
  const deals = mockProducts.filter(p => p.flashDeal);
  return limit ? deals.slice(0, limit) : deals;
};

export const getProductById = (id: number): Product | undefined => {
  return mockProducts.find(p => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return mockProducts.filter(p => p.category === category);
};

export const getProductsByAgeGroup = (ageGroup: string): Product[] => {
  return mockProducts.filter(p => p.ageGroup === ageGroup);
};
