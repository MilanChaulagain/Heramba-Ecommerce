"use client";

import Image from "next/image";
import { useT } from "@/hooks/useT";

export default function OurStory() {
  const t = useT("aboutPage");

  return (
    <section className="relative bg-linear-to-b from-white to-rose-50 py-14 px-4 overflow-hidden">

      {/* Decorative Blur Background */}
      <div className="absolute -top-10 right-0 w-40 h-40 bg-pink-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-rose-200 rounded-full blur-3xl opacity-30"></div>

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        <div className="relative w-full h-80 group">
          <Image
            src="/mom-baby.jpg"
            alt="Baby Picture"
            fill
            className="object-cover rounded-3xl shadow-lg group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div>
          <h2 className="text-2xl md:text-4xl font-bold text-rose-600 leading-tight">
            {t.storyTitle}
          </h2>

          <p className="mt-5 text-gray-600 leading-relaxed text-base md:text-lg">
            {t.storyDescription}
          </p>
        </div>
      </div>
    </section>
  );
}