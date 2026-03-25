"use client";

import { useState, useEffect, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import ProductFilters, { priceRanges } from "@/components/products/ProductFilters";
import { useT } from "@/hooks/useT";
import { productService, type Product } from "@/services/productService";

export default function ProductsPage() {
  const t = useT("productsPage");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ── Filter state ── */
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAgeGroups, setSelectedAgeGroups] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<number[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState("newest");

  /* ── Fetch products from backend ── */
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);
      try {
        const data = await productService.getAllProducts();
        setProducts(data);
      } catch (err) {
        setError("loadError");
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  /* ── Filter & Sort ── */
  const filtered = useMemo(() => {
    return products
      .filter((p) => {
        if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase()))
          return false;
        if (selectedAgeGroups.length > 0 && !selectedAgeGroups.includes(p.ageGroup ?? ""))
          return false;
        if (selectedCategories.length > 0 && !selectedCategories.includes(p.category ?? ""))
          return false;
        if (selectedPriceRanges.length > 0) {
          const inRange = selectedPriceRanges.some((idx) => {
            const r = priceRanges[idx];
            return p.price >= r.min && p.price <= r.max;
          });
          if (!inRange) return false;
        }
        if (minRating > 0 && (p.rating ?? 0) < minRating) return false;
        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-asc": return a.price - b.price;
          case "price-desc": return b.price - a.price;
          case "rating": return (b.rating ?? 0) - (a.rating ?? 0);
          default: return b.id - a.id;
        }
      });
  }, [products, searchQuery, selectedAgeGroups, selectedCategories, selectedPriceRanges, minRating, sortBy]);

  const clearAllFilters = () => {
    setSelectedAgeGroups([]);
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
    setMinRating(0);
    setSearchQuery("");
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
            {t.tagline}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="bg-linear-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
              {t.title}
            </span>
          </h1>
          <p className="mt-4 text-gray-500 text-base md:text-lg max-w-lg mx-auto">
            {t.description}
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
              fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-12 pr-5 py-3.5 rounded-full bg-white/80 backdrop-blur-sm border border-rose-200 text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent shadow-sm transition-shadow"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label={t.clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-rose-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ─── Main Content: Sidebar + Grid ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Backend notice */}
        {error && (
          <div className="mb-6 flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-sm rounded-xl px-4 py-3">
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error === "loadError" ? t.loadError : error}
          </div>
        )}

        <ProductFilters
          filters={{ searchQuery, selectedAgeGroups, selectedCategories, selectedPriceRanges, minRating, sortBy }}
          actions={{ setSearchQuery, setSelectedAgeGroups, setSelectedCategories, setSelectedPriceRanges, setMinRating, setSortBy }}
          resultCount={filtered.length}
        >
          {loading ? (
            /* Skeleton Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-2xl border border-rose-100/60 overflow-hidden">
                  <div className="h-52 bg-rose-50" />
                  <div className="p-4 space-y-3">
                    <div className="h-3 bg-rose-100 rounded-full w-3/4" />
                    <div className="h-3 bg-rose-100 rounded-full w-1/2" />
                    <div className="h-8 bg-rose-50 rounded-full mt-2" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            /* Empty State */
            <div className="text-center py-20">
              <span className="text-6xl block mb-4">🔍</span>
              <h3 className="text-xl font-bold text-gray-700 mb-2">{t.emptyTitle}</h3>
              <p className="text-gray-400 text-sm mb-4">{t.emptyDescription}</p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-2.5 rounded-full bg-rose-500 text-white text-sm font-medium hover:bg-rose-600 transition-colors"
              >
                {t.clearAllFilters}
              </button>
            </div>
          ) : (
            /* Product Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  image={product.image}
                  badge={product.badge}
                  rating={product.rating}
                  category={product.category}
                />
              ))}
            </div>
          )}
        </ProductFilters>
      </section>
    </main>
  );
}