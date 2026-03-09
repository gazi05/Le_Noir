// Import your images (assuming they're in assets/images/)
import product1 from '../assets/images/2.webp';  // Midnight Linen Set
import product2 from '../assets/images/6.webp';  // Noir Essential Blazer
import product3 from '../assets/images/13.webp';  // Earth Tone Dress

export const products = [
  { 
    id: 1, 
    name: "Midnight Linen Set", 
    price: "89 JOD", 
    image: product1,
    category: "women"  // Added category for filtering
  },
  { 
    id: 2, 
    name: "Noir Essential Blazer", 
    price: "120 JOD", 
    image: product2,
    category: "men"    // Added category for filtering
  },
  { 
    id: 3, 
    name: "Earth Tone Dress", 
    price: "95 JOD", 
    image: product3,
    category: "women"  // Added category for filtering
  },
];

// Optional: Add helper functions
export const getProductsByCategory = (category) => {
  if (!category || category === 'all') return products;
  return products.filter(product => product.category === category);
};

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};