import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck, Sparkles, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    subtotal,
    FREE_SHIPPING_THRESHOLD,
    amountToFreeShipping,
    freeShippingProgress,
    showToast,
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'HMART10' || promoCode.trim().toUpperCase() === 'DRYFISH10') {
      setAppliedDiscount(subtotal * 0.1);
      setPromoMessage('10% Discount Applied Successfully!');
      showToast('10% Discount Applied!');
    } else {
      setPromoMessage('Invalid coupon code. Try: DRYFISH10');
    }
  };

  const finalTotal = Math.max(0, subtotal - appliedDiscount);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-red-600" />
              <h2 className="text-base font-extrabold text-gray-900">
                Your Shopping Cart ({totalItems})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3.5 bg-red-50/60 border-b border-red-100">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-800 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-red-600" />
                {amountToFreeShipping > 0 ? (
                  <>
                    Add <strong className="text-red-600">Rs. {amountToFreeShipping.toLocaleString()}</strong> more for FREE Shipping!
                  </>
                ) : (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Congratulations! You unlocked FREE Delivery!
                  </span>
                )}
              </span>
              <span className="text-[11px] font-bold text-gray-500">
                {Math.round(freeShippingProgress)}%
              </span>
            </div>
            <div className="w-full bg-red-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-red-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-gray-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-3xl mb-3">
                  🛒
                </div>
                <h3 className="text-base font-bold text-gray-800 mb-1">Your cart is empty</h3>
                <p className="text-xs text-gray-500 max-w-xs mb-6">
                  Explore our premium dried anchovies, Katta Karawala, and broth stock packs to add items.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-red-600 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md hover:bg-red-700 transition"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.key} className="py-4 flex gap-4 items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover border border-gray-100 bg-gray-50 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-gray-900 truncate">{item.name}</h4>
                    <p className="text-[11px] text-gray-500 truncate">{item.localName}</p>
                    <div className="inline-block bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded mt-1">
                      {item.weightLabel}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controller */}
                      <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                        <button
                          onClick={() => updateQuantity(item.key, -1)}
                          className="w-6 h-6 flex items-center justify-center text-xs font-bold text-gray-600 hover:bg-white rounded transition"
                        >
                          -
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.key, 1)}
                          className="w-6 h-6 flex items-center justify-center text-xs font-bold text-gray-600 hover:bg-white rounded transition"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-xs font-extrabold text-gray-900">
                          Rs. {(item.unitPrice * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.key)}
                    className="p-1.5 text-gray-300 hover:text-red-600 transition"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-gray-100 bg-gray-50/50 space-y-3">
              
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (Try: DRYFISH10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-red-500 uppercase"
                />
                <button
                  type="submit"
                  className="bg-gray-800 hover:bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition"
                >
                  Apply
                </button>
              </form>
              {promoMessage && (
                <p className={`text-[11px] font-semibold ${appliedDiscount > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                  {promoMessage}
                </p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">Rs. {subtotal.toLocaleString()}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount (10%)</span>
                    <span>- Rs. {appliedDiscount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-bold text-gray-900">
                    {amountToFreeShipping === 0 ? (
                      <span className="text-emerald-600 font-bold uppercase text-[11px]">Free</span>
                    ) : (
                      'Rs. 450'
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-gray-950 pt-2 border-t border-gray-200">
                  <span>Total Amount</span>
                  <span className="text-red-600 text-base">
                    Rs. {(finalTotal + (amountToFreeShipping === 0 ? 0 : 450)).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => {
                  alert(`Thank you for testing! Proceeding to secure checkout with Rs. ${(finalTotal + (amountToFreeShipping === 0 ? 0 : 450)).toLocaleString()} worth of fresh dried seafood.`);
                }}
                className="w-full bg-red-600 hover:bg-red-700 active:scale-98 text-white font-extrabold text-sm py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] text-gray-400 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Safe & Secure Checkout
                </span>
                <span>&bull;</span>
                <span>Cash on Delivery / Visa / Master</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
