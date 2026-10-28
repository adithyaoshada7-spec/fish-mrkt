import React, { useState } from 'react';
import { Mail, Phone, MapPin, ShieldCheck, Truck, RefreshCw, Award, Send } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 mt-16 border-t border-stone-800">
      
      {/* 4 Feature Highlights Band */}
      <div className="border-b border-stone-800 bg-stone-950/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/10 border border-red-500/20 text-red-500 flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Fast Dispatch</h4>
              <p className="text-[11px] text-stone-400">Islandwide delivery within 24-48h</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600/10 border border-amber-500/20 text-amber-500 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">100% Sun-Cured</h4>
              <p className="text-[11px] text-stone-400">Zero artificial preservatives</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Premium Selection</h4>
              <p className="text-[11px] text-stone-400">Hand-graded & vacuum sealed</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-600/10 border border-sky-500/20 text-sky-500 flex items-center justify-center flex-shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Freshness Guarantee</h4>
              <p className="text-[11px] text-stone-400">Satisfaction or easy replacement</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center text-white font-black text-lg">
                H
              </div>
              <span className="text-xl font-black text-white tracking-tight">H MART SEAFOOD</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Your premier online destination for authentic sun-dried fish, premium soup stock anchovies, Maldives fish, and deep-sea oceanic delicacies. Curated straight from coastal fisheries to your kitchen table.
            </p>
            <div className="text-xs text-stone-400 space-y-1">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-500" /> Colombo 03, Sri Lanka / Express Hub
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-red-500" /> Customer Support: +94 77 123 4567
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Categories</h4>
            <ul className="text-xs space-y-2 text-stone-400">
              <li><a href="#" className="hover:text-white transition">Katta Karawala (Queenfish)</a></li>
              <li><a href="#" className="hover:text-white transition">Thora Karawala (Seer Fish)</a></li>
              <li><a href="#" className="hover:text-white transition">Soup Broth Anchovies (Myeolchi)</a></li>
              <li><a href="#" className="hover:text-white transition">Dried Jumbo Prawns & Squid</a></li>
              <li><a href="#" className="hover:text-white transition">Maldive Fish (Umbalakada)</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Customer Support</h4>
            <ul className="text-xs space-y-2 text-stone-400">
              <li><a href="#" className="hover:text-white transition">Track Your Order</a></li>
              <li><a href="#" className="hover:text-white transition">Delivery Information & Rates</a></li>
              <li><a href="#" className="hover:text-white transition">Storage & Cooking Advice</a></li>
              <li><a href="#" className="hover:text-white transition">Wholesale / Bulk Orders</a></li>
              <li><a href="#" className="hover:text-white transition">Frequently Asked Questions</a></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Join the Club</h4>
            <p className="text-xs text-stone-400 mb-3">
              Subscribe to get seasonal catch alerts, recipes, and Rs. 500 off your first dried fish order.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2 rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <span>Subscribe</span> <Send className="w-3 h-3" />
              </button>
            </form>
            {subscribed && (
              <p className="text-[11px] text-emerald-400 font-semibold mt-1">
                Thank you! Check your inbox for the discount code.
              </p>
            )}
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="mt-12 pt-6 border-t border-stone-800 text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} H Mart Dried Seafood Co. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Export Certifications</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
