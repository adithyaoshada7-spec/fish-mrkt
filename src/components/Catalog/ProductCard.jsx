import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Eye, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const ProductCard = ({ product, viewMode = 'grid' }) => {
  const { addToCart, wishlist, toggleWishlist, setQuickViewProduct } = useCart();
  
  // Selected weight state (defaults to the first weight tier)
  const [selectedWeightIndex, setSelectedWeightIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  const currentWeight = product.weights[selectedWeightIndex];
  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, currentWeight, 1);
    setTimeout(() => setIsAdding(false), 800);
  };

  // Discount calculation
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.basePrice) / product.originalPrice) * 100)
    : null;

  /* ================= LIST VIEW ================= */
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 hover:border-red-400 hover:shadow-xl transition-all duration-300 p-4 flex flex-col sm:flex-row gap-5 group relative">
        {/* Thumbnail Image */}
        <div className="relative w-full sm:w-52 h-48 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
            {product.badges?.map((badge, idx) => (
              <span
                key={idx}
                className="bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow-sm uppercase tracking-wide"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Quick view button */}
          <button
            onClick={() => setQuickViewProduct(product)}
            className="absolute bottom-2.5 right-2.5 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition"
            title="Quick view"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Content Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider">
                  {product.brand} &bull; {product.origin}
                </span>
                <h3
                  onClick={() => setQuickViewProduct(product)}
                  className="text-base font-bold text-gray-900 group-hover:text-red-600 cursor-pointer transition mt-0.5"
                >
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 font-medium">{product.localName}</p>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-2 rounded-full border transition ${
                  isWishlisted
                    ? 'bg-red-50 border-red-200 text-red-600'
                    : 'bg-white border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200'
                }`}
                title="Save to favorites"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-600' : ''}`} />
              </button>
            </div>

            {/* Ratings */}
            <div className="flex items-center gap-1.5 mt-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-gray-800">{product.rating}</span>
              <span className="text-xs text-gray-400">({product.reviewsCount} reviews)</span>
            </div>

            <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Pricing & Weight Selector Bar */}
          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
            
            {/* Weight Switcher Pills */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-gray-400 font-semibold mr-1">Pack:</span>
              {product.weights.map((w, idx) => (
                <button
                  key={w.label}
                  onClick={() => setSelectedWeightIndex(idx)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition ${
                    selectedWeightIndex === idx
                      ? 'bg-gray-900 text-white shadow-xs'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {w.label}
                </button>
              ))}
            </div>

            {/* Price & Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-lg font-extrabold text-red-600">
                  Rs. {currentWeight.price.toLocaleString()}
                </div>
                {product.originalPrice && selectedWeightIndex === 0 && (
                  <span className="text-xs text-gray-400 line-through">
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition transform active:scale-95 disabled:bg-emerald-600"
              >
                {isAdding ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" /> Added!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" /> Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ================= GRID VIEW ================= */
  return (
    <div className="bg-white rounded-2xl border border-gray-200 hover:border-red-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden relative">
      
      {/* Top Media Container */}
      <div className="relative aspect-4/3 bg-gray-100 overflow-hidden cursor-pointer" onClick={() => setQuickViewProduct(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges Over Image */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {discountPercent && discountPercent > 0 && (
            <span className="bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow-sm tracking-wide uppercase">
              Save {discountPercent}%
            </span>
          )}
          {product.badges?.slice(0, 1).map((badge, idx) => (
            <span
              key={idx}
              className="bg-amber-500 text-gray-950 text-[10px] font-extrabold px-2 py-0.5 rounded shadow-sm tracking-wide uppercase"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full shadow-md transition z-10 ${
            isWishlisted
              ? 'bg-white text-red-600 ring-2 ring-red-500'
              : 'bg-white/90 hover:bg-white text-gray-400 hover:text-red-500'
          }`}
          title="Save to favorites"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-600 text-red-600' : ''}`} />
        </button>

        {/* Quick View Hover Pill */}
        <div className="absolute inset-x-0 bottom-3 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="bg-white/95 hover:bg-white text-gray-900 text-xs font-bold py-1.5 px-4 rounded-full shadow-lg flex items-center gap-1.5 border border-gray-200 transition"
          >
            <Eye className="w-3.5 h-3.5 text-red-600" /> Quick View
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Brand & Origin */}
          <div className="flex items-center justify-between text-[11px] text-gray-400 font-semibold mb-1">
            <span className="text-red-600 uppercase tracking-wider truncate">{product.brand}</span>
            <span className="truncate max-w-[120px]">{product.origin.split(',')[0]}</span>
          </div>

          {/* Title */}
          <h3
            onClick={() => setQuickViewProduct(product)}
            className="text-sm font-bold text-gray-900 group-hover:text-red-600 transition line-clamp-2 leading-snug cursor-pointer min-h-[2.5rem]"
            title={product.name}
          >
            {product.name}
          </h3>
          <p className="text-[11px] text-gray-500 font-medium mt-0.5 truncate">{product.localName}</p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-gray-200'}`}
                />
              ))}
            </div>
            <span className="text-[11px] font-bold text-gray-700">{product.rating}</span>
            <span className="text-[11px] text-gray-400">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Bottom Section: Weight Switcher, Price & Add to Cart */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          
          {/* Weight Selection Chips */}
          <div className="flex items-center gap-1.5 mb-3 overflow-x-auto scrollbar-none pb-1">
            {product.weights.map((w, idx) => (
              <button
                key={w.label}
                onClick={() => setSelectedWeightIndex(idx)}
                className={`px-2 py-1 text-[11px] rounded-lg font-bold transition whitespace-nowrap ${
                  selectedWeightIndex === idx
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {w.label}
              </button>
            ))}
          </div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="text-base font-black text-gray-950">
                Rs. {currentWeight.price.toLocaleString()}
              </div>
              {product.originalPrice && selectedWeightIndex === 0 && (
                <div className="text-[11px] text-gray-400 line-through">
                  Rs. {product.originalPrice.toLocaleString()}
                </div>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition disabled:bg-emerald-600"
            >
              {isAdding ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" /> Added
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" /> Add
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
