import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Shop() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Capitalize category for display
  const categoryTitle = category 
    ? category.charAt(0).toUpperCase() + category.slice(1) + "'s"
    : 'All';

  useEffect(() => {
    setLoading(true);
    
    // Fetch products based on category
    const fetchProducts = async () => {
      const url = category 
        ? `/api/products?category=${category}`
        : '/api/products';
      
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, [category]); // Re-fetch when category changes

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Dynamic header */}
        <h1 className="text-4xl font-serif mb-8">
          {categoryTitle} Collection
        </h1>
        
        {/* Category description - changes based on category */}
        {category === 'men' && (
          <p className="text-gray-600 mb-8">
            Discover our curated collection of men's fashion
          </p>
        )}
        
        {category === 'women' && (
          <p className="text-gray-600 mb-8">
            Explore the latest trends in women's apparel
          </p>
        )}

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}