"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getCart, removeFromCart, updateQuantity, clearCart } from "@/lib/cartStorage";
import type { CartItem } from "@/lib/cartStorage";

const SHIPPING_THRESHOLD = 999;
const SHIPPING_COST = 79;

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<number | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  /* ── Load cart from localStorage on mount ── */
  useEffect(() => {
    setCart(getCart());
    setLoading(false);
  }, []);

  /* ── Derived values ── */
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalSavings = cart.reduce(
    (sum, item) => sum + ((item.originalPrice ?? item.price) - item.price) * item.quantity,
    0
  );
  const freeShipping = subtotal >= SHIPPING_THRESHOLD;
  const shipping = freeShipping ? 0 : SHIPPING_COST;
  const promoDiscount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + shipping - promoDiscount;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  /* ── Handlers ── */
  const updateQuantityHandler = (id: number, delta: number) => {
    const item = cart.find(i => i.id === id);
    if (item) {
      const newQty = Math.max(1, Math.min(10, item.quantity + delta));
      const updated = updateQuantity(id, newQty);
      setCart(updated);
    }
  };

  const removeItemHandler = (id: number) => {
    setRemovingId(id);
    setTimeout(() => {
      const updated = removeFromCart(id);
      setCart(updated);
      setRemovingId(null);
    }, 300);
  };

  const clearCartHandler = () => {
    clearCart();
    setCart([]);
  };

  const applyPromo = () => {
    if (promoCode.toUpperCase() === "BABY10") {
      setPromoApplied(true);
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-b from-white via-rose-50/20 to-white">
      {/* ─── Hero Banner ─── */}
      <section className="relative overflow-hidden py-10 md:py-20">
        <div className="absolute inset-0 bg-linear-to-br from-rose-100 via-amber-50/80 to-pink-100" />
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-rose-300 rounded-full blur-3xl opacity-25 pointer-events-none" />
        <div className="absolute -bottom-24 -right-16 w-96 h-96 bg-amber-200 rounded-full blur-3xl opacity-20 pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block text-sm font-medium tracking-widest uppercase text-rose-400 mb-3">
            Almost Yours
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="bg-linear-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
              Shopping Cart
            </span>
          </h1>
          <p className="mt-4 text-gray-500 text-base md:text-lg max-w-lg mx-auto">
            Review your selected items, adjust quantities, and proceed to checkout.
          </p>

          {/* Stats */}
          {cart.length > 0 && (
            <div className="mt-8 flex items-center justify-center gap-6 text-sm flex-wrap">
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-rose-100 px-4 py-2 rounded-full">
                <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                <span className="text-gray-600 font-medium">{totalItems} item{totalItems !== 1 && "s"}</span>
              </div>
              {totalSavings > 0 && (
                <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-emerald-100 px-4 py-2 rounded-full">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-emerald-600 font-medium">You save ₹{totalSavings}</span>
                </div>
              )}
              {freeShipping && (
                <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-amber-100 px-4 py-2 rounded-full">
                  <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                  <span className="text-amber-600 font-medium">Free Shipping!</span>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ─── Content ─── */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {cart.length === 0 ? (
              <div className="text-center py-20">
                <span className="text-6xl block mb-4">🛒</span>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h3>
                <p className="text-gray-400 text-sm max-w-sm mx-auto mb-8">
                  Looks like you haven&apos;t added any products yet. Browse our collection and find something you love!
                </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-rose-500 text-white text-sm font-semibold hover:bg-rose-600 shadow-lg shadow-rose-200/50 transition-all duration-300 hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016A3.001 3.001 0 0021 9.349m-18 0V4.125C3 3.504 3.504 3 4.125 3h15.75C20.496 3 21 3.504 21 4.125V9.35" />
              </svg>
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ─── Cart Items (Left) ─── */}
            <div className="lg:col-span-2 space-y-4">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400">
                  <span className="font-semibold text-gray-600">{cart.length}</span> product{cart.length !== 1 && "s"} in your cart
                </p>
                <button
                  onClick={clearCartHandler}
                  className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-rose-500 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Clear Cart
                </button>
              </div>

              {/* Free shipping progress */}
              {!freeShipping && (
                <div className="bg-amber-50/80 border border-amber-200/60 rounded-xl px-4 py-3 mb-2">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-amber-700 font-medium">
                      Add ₹{SHIPPING_THRESHOLD - subtotal} more for free shipping!
                    </span>
                    <span className="text-amber-500 font-semibold">
                      ₹{subtotal} / ₹{SHIPPING_THRESHOLD}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-amber-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (subtotal / SHIPPING_THRESHOLD) * 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Item Cards */}
              {cart.map((item) => (
                <div
                  key={item.id}
                  className={`group bg-white rounded-2xl border border-rose-100/60 shadow-sm overflow-hidden hover:shadow-lg hover:shadow-rose-100/30 transition-all duration-300 ${
                    removingId === item.id ? "opacity-0 scale-95" : "opacity-100 scale-100"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Image */}
                    <div className="relative w-full sm:w-40 h-40 sm:h-auto bg-linear-to-br from-rose-50/80 via-amber-50/50 to-pink-50/80 shrink-0 overflow-hidden">
                      <img
                        src={item.image || "https://via.placeholder.com/300x300?text=Product"}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {item.originalPrice && (
                        <div className="absolute top-2 left-2 bg-rose-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                          {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 p-5 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            {item.category && (
                              <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-rose-400 bg-rose-50 px-2 py-0.5 rounded-full mb-1.5">
                                {item.category}
                              </span>
                            )}
                            <h3 className="text-base font-semibold text-gray-800 leading-snug group-hover:text-rose-600 transition-colors">
                              {item.title}
                            </h3>
                          </div>
                          {/* Remove */}
                          <button
                            onClick={() => removeItemHandler(item.id)}
                            className="shrink-0 w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-300 hover:text-white hover:bg-rose-500 transition-all duration-200"
                            aria-label="Remove item"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mt-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(item.rating ?? 0) ? "text-amber-400" : "text-gray-200"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="text-[10px] text-gray-400 ml-0.5">
                            {(item.rating ?? 0).toFixed(1)}
                          </span>
                        </div>
                      </div>

                      {/* Bottom: Price + Quantity */}
                      <div className="flex items-end justify-between mt-4">
                        {/* Price */}
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-lg font-bold text-rose-600">₹{item.price * item.quantity}</span>
                            {item.quantity > 1 && (
                              <span className="text-xs text-gray-400">
                                (₹{item.price} each)
                              </span>
                            )}
                          </div>
                          {item.originalPrice && (
                            <span className="text-xs text-gray-400 line-through">
                              ₹{item.originalPrice * item.quantity}
                            </span>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-0 border border-rose-200 rounded-full overflow-hidden">
                          <button
                            onClick={() => updateQuantityHandler(item.id, -1)}
                            disabled={item.quantity <= 1}
                            className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-rose-50 hover:text-rose-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" d="M5 12h14" />
                            </svg>
                          </button>
                          <span className="w-10 text-center text-sm font-semibold text-gray-700">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantityHandler(item.id, 1)}
                            disabled={item.quantity >= 10}
                            className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-rose-50 hover:text-rose-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" d="M12 5v14m-7-7h14" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ─── Order Summary (Right Sidebar) ─── */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-2xl border border-rose-100/60 shadow-sm p-6 space-y-5">
                <h3 className="text-lg font-bold text-gray-800">Order Summary</h3>

                {/* Line items */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="font-medium text-gray-700">₹{subtotal}</span>
                  </div>
                  {totalSavings > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount</span>
                      <span className="font-medium">−₹{totalSavings}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-500">
                    <span>Shipping</span>
                    <span className={`font-medium ${freeShipping ? "text-emerald-600" : "text-gray-700"}`}>
                      {freeShipping ? "FREE" : `₹${shipping}`}
                    </span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-rose-500">
                      <span>Promo (BABY10)</span>
                      <span className="font-medium">−₹{promoDiscount}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-rose-100 pt-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-base font-bold text-gray-800">Total</span>
                    <span className="text-2xl font-bold text-rose-600">₹{total}</span>
                  </div>
                  {totalSavings > 0 && (
                    <p className="text-[11px] text-emerald-500 mt-1 text-right">
                      You&apos;re saving ₹{totalSavings + promoDiscount} on this order!
                    </p>
                  )}
                </div>

                {/* Promo Code */}
                {!promoApplied ? (
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1.5 block">Have a promo code?</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="e.g. BABY10"
                        className="flex-1 px-3.5 py-2.5 rounded-xl border border-rose-200 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-shadow"
                      />
                      <button
                        onClick={applyPromo}
                        className="px-4 py-2.5 rounded-xl bg-rose-50 text-rose-600 text-sm font-medium hover:bg-rose-100 transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    <p className="text-[10px] text-gray-300 mt-1">Try &quot;BABY10&quot; for 10% off</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200/60 rounded-xl px-3 py-2.5 text-sm text-emerald-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">BABY10 applied — 10% off!</span>
                    <button
                      onClick={() => { setPromoApplied(false); setPromoCode(""); }}
                      className="ml-auto text-emerald-400 hover:text-emerald-600 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}

                {/* Checkout Button */}
                <button className="w-full py-3.5 rounded-full bg-rose-500 text-white text-sm font-semibold hover:bg-rose-600 shadow-lg shadow-rose-200/50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                    Proceed to Checkout
                  </span>
                </button>

                {/* Trust badges */}
                <div className="flex items-center justify-center gap-4 pt-2">
                  <div className="flex items-center gap-1 text-[10px] text-gray-400">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                    Secure Checkout
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                    </svg>
                    Easy Returns
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                    Fast Delivery
                  </div>
                </div>

                {/* Continue Shopping */}
                <Link
                  href="/products"
                  className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-full bg-rose-50 text-rose-600 text-sm font-medium hover:bg-rose-100 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}