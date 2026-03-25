"use client";

import { useT } from "@/hooks/useT";

export default function AboutHero() {
  const t = useT("aboutPage");

  return (
    <section className="relative bg-gradient-to-b from-rose-50 to-white py-14 px-4 text-center overflow-hidden">
      
      {/* Decorative Blur Background */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-rose-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-200 rounded-full blur-3xl opacity-30"></div>

      <div className="relative max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-rose-600 leading-tight">
          {t.heroTitle}
        </h1>

        <p className="mt-5 text-gray-600 text-base md:text-lg leading-relaxed">
          {t.heroDescription}
        </p>
      </div>
    </section>
  );
}