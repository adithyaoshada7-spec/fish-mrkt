import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';

export const WishlistDrawer = () => {
  const { wishlist, toggleWishlist, isWishlistOpen, setIsWishlistOpen, addToCart } = useCart();

  if (!isWishlistOpen) return null;

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-600 fill-red-600" />
              <h2 className="text-base font-extrabold text-gray-900">
                Saved Favorites ({wishlist.length})
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-gray-100">
            {savedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400">
                <div className="w-16 h-16 bg-red-50 text-red-400 rounded-full flex items-center justify-center text-3xl mb-3">
                  🤍
                </div>
                <h3 className="text-base font-bold text-gray-800 mb-1">No favorites saved yet</h3>
                <p className="text-xs text-gray-500 max-w-xs mb-6">
                  Click the heart icon on any dried seafood card to save items for later.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="bg-red-600 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md hover:bg-red-700 transition"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              savedProducts.map((product) => (
                <div key={product.id} className="py-4 flex gap-4 items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-xl object-cover border border-gray-100 bg-gray-50 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-gray-900 truncate">{product.name}</h4>
                    <p className="text-[11px] text-gray-500 truncate">{product.localName}</p>
                    <div className="text-xs font-bold text-red-600 mt-1">
                      Rs. {product.basePrice.toLocaleString()} ({product.weights[0].label})
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        addToCart(product, product.weights[0], 1);
                        toggleWishlist(product.id);
                      }}
                      className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-sm transition"
                      title="Move to cart"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t border-gray-100 bg-gray-50 text-center">
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="text-xs font-bold text-gray-600 hover:text-gray-900"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
