"use client"
import React, { useState, useEffect } from 'react';


const Loader = () => (
  <div className="loader-container">
    <div className="loader"></div>
  </div>
);

export default function ProductsPage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center mb-8">Products</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          {products.map((product) => (
            <div key={product._id} className="shadow-md rounded overflow-hidden bg-white hover:shadow-lg transition duration-300 ease-in-out">
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-t"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-700 text-base mb-2">
                  <span className="font-bold text-indigo-600">Category:</span> {product.category}
                </p>
                <p className="text-gray-700 text-base mb-2 truncate">
                  <span className="font-bold text-indigo-600">Description:</span> {product.description.slice(0, 100)}...
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-gray-700 text-base">
                    <span className="font-bold text-indigo-600">Price:</span> ${product.price.toFixed(2)}
                  </p>
                  <p className="text-gray-700 text-base">
                    <span className="font-bold text-indigo-600">Stock:</span> {product.stock}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


