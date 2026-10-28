import React from 'react';
import { ProductCard } from './ProductCard';
import { RotateCcw } from 'lucide-react';

export const ProductGrid = ({ products, viewMode, onResetFilters }) => {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center my-6">
        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
          🐟
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">No dried seafood found</h3>
        <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
          We couldn't find any items matching your selected filters. Try loosening your price limit or clearing category restrictions.
        </p>
        <button
          onClick={onResetFilters}
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition"
        >
          <RotateCcw className="w-4 h-4" /> Reset All Filters
        </button>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} viewMode="list" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} viewMode="grid" />
      ))}
    </div>
  );
};
