"use client";

import Link from "next/link";
import { useT } from "@/hooks/useT";

const trustBadgeIcons = ["🛡️", "🌿", "🚚", "💝"];

export default function Banner() {
  const t = useT("banner");

  const trustBadges = [
    { icon: trustBadgeIcons[0], label: t.trustBadge1 },
    { icon: trustBadgeIcons[1], label: t.trustBadge2 },
    { icon: trustBadgeIcons[2], label: t.trustBadge3 },
    { icon: trustBadgeIcons[3], label: t.trustBadge4 },
  ];

  return (
    <section className="relative overflow-hidden min-h-130 md:min-h-140 flex items-center">
      {/* ─── Layered Background ─── */}
      <div className="absolute inset-0 bg-linear-to-br from-rose-100 via-amber-50/80 to-pink-100" />

      {/* Floating blurs */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-rose-300 rounded-full blur-3xl opacity-25 pointer-events-none" />
      <div className="absolute -bottom-24 -right-16 w-96 h-96 bg-amber-200 rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-pink-200 rounded-full blur-3xl opacity-15 pointer-events-none" />

      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ─── Content ─── */}
      <div className="relative w-full max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left – Text */}
          <div className="flex-1 text-center lg:text-left max-w-xl">
            <span className="inline-block text-sm font-medium tracking-widest uppercase text-rose-400 mb-4">
              {t.tagline}
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="bg-linear-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
                {t.titleLine1}
              </span>
              <br />
              <span className="text-gray-800">{t.titleLine2}</span>
            </h1>

            <p className="mt-5 text-gray-500 text-base md:text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
              {t.description}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
              <Link
                href="/products"
                className="px-8 py-3.5 rounded-full bg-rose-500 text-white font-medium shadow-lg shadow-rose-200/50 hover:bg-rose-600 hover:shadow-xl hover:shadow-rose-300/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                {t.shopCollection}
              </Link>
              <Link
                href="/about"
                className="px-8 py-3.5 rounded-full border-2 border-rose-200 text-rose-600 font-medium hover:bg-rose-50 hover:border-rose-300 transition-all duration-300"
              >
                {t.learnMore}
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap items-center gap-5 justify-center lg:justify-start">
              {trustBadges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-1.5">
                  <span className="text-lg">{badge.icon}</span>
                  <span className="text-xs font-medium text-gray-500">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right – Visual Card */}
          <div className="flex-1 flex justify-center lg:justify-end w-full max-w-md">
            <div className="relative w-full">
              {/* Main hero card */}
              <div className="relative bg-white/70 backdrop-blur-md rounded-3xl shadow-xl shadow-rose-100/40 p-8 md:p-10 border border-white/60 overflow-hidden">
                {/* Shimmer sweep */}
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_4s_ease-in-out_infinite] bg-linear-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

                <div className="relative flex flex-col items-center text-center gap-4">
                  <span className="text-7xl md:text-8xl drop-shadow-sm">
                    🧸
                  </span>
                  <div>
                    <p className="text-sm font-medium text-rose-400 uppercase tracking-wider">
                      {t.bestSeller}
                    </p>
                    <h3 className="text-xl font-bold text-gray-800 mt-1">
                      {t.bundleTitle}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      {t.bundleDescription}
                    </p>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-rose-600">
                      $155
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      $250
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating accent cards */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg shadow-rose-100/30 px-4 py-3 border border-rose-50">
                <div className="flex items-center gap-2">
                  <span className="text-xl">⭐</span>
                  <div>
                    <p className="text-xs font-bold text-gray-800">{t.rating}</p>
                    <p className="text-[10px] text-gray-400">{t.reviews}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}