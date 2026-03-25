"use client";

import { useT } from "@/hooks/useT";

type PromiseItem = {
  title: string;
  description: string;
};

export default function OurPromise() {
  const t = useT("aboutPage");

  const promises: PromiseItem[] = [
    {
      title: t.promiseSafeTitle,
      description: t.promiseSafeDescription,
    },
    {
      title: t.promiseSkinTitle,
      description: t.promiseSkinDescription,
    },
    {
      title: t.promiseTrustedTitle,
      description: t.promiseTrustedDescription,
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-rose-50 to-white py-14 px-6 overflow-hidden">
      
      {/* Soft Blur Background Effects */}
      <div className="absolute -top-10 left-10 w-40 h-40 bg-pink-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-10 w-40 h-40 bg-rose-200 rounded-full blur-3xl opacity-30"></div>

      <div className="relative max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-rose-600 mb-12">
          {t.promiseTitle}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {promises.map((item, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-md p-8 text-center 
              hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <h3 className="text-lg md:text-xl font-semibold text-rose-600">
                {item.title}
              </h3>

              <p className="mt-4 text-gray-600 leading-relaxed text-sm md:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}