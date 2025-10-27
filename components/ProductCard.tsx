import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
  </svg>
);


const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const imageUrl = product.imageUrl || `https://loremflickr.com/400/300/${product.imageKeyword}?lock=${product.id}`;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative">
        <img src={imageUrl} alt={product.name} className="w-full h-48 object-cover" />
         <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1 flex-grow">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-xl font-bold text-gray-900">
            R${product.price.toFixed(2)}
            {product.unit && <span className="text-sm font-normal text-gray-500 ml-1">{product.unit}</span>}
          </p>
          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-transform duration-200 ease-in-out transform group-hover:scale-105"
            aria-label={`Add ${product.name} to cart`}
          >
            <PlusIcon className="h-5 w-5 mr-1" />
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
