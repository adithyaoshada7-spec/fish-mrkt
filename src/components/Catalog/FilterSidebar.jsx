import React, { useState } from 'react';
import { ChevronDown, ChevronUp, RotateCcw, Filter, Check } from 'lucide-react';
import { CATEGORIES } from '../../data/products';

export const FilterSidebar = ({
  selectedCategory,
  onSelectCategory,
  maxPrice,
  onMaxPriceChange,
  inStockOnly,
  onInStockChange,
  selectedProcess,
  onSelectProcess,
  onResetFilters,
  isOpenOnMobile,
  onCloseMobile,
}) => {
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    processing: true,
    availability: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const processTypes = [
    { id: 'all', label: 'All Preparation Methods' },
    { id: 'Sun-Dried', label: 'Traditional Sun-Dried' },
    { id: 'Salt', label: 'Sea Salt Cured' },
    { id: 'Smoke', label: 'Smoke Cured / Umbalakada' },
    { id: 'Broth', label: 'Soup Stock / Tea-Bag Packs' },
  ];

  const sidebarContent = (
    <aside className="w-full space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-red-600" />
          <h3 className="text-sm font-bold text-gray-900 tracking-tight">Refine By</h3>
        </div>
        <button
          onClick={onResetFilters}
          className="text-xs text-red-600 hover:text-red-800 font-semibold flex items-center gap-1 hover:underline transition"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* 1. Category Filter */}
      <div className="border-b border-gray-100 pb-5">
        <button
          onClick={() => toggleSection('categories')}
          className="w-full flex items-center justify-between text-xs font-bold text-gray-900 uppercase tracking-wider py-1 hover:text-red-600 transition"
        >
          <span>Category</span>
          {openSections.categories ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </button>

        {openSections.categories && (
          <div className="mt-3 space-y-1.5">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition text-left ${
                    active
                      ? 'bg-red-50 text-red-700 font-bold border-l-4 border-red-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'
                  }`}
                >
                  <span className="truncate pr-2">{cat.name}</span>
                  <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full font-semibold">
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Price Range Filter */}
      <div className="border-b border-gray-100 pb-5">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between text-xs font-bold text-gray-900 uppercase tracking-wider py-1 hover:text-red-600 transition"
        >
          <span>Max Price (Rs.)</span>
          {openSections.price ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </button>

        {openSections.price && (
          <div className="mt-4 px-1">
            <div className="flex items-center justify-between text-xs font-bold text-gray-800 mb-2">
              <span>Up to:</span>
              <span className="text-red-600 text-sm">Rs. {Number(maxPrice).toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="800"
              max="5500"
              step="100"
              value={maxPrice}
              onChange={(e) => onMaxPriceChange(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
            />
            <div className="flex justify-between text-[11px] text-gray-400 mt-1.5">
              <span>Rs. 800</span>
              <span>Rs. 5,500+</span>
            </div>
          </div>
        )}
      </div>

      {/* 3. Preparation & Curing Style */}
      <div className="border-b border-gray-100 pb-5">
        <button
          onClick={() => toggleSection('processing')}
          className="w-full flex items-center justify-between text-xs font-bold text-gray-900 uppercase tracking-wider py-1 hover:text-red-600 transition"
        >
          <span>Curing & Type</span>
          {openSections.processing ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </button>

        {openSections.processing && (
          <div className="mt-3 space-y-2">
            {processTypes.map((item) => {
              const isChecked = selectedProcess === item.id;
              return (
                <label
                  key={item.id}
                  onClick={() => onSelectProcess(item.id)}
                  className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer hover:text-red-600 select-none"
                >
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center transition ${
                      isChecked ? 'bg-red-600 border-red-600 text-white' : 'border-gray-300 bg-white'
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className={isChecked ? 'font-bold text-gray-900' : 'font-medium'}>
                    {item.label}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Availability */}
      <div>
        <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer hover:text-gray-900 select-none">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onInStockChange(e.target.checked)}
            className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500 accent-red-600"
          />
          <span className="font-semibold">In Stock Items Only</span>
        </label>
      </div>

      {/* Trust Badge Card */}
      <div className="bg-amber-50/80 border border-amber-200/60 rounded-xl p-3.5 text-xs text-amber-900">
        <div className="font-bold mb-1 flex items-center gap-1.5 text-amber-950">
          <span>🛡️ Pure Quality Pledge</span>
        </div>
        <p className="text-[11px] leading-relaxed text-amber-800">
          All our dried seafood is thoroughly sun-cured, hygienic, grit-free, and vacuum-sealed for maximum shelf-life.
        </p>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm h-fit sticky top-36">
        {sidebarContent}
      </div>

      {/* Mobile Filter Drawer Overlay */}
      {isOpenOnMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={onCloseMobile} />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full p-6 overflow-y-auto shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
                <h2 className="text-base font-bold text-gray-900">Filters</h2>
                <button onClick={onCloseMobile} className="text-gray-500 hover:text-gray-800 text-sm font-semibold">
                  Close ✕
                </button>
              </div>
              {sidebarContent}
            </div>
            <button
              onClick={onCloseMobile}
              className="mt-6 w-full bg-red-600 text-white font-bold py-3 rounded-xl shadow-md"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </>
  );
};
