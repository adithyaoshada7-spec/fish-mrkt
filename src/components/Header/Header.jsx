import React, { useState, useRef, useEffect } from 'react';
import { Search, ShoppingBag, Heart, User, MapPin, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';

export const Header = ({ onSearchChange, searchTerm }) => {
  const { totalItems, subtotal, setIsCartOpen, wishlist, setIsWishlistOpen, setQuickViewProduct } = useCart();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchContainerRef = useRef(null);

  // Close search suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered preview products for live autocomplete dropdown
  const previewProducts = searchTerm.trim()
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.localName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 4)
    : [];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -ml-2 text-gray-700 hover:text-red-700 lg:hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Toggle mobile navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-6">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-11 h-11 bg-red-600 rounded-xl flex items-center justify-center text-white shadow-md group-hover:bg-red-700 transition transform group-hover:scale-105">
                <span className="text-2xl font-black">H</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-extrabold tracking-tight text-gray-900 group-hover:text-red-600 transition">
                    H MART
                  </span>
                  <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-red-50 px-1.5 py-0.5 rounded border border-red-200">
                    SEAFOOD
                  </span>
                </div>
                <span className="text-[11px] font-medium text-gray-500 tracking-tight">
                  Premium Sun-Dried Fish & Broth
                </span>
              </div>
            </a>

            {/* Store / Delivery Location Selector */}
            <div className="hidden xl:flex items-center gap-2 pl-4 border-l border-gray-200 text-xs text-gray-600 hover:text-gray-900 cursor-pointer py-1">
              <MapPin className="w-4 h-4 text-red-600 flex-shrink-0" />
              <div>
                <div className="text-[10px] text-gray-400 font-medium">Deliver to</div>
                <div className="font-semibold text-gray-800 flex items-center gap-1">
                  Colombo & Suburbs <ChevronDown className="w-3 h-3 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar with Live Instant Autocomplete */}
          <div ref={searchContainerRef} className="relative flex-1 max-w-2xl mx-2 sm:mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search dried fish, katta, thora, sprats, broth packs..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full pl-11 pr-24 py-2.5 bg-gray-50 border border-gray-300 rounded-full text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:bg-white transition shadow-inner placeholder:text-gray-400"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              
              {searchTerm && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-20 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs px-1"
                >
                  Clear
                </button>
              )}

              <button className="absolute right-1 top-1 bottom-1 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-full transition shadow-sm">
                Search
              </button>
            </div>

            {/* Instant Search Autocomplete Dropdown */}
            {isSearchFocused && searchTerm.trim().length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-500">
                  <span>Quick Matching Products ({previewProducts.length})</span>
                  <span className="text-red-600">Press Esc to close</span>
                </div>

                {previewProducts.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {previewProducts.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          setQuickViewProduct(item);
                          setIsSearchFocused(false);
                        }}
                        className="flex items-center gap-3 p-3 hover:bg-red-50/50 cursor-pointer transition group"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                          loading="lazy"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-gray-900 group-hover:text-red-600 truncate">
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-gray-500">{item.localName}</p>
                          <span className="text-[10px] text-gray-400 font-medium">
                            {item.weights[0].label} &bull; {item.origin}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-extrabold text-red-600">
                            Rs. {item.basePrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-sm text-gray-500">
                    No products matched "<span className="font-semibold text-gray-800">{searchTerm}</span>". Try searching "Katta", "Thora", or "Anchovies".
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User Actions: Account, Wishlist, Cart Drawer */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Account */}
            <div className="hidden md:flex items-center gap-2 text-gray-700 hover:text-red-600 cursor-pointer p-1.5 rounded-lg transition">
              <User className="w-5 h-5 text-gray-600" />
              <div className="text-left text-xs leading-tight hidden lg:block">
                <span className="text-gray-400 text-[10px] block">Sign In / Register</span>
                <span className="font-bold text-gray-800">My Account</span>
              </div>
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2.5 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-full transition"
              title="Saved Items"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white px-3.5 py-2.5 rounded-full shadow-md hover:shadow-lg transition group"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 group-hover:rotate-6 transition-transform" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-yellow-400 text-gray-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-red-600">
                    {totalItems}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left leading-none pr-1">
                <span className="text-[10px] text-red-200 uppercase font-semibold">Cart</span>
                <span className="text-xs font-black text-white">
                  Rs. {subtotal.toLocaleString()}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-3 pb-4 space-y-2 animate-in slide-in-from-top-2">
            <div className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-600" /> Deliver to: Colombo
              </span>
              <span className="text-xs font-bold text-red-600">Change</span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button 
                onClick={() => { setIsWishlistOpen(true); setMobileMenuOpen(false); }}
                className="flex items-center justify-center gap-2 py-2 text-xs font-semibold bg-gray-100 rounded-lg text-gray-800"
              >
                <Heart className="w-4 h-4 text-red-500" /> Favorites ({wishlist.length})
              </button>
              <button 
                className="flex items-center justify-center gap-2 py-2 text-xs font-semibold bg-gray-100 rounded-lg text-gray-800"
              >
                <User className="w-4 h-4 text-gray-700" /> Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
