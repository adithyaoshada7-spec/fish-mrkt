import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingBag, Heart, ShieldCheck, Flame, Utensils, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const QuickViewModal = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, wishlist, toggleWishlist } = useCart();
  const [selectedWeightIndex, setSelectedWeightIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Reset local state when product changes
  useEffect(() => {
    setSelectedWeightIndex(0);
    setQuantity(1);
    setIsAdded(false);
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const currentWeight = quickViewProduct.weights[selectedWeightIndex];
  const isWishlisted = wishlist.includes(quickViewProduct.id);

  const handleAddToCart = () => {
    setIsAdded(true);
    addToCart(quickViewProduct, currentWeight, quantity);
    setTimeout(() => {
      setIsAdded(false);
      setQuickViewProduct(null);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
          
          {/* Close Button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 text-gray-400 hover:text-gray-700 bg-white/80 hover:bg-white rounded-full shadow-md transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Image Column */}
            <div className="relative bg-gray-100 aspect-square md:aspect-auto">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
              />

              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                {quickViewProduct.badges?.map((badge, idx) => (
                  <span
                    key={idx}
                    className="bg-red-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded shadow-sm tracking-wide uppercase"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md text-white rounded-xl p-3 text-xs flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  100% Sun-Dried Quality
                </span>
                <span className="text-[11px] text-gray-300">
                  {quickViewProduct.origin}
                </span>
              </div>
            </div>

            {/* Info Column */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                    {quickViewProduct.brand}
                  </span>

                  <button
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    className="text-gray-400 hover:text-red-600 transition"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-600 text-red-600' : ''}`} />
                  </button>
                </div>

                <h2 className="text-xl font-extrabold text-gray-900 leading-snug">
                  {quickViewProduct.name}
                </h2>
                <p className="text-xs font-semibold text-gray-500 mt-0.5">
                  {quickViewProduct.localName}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(quickViewProduct.rating) ? 'fill-amber-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-gray-800">{quickViewProduct.rating}</span>
                  <span className="text-xs text-gray-400">({quickViewProduct.reviewsCount} reviews)</span>
                </div>

                {/* Price Display */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-2xl font-black text-red-600">
                    Rs. {(currentWeight.price * quantity).toLocaleString()}
                  </span>
                  {quickViewProduct.originalPrice && selectedWeightIndex === 0 && (
                    <span className="text-sm text-gray-400 line-through">
                      Rs. {(quickViewProduct.originalPrice * quantity).toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                  {quickViewProduct.description}
                </p>

                {/* Culinary Recipe / Preparation Advice */}
                <div className="mt-4 bg-amber-50/70 border border-amber-200/50 rounded-xl p-3 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
                    <Utensils className="w-3.5 h-3.5 text-amber-700" />
                    <span>How to prepare / Best culinary match:</span>
                  </div>
                  <p className="text-[11px] text-amber-800 leading-normal">
                    {quickViewProduct.culinaryTips}
                  </p>
                </div>

                {/* Weight Option Selectors */}
                <div className="mt-4">
                  <span className="text-xs font-bold text-gray-800 block mb-2">Select Pack Size:</span>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.weights.map((w, idx) => (
                      <button
                        key={w.label}
                        onClick={() => setSelectedWeightIndex(idx)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                          selectedWeightIndex === idx
                            ? 'bg-red-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <span>{w.label}</span>
                        <span className="text-[10px] opacity-80">(Rs. {w.price.toLocaleString()})</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions: Quantity & Add to Cart */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-3">
                {/* Quantity Controls */}
                <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-gray-600 hover:bg-white transition"
                  >
                    -
                  </button>
                  <span className="w-9 text-center font-bold text-sm text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-gray-600 hover:bg-white transition"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 active:scale-95 text-white py-3 px-6 rounded-xl font-extrabold text-sm shadow-lg hover:shadow-xl transition disabled:bg-emerald-600"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" /> Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Add to Cart &bull; Rs. {(currentWeight.price * quantity).toLocaleString()}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
