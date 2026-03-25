"use client";

import { useT } from "@/hooks/useT";

export default function TrustStats() {
  const t = useT("aboutPage");

  const stats = [
    { value: "2500+", label: t.statHappyParents },
    { value: "5000+", label: t.statOrdersDelivered },
    { value: "100%", label: t.statSafeProducts },
    { value: "24/7", label: t.statSupport },
  ];

  return (
    <section className="relative bg-gradient-to-b from-white to-rose-50 py-14 px-6 overflow-hidden">
      
      {/* Soft Background Blurs */}
      <div className="absolute -top-10 left-1/3 w-40 h-40 bg-pink-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-rose-200 rounded-full blur-3xl opacity-30"></div>

      <div className="relative max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-md 
              hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-rose-600">
                {stat.value}
              </h3>
              <p className="text-gray-600 mt-2 text-sm md:text-base">
                {stat.label}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}