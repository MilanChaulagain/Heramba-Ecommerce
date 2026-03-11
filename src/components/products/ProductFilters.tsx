"use client";

import { useState, useCallback } from "react";

/* ── Types ── */
export type FilterState = {
  searchQuery: string;
  selectedAgeGroups: string[];
  selectedCategories: string[];
  selectedPriceRanges: number[];
  minRating: number;
  sortBy: string;
};

export type FilterActions = {
  setSearchQuery: (q: string) => void;
  setSelectedAgeGroups: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedPriceRanges: React.Dispatch<React.SetStateAction<number[]>>;
  setMinRating: (r: number) => void;
  setSortBy: (s: string) => void;
};

/* ── Constants ── */
export const ageGroups = [
  { label: "Newborn (0–3 months)", value: "0-3m" },
  { label: "Infant (3–12 months)", value: "3-12m" },
  { label: "Toddler (1–3 years)", value: "1-3y" },
  { label: "Pre-school (3–5 years)", value: "3-5y" },
  { label: "Kids (5–10 years)", value: "5-10y" },
];

export const categories = [
  "Clothing",
  "Bedding",
  "Toys",
  "Skincare",
  "Accessories",
];

export const priceRanges = [
  { label: "Under $300", min: 0, max: 299 },
  { label: "$300 – $500", min: 300, max: 500 },
  { label: "$500 – $800", min: 500, max: 800 },
  { label: "$800 – $1200", min: 800, max: 1200 },
  { label: "Above $1200", min: 1200, max: Infinity },
];

export const ratingOptions = [4, 3, 2, 1];

export const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low → High", value: "price-asc" },
  { label: "Price: High → Low", value: "price-desc" },
  { label: "Top Rated", value: "rating" },
];

/* ── Chevron Icon ── */
function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

