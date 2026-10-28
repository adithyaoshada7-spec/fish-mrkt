import React from 'react';
import { Flame, Sparkles, Fish, Utensils, Award, Tag } from 'lucide-react';

export const CategoryNav = ({ selectedCategory, onSelectCategory }) => {
  const links = [
    { id: 'all', label: 'All Dried Seafood', icon: Fish },
    { id: 'salted-fish', label: 'Premium Dried Fish & Steaks', icon: Award },
    { id: 'anchovies', label: 'Dried Anchovies & Sprats', icon: Sparkles },
    { id: 'squid-shellfish', label: 'Squid & Prawns', icon: Tag },
    { id: 'broth-packs', label: 'Soup Broth Packs', icon: Utensils },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 overflow-x-auto scrollbar-none sticky top-20 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-1 sm:space-x-2 py-2 min-w-max">
          
          <button 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 transition mr-2"
          >
            <Flame className="w-3.5 h-3.5 text-red-600 animate-bounce" />
            Weekly Deals
          </button>

          {links.map((link) => {
            const Icon = link.icon;
            const isActive = selectedCategory === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onSelectCategory(link.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                  isActive
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'text-gray-700 hover:text-red-600 hover:bg-gray-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-yellow-400' : 'text-gray-400'}`} />
                {link.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
