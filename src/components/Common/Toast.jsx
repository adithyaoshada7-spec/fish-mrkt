import React from 'react';
import { CheckCircle2, Info } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const Toast = () => {
  const { toast } = useCart();
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-gray-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-gray-700 text-xs font-semibold animate-in slide-in-from-bottom-5 duration-200">
      {toast.type === 'info' ? (
        <Info className="w-4 h-4 text-sky-400 flex-shrink-0" />
      ) : (
        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
      )}
      <span>{toast.message}</span>
    </div>
  );
};
