import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs = ({ categoryName }) => {
  return (
    <nav className="flex items-center space-x-2 text-xs text-gray-500 py-3">
      <a href="#" className="flex items-center gap-1 hover:text-red-600 transition">
        <Home className="w-3.5 h-3.5 text-gray-400" />
        <span>Home</span>
      </a>
      <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
      <span className="hover:text-red-600 transition cursor-pointer">Seafood</span>
      <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
      <span className="font-semibold text-gray-900">{categoryName || 'Dried Seafood'}</span>
    </nav>
  );
};
