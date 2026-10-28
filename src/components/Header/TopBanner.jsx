import React from 'react';
import { Truck, ShieldCheck, PhoneCall, Sparkles } from 'lucide-react';

export const TopBanner = () => {
  return (
    <div className="bg-[#b91c1c] text-white text-xs font-medium py-2 px-4 shadow-sm border-b border-red-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="bg-red-800/80 text-yellow-300 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Special Promo
          </span>
          <span>Free Islandwide Express Delivery on Dried Seafood Orders Over <strong>Rs. 5,000</strong>!</span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-red-100">
          <span className="flex items-center gap-1.5 hover:text-white transition">
            <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
            100% Naturally Sun-Dried & No Chemicals
          </span>
          <span className="flex items-center gap-1.5 hover:text-white transition">
            <Truck className="w-3.5 h-3.5 text-yellow-400" />
            Next-Day Dispatch
          </span>
          <a href="tel:+94771234567" className="flex items-center gap-1.5 font-semibold text-white hover:underline">
            <PhoneCall className="w-3.5 h-3.5" />
            Hotline: (077) 123-4567
          </a>
        </div>
      </div>
    </div>
  );
};
