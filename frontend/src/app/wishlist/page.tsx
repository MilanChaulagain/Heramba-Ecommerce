"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  getWishlist,
  removeFromWishlist,
  clearWishlist as clearWishlistStorage,
  onWishlistUpdate,
  type WishlistItem,
} from "@/lib/wishlistStorage";
import { addToCart } from "@/lib/cartStorage";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [removingId, setRemovingId] = useState<number | null>(null);
  const [movedToCart, setMovedToCart] = useState<number[]>([]);

  useEffect(() => {
    setWishlist(getWishlist());
    return onWishlistUpdate(() => setWishlist(getWishlist()));
  }, []);

  /* ── Handlers ── */
  const removeItem = (id: number) => {
    setRemovingId(id);
    setTimeout(() => {
      removeFromWishlist(id);
      setRemovingId(null);
    }, 300);
  };

  const moveToCart = (id: number) => {
    const item = wishlist.find((i) => i.id === id);
    if (item) {
      addToCart({
        id: item.id,
        title: item.title,
        price: item.price,
        originalPrice: item.originalPrice,
        image: item.image,
        rating: item.rating,
        category: item.category,
      });
    }
    setMovedToCart((prev) => [...prev, id]);
    setTimeout(() => {
      removeItem(id);
      setMovedToCart((prev) => prev.filter((i) => i !== id));
    }, 1200);
  };

  const clearAll = () => {
    clearWishlistStorage();
  };

  const totalSavings = wishlist.reduce(
    (sum, item) => sum + ((item.originalPrice ?? item.price) - item.price),
    0
  );

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
            Your Favourites
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="bg-linear-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
              My Wishlist
            </span>
          </h1>
          <p className="mt-4 text-gray-500 text-base md:text-lg max-w-lg mx-auto">
            All the items you love, saved in one place. Add them to your cart whenever you&apos;re ready!
          </p>

          {/* Stats */}
          {wishlist.length > 0 && (
            <div className="mt-8 flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-rose-100 px-4 py-2 rounded-full">
                <svg className="w-4 h-4 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                </svg>
                <span className="text-gray-600 font-medium">{wishlist.length} item{wishlist.length !== 1 && "s"}</span>
              </div>
              {totalSavings > 0 && (
                <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-emerald-100 px-4 py-2 rounded-full">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-emerald-600 font-medium">You save ₹{totalSavings}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ─── Content ─── */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {wishlist.length === 0 ? (
          /* ─── Empty State ─── */
          <div className="text-center py-20">
            <div className="w-28 h-28 mx-auto mb-6 rounded-full bg-rose-50 flex items-center justify-center">
              <svg className="w-14 h-14 text-rose-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-400 text-sm max-w-sm mx-auto mb-8">
              Start adding items you love by tapping the heart icon on any product. They&apos;ll all show up here!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-rose-500 text-white text-sm font-semibold hover:bg-rose-600 shadow-lg shadow-rose-200/50 transition-all duration-300 hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
              </svg>
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            {/* ─── Toolbar ─── */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm text-gray-400">
                Showing <span className="font-semibold text-gray-600">{wishlist.length}</span> saved item{wishlist.length !== 1 && "s"}
              </p>
              <button
                onClick={clearAll}
                className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-rose-500 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear All
              </button>
            </div>

            {/* ─── Wishlist Grid ─── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className={`group relative bg-white rounded-2xl border border-rose-100/60 shadow-sm overflow-hidden hover:shadow-xl hover:shadow-rose-100/40 transition-all duration-400 ${
                    removingId === item.id ? "opacity-0 scale-95" : "opacity-100 scale-100"
                  }`}
                >
                  {/* Remove button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-rose-100 flex items-center justify-center text-rose-400 hover:text-white hover:bg-rose-500 hover:border-rose-500 hover:shadow-md transition-all duration-200"
                    aria-label="Remove from wishlist"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* Filled heart indicator */}
                  <div className="absolute top-3 left-3 z-10 w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                    </svg>
                  </div>

                  {/* Image */}
                  <div className="relative h-52 bg-linear-to-br from-rose-50/80 via-amber-50/50 to-pink-50/80 overflow-hidden">
                    <img
                      src={item.image || "https://via.placeholder.com/300x300?text=Product"}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Category tag */}
                    {item.category && (
                      <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-rose-400 bg-rose-50 px-2 py-0.5 rounded-full mb-2">
                        {item.category}
                      </span>
                    )}

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-3.5 h-3.5 ${
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

                    {/* Title */}
                    <h3 className="text-sm font-semibold text-gray-800 leading-snug group-hover:text-rose-600 transition-colors line-clamp-1">
                      {item.title}
                    </h3>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mt-1.5">
                      <span className="text-lg font-bold text-rose-600">₹{item.price}</span>
                      {item.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">₹{item.originalPrice}</span>
                      )}
                      {item.originalPrice && (
                        <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                          {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                        </span>
                      )}
                    </div>

                    {/* Added date */}
                    <p className="text-[10px] text-gray-300 mt-2">
                      Added on {new Date(item.addedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => moveToCart(item.id)}
                        disabled={movedToCart.includes(item.id)}
                        className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                          movedToCart.includes(item.id)
                            ? "bg-emerald-500 text-white"
                            : "bg-rose-500 text-white hover:bg-rose-600 shadow-md shadow-rose-200/40 hover:shadow-lg"
                        }`}
                      >
                        {movedToCart.includes(item.id) ? (
                          <span className="flex items-center justify-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            Added!
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                            </svg>
                            Move to Cart
                          </span>
                        )}
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="px-4 py-2.5 rounded-full bg-rose-50 text-rose-400 text-sm font-medium hover:bg-rose-100 hover:text-rose-600 transition-all duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ─── Bottom CTA ─── */}
            <div className="mt-12 bg-white/70 backdrop-blur-md rounded-2xl border border-rose-100/60 shadow-sm p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-lg font-bold text-gray-800">Ready to checkout?</h4>
                <p className="text-sm text-gray-400 mt-0.5">
                  Move all your wishlist items to the cart and complete your purchase.
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/products"
                  className="px-6 py-3 rounded-full bg-rose-50 text-rose-600 text-sm font-medium hover:bg-rose-100 transition-colors"
                >
                  Continue Shopping
                </Link>
                <button
                  onClick={() => wishlist.forEach((item) => moveToCart(item.id))}
                  className="px-6 py-3 rounded-full bg-rose-500 text-white text-sm font-semibold hover:bg-rose-600 shadow-lg shadow-rose-200/50 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Move All to Cart
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}