/* ── Star Icon ── */
function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className={`w-4 h-4 ${filled ? "text-amber-400" : "text-gray-200"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

/* ── Props ── */
type ProductFiltersProps = {
  filters: FilterState;
  actions: FilterActions;
  resultCount: number;
  children: React.ReactNode;
};

export default function ProductFilters({
  filters,
  actions,
  resultCount,
  children,
}: ProductFiltersProps) {
  const {
    searchQuery,
    selectedAgeGroups,
    selectedCategories,
    selectedPriceRanges,
    minRating,
    sortBy,
  } = filters;

  const {
    setSearchQuery,
    setSelectedAgeGroups,
    setSelectedCategories,
    setSelectedPriceRanges,
    setMinRating,
    setSortBy,
  } = actions;

  /* ── Local UI state ── */
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openSections, setOpenSections] = useState({
    age: true,
    type: true,
    price: true,
    rating: true,
  });

  /* ── Toggle helpers ── */
  const toggleSection = (key: keyof typeof openSections) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const toggleArrayFilter = useCallback(
    (value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
      setter((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
    },
    []
  );

  const togglePriceRange = useCallback((index: number) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  }, [setSelectedPriceRanges]);

  /* ── Active filter count ── */
  const activeFilterCount =
    selectedAgeGroups.length +
    selectedCategories.length +
    selectedPriceRanges.length +
    (minRating > 0 ? 1 : 0);

  const clearAllFilters = useCallback(() => {
    setSelectedAgeGroups([]);
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
    setMinRating(0);
    setSearchQuery("");
  }, [setSelectedAgeGroups, setSelectedCategories, setSelectedPriceRanges, setMinRating, setSearchQuery]);

  /* ── Shared filter sidebar content ── */
  const filterContent = (
    <div className="space-y-1">
      {/* ── Age Group ── */}
      <div className="border-b border-rose-100/60 pb-4">
        <button
          onClick={() => toggleSection("age")}
          className="flex items-center justify-between w-full py-2 text-sm font-semibold text-gray-700"
        >
          <span className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-rose-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197"
              />
            </svg>
            Age Group
          </span>
          <ChevronIcon open={openSections.age} />
        </button>
        {openSections.age && (
          <div className="mt-2 space-y-2">
            {ageGroups.map((ag) => (
              <label
                key={ag.value}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedAgeGroups.includes(ag.value)}
                  onChange={() =>
                    toggleArrayFilter(ag.value, setSelectedAgeGroups)
                  }
                  className="w-4 h-4 rounded border-rose-300 text-rose-500 focus:ring-rose-300 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-sm text-gray-600 group-hover:text-rose-600 transition-colors">
                  {ag.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* ── Product Type ── */}
      <div className="border-b border-rose-100/60 pb-4 pt-3">
        <button
          onClick={() => toggleSection("type")}
          className="flex items-center justify-between w-full py-2 text-sm font-semibold text-gray-700"
        >
          <span className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-rose-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
            Product Type
          </span>
          <ChevronIcon open={openSections.type} />
        </button>
        {openSections.type && (
          <div className="mt-2 space-y-2">
            {categories.map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() =>
                    toggleArrayFilter(cat, setSelectedCategories)
                  }
                  className="w-4 h-4 rounded border-rose-300 text-rose-500 focus:ring-rose-300 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-sm text-gray-600 group-hover:text-rose-600 transition-colors">
                  {cat}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* ── Price Range ── */}
      <div className="border-b border-rose-100/60 pb-4 pt-3">
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full py-2 text-sm font-semibold text-gray-700"
        >
          <span className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-rose-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
            Price
          </span>
          <ChevronIcon open={openSections.price} />
        </button>
        {openSections.price && (
          <div className="mt-2 space-y-2">
            {priceRanges.map((range, idx) => (
              <label
                key={idx}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedPriceRanges.includes(idx)}
                  onChange={() => togglePriceRange(idx)}
                  className="w-4 h-4 rounded border-rose-300 text-rose-500 focus:ring-rose-300 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-sm text-gray-600 group-hover:text-rose-600 transition-colors">
                  {range.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* ── Rating ── */}
      <div className="pt-3">
        <button
          onClick={() => toggleSection("rating")}
          className="flex items-center justify-between w-full py-2 text-sm font-semibold text-gray-700"
        >
          <span className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-rose-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Rating
          </span>
          <ChevronIcon open={openSections.rating} />
        </button>
        {openSections.rating && (
          <div className="mt-2 space-y-2">
            {ratingOptions.map((r) => (
              <button
                key={r}
                onClick={() => setMinRating(minRating === r ? 0 : r)}
                className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition-all ${
                  minRating === r
                    ? "bg-rose-50 ring-1 ring-rose-300 text-rose-700"
                    : "hover:bg-rose-50/50 text-gray-600"
                }`}
              >
                <span className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} filled={i < r} />
                  ))}
                </span>
                <span className="text-xs">&amp; up</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* ── Sort Bar + Mobile Filter Toggle ── */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-rose-200 text-sm font-medium text-gray-700 shadow-sm hover:shadow-md hover:border-rose-300 transition-all"
        >
          <svg
            className="w-4 h-4 text-rose-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Filters
          {activeFilterCount > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>

        <div className="flex items-center gap-3 ml-auto">
          <p className="text-sm text-gray-400 hidden sm:block">
            <span className="font-semibold text-gray-600">{resultCount}</span>{" "}
            product{resultCount !== 1 && "s"}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-medium hidden sm:inline">
              Sort by
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-rose-200 rounded-full px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-300"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ── Active Filter Chips ── */}
      {activeFilterCount > 0 && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-gray-400">
            Active filters:
          </span>
          {selectedAgeGroups.map((ag) => (
            <button
              key={ag}
              onClick={() => toggleArrayFilter(ag, setSelectedAgeGroups)}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-medium border border-rose-200 hover:bg-rose-100 transition-colors"
            >
              {ageGroups.find((a) => a.value === ag)?.label}
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ))}
          {selectedCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleArrayFilter(cat, setSelectedCategories)}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-medium border border-rose-200 hover:bg-rose-100 transition-colors"
            >
              {cat}
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ))}
          {selectedPriceRanges.map((idx) => (
            <button
              key={idx}
              onClick={() => togglePriceRange(idx)}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-medium border border-rose-200 hover:bg-rose-100 transition-colors"
            >
              {priceRanges[idx].label}
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ))}
          {minRating > 0 && (
            <button
              onClick={() => setMinRating(0)}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-medium border border-rose-200 hover:bg-rose-100 transition-colors"
            >
              {minRating}+ Stars
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <button
            onClick={clearAllFilters}
            className="text-xs text-rose-500 font-semibold hover:text-rose-700 underline underline-offset-2 transition-colors ml-1"
          >
            Clear all
          </button>
        </div>
      )}

      {/* ─── Desktop Sidebar ─── */}
      <div className="flex items-start gap-8">
        <aside className="hidden lg:block w-64 shrink-0 h-screen sticky top-0">
          <div className="sticky top-22 max-h-[calc(100vh-6rem)] overflow-y-auto bg-white/70 backdrop-blur-md rounded-2xl border border-rose-100/60 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-gray-800">Filters</h2>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-rose-500 font-medium hover:text-rose-700 transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>
            {filterContent}
          </div>
        </aside>

        {/* ─── Content slot (product grid) ─── */}
        <div className="flex-1 min-w-0">{children}</div>
      </div>

      {/* ─── Mobile Sidebar Overlay ─── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Panel */}
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl overflow-y-auto">
            <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-5 py-4 border-b border-rose-100">
              <h2 className="text-base font-bold text-gray-800">Filters</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-gray-500 hover:text-rose-600 hover:bg-rose-100 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-5">{filterContent}</div>
            <div className="sticky bottom-0 bg-white border-t border-rose-100 p-4 flex gap-3">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-2.5 rounded-full border border-rose-200 text-rose-600 text-sm font-medium hover:bg-rose-50 transition-colors"
              >
                Clear all
              </button>
              <button
                onClick={() => setSidebarOpen(false)}
                className="flex-1 py-2.5 rounded-full bg-rose-500 text-white text-sm font-medium hover:bg-rose-600 transition-colors"
              >
                Show {resultCount} results
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
