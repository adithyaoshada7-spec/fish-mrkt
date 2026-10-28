import React from 'react';
import { LayoutGrid, List, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { SORT_OPTIONS } from '../../data/products';

export const SortAndToolbar = ({
  resultsCount,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  onOpenMobileFilter,
  activeFiltersCount,
}) => {
  return (
    <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-gray-200 shadow-xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
      
      {/* Result Count & Mobile Filter Trigger */}
      <div className="flex items-center justify-between w-full sm:w-auto gap-3">
        <span className="text-xs sm:text-sm font-semibold text-gray-700">
          Showing <span className="font-bold text-gray-950">{resultsCount}</span> premium dried seafood items
        </span>

        {/* Mobile filter button */}
        <button
          onClick={onOpenMobileFilter}
          className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-lg transition"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-red-600" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="w-4 h-4 bg-red-600 text-white rounded-full text-[10px] flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Controls: Sort Dropdown & Grid / List View */}
      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3">
        
        {/* Sort Select */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-xs font-medium text-gray-500 whitespace-nowrap hidden md:inline flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5" /> Sort by:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="text-xs font-semibold bg-gray-50 border border-gray-300 text-gray-800 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* View Switcher */}
        <div className="flex items-center border border-gray-200 rounded-lg p-0.5 bg-gray-50">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-1.5 rounded transition ${
              viewMode === 'grid'
                ? 'bg-white shadow-xs text-red-600 font-bold'
                : 'text-gray-400 hover:text-gray-700'
            }`}
            title="Grid view"
            aria-label="Grid view"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-1.5 rounded transition ${
              viewMode === 'list'
                ? 'bg-white shadow-xs text-red-600 font-bold'
                : 'text-gray-400 hover:text-gray-700'
            }`}
            title="List view"
            aria-label="List view"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
