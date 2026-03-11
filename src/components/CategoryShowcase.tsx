import Link from "next/link";

const categories = [
  { name: "Clothing", icon: "👗", count: 48, color: "from-rose-50 to-pink-50" },
  { name: "Feeding", icon: "🍼", count: 32, color: "from-amber-50 to-orange-50" },
  { name: "Toys", icon: "🧸", count: 56, color: "from-pink-50 to-rose-50" },
  { name: "Skincare", icon: "🧴", count: 24, color: "from-rose-50 to-amber-50" },
  { name: "Bedding", icon: "🛏️", count: 18, color: "from-amber-50 to-pink-50" },
  { name: "Accessories", icon: "🎀", count: 36, color: "from-pink-50 to-amber-50" },
];

export default function CategoryShowcase() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="inline-block text-sm font-medium tracking-widest uppercase text-rose-400 mb-2">
              Browse
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Shop by Category
            </h2>
          </div>
          <Link
            href="/categories"
            className="hidden sm:inline-flex items-center gap-1 text-rose-500 text-sm font-medium hover:text-rose-600 transition-colors"
          >
            View All
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href="/categories"
              className="group flex flex-col items-center text-center p-6 rounded-2xl border border-rose-100/60 bg-white hover:shadow-lg hover:shadow-rose-100/40 hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-linear-to-br ${cat.color} flex items-center justify-center text-3xl mb-3 group-hover:scale-110 transition-transform duration-300`}
              >
                {cat.icon}
              </div>
              <h3 className="text-sm font-semibold text-gray-800 group-hover:text-rose-600 transition-colors">
                {cat.name}
              </h3>
              <span className="text-xs text-gray-400 mt-1">
                {cat.count} items
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
