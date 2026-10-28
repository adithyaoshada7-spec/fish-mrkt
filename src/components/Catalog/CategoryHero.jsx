import React from 'react';
import { Sparkles, Shield, Anchor, Award } from 'lucide-react';
import { CATEGORIES } from '../../data/products';

export const CategoryHero = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-stone-900 via-neutral-800 to-red-950 text-white rounded-2xl p-6 sm:p-8 mb-6 shadow-xl border border-stone-800">
      
      {/* Subtle decorative background fish/wave patterns */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
      
      <div className="relative z-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 bg-red-600/30 border border-red-500/40 text-red-200 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 backdrop-blur-sm">
          <Anchor className="w-3.5 h-3.5 text-yellow-400" />
          <span>Curated Oceanic Harvest</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-2 leading-tight">
          Dried Seafood & Stock Fish
          <span className="block text-lg sm:text-xl font-medium text-stone-300 mt-1">
            건어물 (Premium Sun-Dried Sri Lankan & Asian Varieties)
          </span>
        </h1>

        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-2xl mb-5">
          Traditional coastal sun-drying methods preserve natural ocean richness, wholesome minerals, and savory umami. Browse restaurant-grade dried Queenfish (Katta), King Seer fish, crispy broth anchovies, jumbo dried prawns, and dashi stock packs.
        </p>

        {/* Value Props Row */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-stone-300 mb-6">
          <span className="flex items-center gap-1.5 bg-black/30 px-3 py-1 rounded-lg border border-white/10">
            <Shield className="w-3.5 h-3.5 text-emerald-400" /> 100% Preservative Free
          </span>
          <span className="flex items-center gap-1.5 bg-black/30 px-3 py-1 rounded-lg border border-white/10">
            <Award className="w-3.5 h-3.5 text-yellow-400" /> Export Quality Selected
          </span>
          <span className="flex items-center gap-1.5 bg-black/30 px-3 py-1 rounded-lg border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Vacuum-Sealed Freshness
          </span>
        </div>

        {/* Quick Filter Tag Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/40 ring-2 ring-white/20'
                    : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/10'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-red-800' : 'bg-black/30'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
