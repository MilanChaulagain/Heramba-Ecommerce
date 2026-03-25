"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { productService, type Product } from "@/services/productService";
import { useT } from "@/hooks/useT";

export default function FlashDeals() {
  const [deals, setDeals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useT("flashDeals");

  useEffect(() => {
    async function loadDeals() {
      try {
        setLoading(true);
        const data = await productService.getFlashDeals(4);
        setDeals(data);
      } catch (error) {
        console.error("Failed to load flash deals:", error);
      } finally {
        setLoading(false);
      }
    }
    loadDeals();
  }, []);
  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">⚡</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                {t.title}
              </h2>
            </div>
            <p className="text-gray-500 text-sm">
              {t.subtitle}
            </p>
          </div>

          {/* Dummy Countdown Timer */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 font-medium">{t.endsIn}</span>

            {[
              { label: t.hrs, value: "00" },
              { label: t.min, value: "00" },
              { label: t.sec, value: "00" },
            ].map((unit, i) => (
              <div key={unit.label} className="flex items-center gap-2">
                <div className="bg-rose-500 text-white w-12 h-12 rounded-xl flex flex-col items-center justify-center shadow-md shadow-rose-200/50">
                  <span className="text-lg font-bold leading-none">
                    {unit.value}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider opacity-80">
                    {unit.label}
                  </span>
                </div>
                {i < 2 && (
                  <span className="text-rose-400 font-bold text-lg">:</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Deals Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl border border-rose-100/60 shadow-sm overflow-hidden animate-pulse">
                <div className="h-40 bg-gray-200"></div>
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deals.map((deal) => {
              const discount = deal.originalPrice 
                ? Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100)
                : 0;
              
              return (
                <div
                  key={deal.id}
                  className="group relative bg-white rounded-2xl border border-rose-100/60 shadow-sm overflow-hidden hover:shadow-lg hover:shadow-rose-100/50 hover:-translate-y-1 transition-all duration-400"
                >
                  {/* Badge */}
                  <div className="absolute top-3 left-3 z-10 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {deal.badge || `${discount}% OFF`}
                  </div>

                  {/* Image area */}
                  <div className="h-40 bg-linear-to-br from-rose-50 via-amber-50 to-pink-50 flex items-center justify-center">
                    {deal.image ? (
                      <img 
                        src={deal.image} 
                        alt={deal.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-6xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                        ⚡
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-sm font-semibold text-gray-800 mb-2 group-hover:text-rose-600 transition-colors">
                      {deal.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-lg font-bold text-rose-600">
                        ${deal.price}
                      </span>
                      {deal.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ${deal.originalPrice}
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/products/${deal.id}`}
                      className="block text-center w-full py-2 rounded-full bg-rose-50 text-rose-600 text-sm font-medium hover:bg-rose-500 hover:text-white transition-all duration-300"
                    >
                      {t.grabDeal}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}