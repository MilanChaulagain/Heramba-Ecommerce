"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { getCartCount, onCartUpdate } from "@/lib/cartStorage";
import { getWishlistCount, onWishlistUpdate } from "@/lib/wishlistStorage";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const [language, setLanguage] = useState<"en" | "ne">("en");

  /* ── Load cart count on mount and listen for updates ── */
  useEffect(() => {
    setCartCount(getCartCount());
    
    const unsubscribe = onCartUpdate((count) => {
      setCartCount(count);
    });

    return unsubscribe;
  }, []);

  /* ── Load wishlist count on mount and listen for updates ── */
  useEffect(() => {
    setWishlistCount(getWishlistCount());
    
    const unsubscribe = onWishlistUpdate((count) => {
      setWishlistCount(count);
    });

    return unsubscribe;
  }, []);

  function toggleLanguage() {
    setLanguage((prev) => (prev === "en" ? "ne" : "en"));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-rose-100 shadow-sm shadow-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Top Row ─── */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/logo.jpeg"
              alt="Heramba Logo"
              width={38}
              height={38}
              className="rounded-xl shadow-sm ring-1 ring-rose-100 transition-transform duration-300 group-hover:scale-105"
            />
            <span className="text-xl font-bold tracking-tight bg-linear-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
              HERAMBA
            </span>
          </Link>

          {/* Search Bar — hidden on mobile */}
          <form
            onSubmit={onSubmit}
            className="hidden md:flex items-center w-full max-w-sm mx-6 relative"
          >
            {/* search icon */}
            <svg
              className="absolute left-3.5 w-4 h-4 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-rose-50/60 border border-rose-300 text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-shadow"
            />
          </form>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`px-3 py-1.5 rounded-full text-6 font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-rose-100 text-rose-600"
                      : "text-black hover:text-rose-600 hover:bg-rose-50"
                  }`}
                >
                  {label}
                </Link>
              );
            })}

          {/* Wishlist Icon */}
          <Link href="/wishlist" className="relative flex items-center ml-4">
            <svg className="w-6 h-6 text-gray-600 hover:text-rose-500 transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            {wishlistCount > 0 && (
              <span className="absolute -top-4 -right-3 flex items-center justify-center w-5 h-5 rounded-full bg-rose-500 text-white text-xs font-bold">
                {wishlistCount > 99 ? "99+" : wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Icon */}
          <Link href="/cart" className="relative flex items-center ml-4">
            <svg className="w-6 h-6 text-gray-600 hover:text-rose-500 transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-4 -right-3 flex items-center justify-center w-5 h-5 rounded-full bg-rose-500 text-white text-xs font-bold">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

            <Link
              href="/login"
              className="ml-2 px-5 py-2 rounded-full bg-rose-500 text-white text-sm font-medium shadow-md shadow-rose-200/50 hover:bg-rose-600 hover:shadow-lg hover:shadow-rose-200/60 transition-all duration-300"
            >
              Login
            </Link>

            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="ml-2 px-3 py-1 rounded-full bg-rose-50 text-black text-sm font-medium hover:text-rose-600 transition-colors"
              aria-label="Toggle language"
            >
              {language === "en" ? "ने" : "EN"}
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-rose-50 hover:text-rose-500 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ─── Mobile Menu ─── */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-rose-100 bg-white/95 backdrop-blur-md px-4 pb-5 pt-3 space-y-2 animate-fade-in-up">
          {/* Mobile Search */}
          <form onSubmit={onSubmit} className="flex items-center relative mb-3 md:hidden">
            <svg
              className="absolute left-3.5 w-4 h-4 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-rose-50/60 border border-rose-100 text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
            />
          </form>

          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-rose-100 text-rose-600"
                    : "text-gray-600 hover:bg-rose-50 hover:text-rose-600"
                }`}
              >
                {label}
              </Link>
            );
          })}

          {/* Cart Icon */}
          <Link href="/cart" className="flex items-center">
            <svg className="ml-4 w-5 h-5 text-gray-600 hover:text-rose-500 transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </Link>

          <Link
            href="/login"
            onClick={() => setMobileOpen(false)}
            className="block text-center mt-2 px-5 py-2.5 rounded-full bg-rose-500 text-white text-sm font-medium shadow-md shadow-rose-200/50 hover:bg-rose-600 transition-all"
          >
            Login
          </Link>
          
        </div>
      )}
    </nav>
  );
}