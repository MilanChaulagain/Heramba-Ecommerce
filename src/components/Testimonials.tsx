"use client";

import { useT } from "@/hooks/useT";

export default function Testimonials() {
  const t = useT("testimonials");

  const testimonials = [
    {
      name: t.testimonial1Name,
      avatar: "👩",
      rating: 5,
      text: t.testimonial1Text,
    },
    {
      name: t.testimonial2Name,
      avatar: "👩‍🦱",
      rating: 5,
      text: t.testimonial2Text,
    },
    {
      name: t.testimonial3Name,
      avatar: "👩‍🦰",
      rating: 5,
      text: t.testimonial3Text,
    },
  ];

  return (
    <section className="py-16 px-6 bg-linear-to-b from-rose-50/40 via-white to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-medium tracking-widest uppercase text-rose-400 mb-2">
            {t.tagline}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            {t.title}
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="relative bg-white rounded-2xl border border-rose-100/60 shadow-sm p-7 hover:shadow-lg hover:shadow-rose-100/30 transition-all duration-300"
            >
              {/* Quote mark */}
              <span className="absolute top-5 right-6 text-5xl text-rose-100 font-serif leading-none select-none">
                &ldquo;
              </span>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-amber-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {item.text}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-rose-50 pt-4">
                <span className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-xl">
                  {item.avatar}
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-400">{t.verifiedBuyer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
