import React, { useState, useMemo } from 'react';
import { CartProvider } from './context/CartContext';
import { TopBanner } from './components/Header/TopBanner';
import { Header } from './components/Header/Header';
import { CategoryNav } from './components/Navigation/CategoryNav';
import { Breadcrumbs } from './components/Catalog/Breadcrumbs';
import { CategoryHero } from './components/Catalog/CategoryHero';
import { FilterSidebar } from './components/Catalog/FilterSidebar';
import { SortAndToolbar } from './components/Catalog/SortAndToolbar';
import { ProductGrid } from './components/Catalog/ProductGrid';
import { Footer } from './components/Footer/Footer';
import { CartDrawer } from './components/Cart/CartDrawer';
import { WishlistDrawer } from './components/Cart/WishlistDrawer';
import { QuickViewModal } from './components/Modals/QuickViewModal';
import { Toast } from './components/Common/Toast';
import { PRODUCTS, CATEGORIES } from './data/products';

function StoreApp() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState(5500);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedProcess, setSelectedProcess] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Active filters count for badge display
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'all') count++;
    if (maxPrice < 5500) count++;
    if (inStockOnly) count++;
    if (selectedProcess !== 'all') count++;
    if (searchTerm.trim() !== '') count++;
    return count;
  }, [selectedCategory, maxPrice, inStockOnly, selectedProcess, searchTerm]);

  // Reset filters
  const handleResetFilters = () => {
    setSelectedCategory('all');
    setMaxPrice(5500);
    setInStockOnly(false);
    setSelectedProcess('all');
    setSearchTerm('');
  };

  // Real-time Instant Filter & Sort pipeline (Sub-millisecond)
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    // Category filter
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Search term filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.localName.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q)
      );
    }

    // Price filter (based on minimum starting price)
    list = list.filter((p) => p.basePrice <= maxPrice);

    // In Stock filter
    if (inStockOnly) {
      list = list.filter((p) => p.inStock);
    }

    // Curing / Process filter
    if (selectedProcess !== 'all') {
      list = list.filter((p) => {
        const text = `${p.saltLevel} ${p.badges.join(' ')} ${p.description}`.toLowerCase();
        return text.includes(selectedProcess.toLowerCase());
      });
    }

    // Sort order
    switch (sortBy) {
      case 'price-low':
        list.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case 'price-high':
        list.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case 'best-selling':
        list.sort((a, b) => b.reviewsCount - a.reviewsCount);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Featured - default order preserved
        break;
    }

    return list;
  }, [selectedCategory, searchTerm, maxPrice, inStockOnly, selectedProcess, sortBy]);

  const activeCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa]">
      {/* Top Banner */}
      <TopBanner />

      {/* Main Header with Search & Cart */}
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* Category Ribbon Nav */}
      <CategoryNav
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        
        {/* Breadcrumb Path */}
        <Breadcrumbs categoryName={activeCategoryObj?.name} />

        {/* Category Hero Banner */}
        <CategoryHero
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* 2-Column Catalog Layout */}
        <div className="flex gap-8 items-start">
          
          {/* Left Sidebar Filter */}
          <FilterSidebar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            maxPrice={maxPrice}
            onMaxPriceChange={setMaxPrice}
            inStockOnly={inStockOnly}
            onInStockChange={setInStockOnly}
            selectedProcess={selectedProcess}
            onSelectProcess={setSelectedProcess}
            onResetFilters={handleResetFilters}
            isOpenOnMobile={isMobileFilterOpen}
            onCloseMobile={() => setIsMobileFilterOpen(false)}
          />

          {/* Right Product Grid Column */}
          <div className="flex-1 min-w-0">
            {/* Search Query Active Indicator */}
            {searchTerm && (
              <div className="bg-red-50 border border-red-200 text-red-900 rounded-xl px-4 py-2.5 mb-4 text-xs flex items-center justify-between">
                <span>
                  Search results for: <strong>"{searchTerm}"</strong> ({filteredProducts.length} items found)
                </span>
                <button
                  onClick={() => setSearchTerm('')}
                  className="font-bold text-red-600 hover:underline"
                >
                  Clear search
                </button>
              </div>
            )}

            {/* Toolbar: Sorting & Layout Controls */}
            <SortAndToolbar
              resultsCount={filteredProducts.length}
              sortBy={sortBy}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onOpenMobileFilter={() => setIsMobileFilterOpen(true)}
              activeFiltersCount={activeFiltersCount}
            />

            {/* Product Cards Grid */}
            <ProductGrid
              products={filteredProducts}
              viewMode={viewMode}
              onResetFilters={handleResetFilters}
            />
          </div>
        </div>
      </main>

      {/* Comprehensive Footer */}
      <Footer />

      {/* Global Interactive Overlays */}
      <CartDrawer />
      <WishlistDrawer />
      <QuickViewModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <StoreApp />
    </CartProvider>
  );
}
