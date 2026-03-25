import Link from "next/link";

const categories = [
  { label: "All", href: "/blog" },
  { label: "Parenting Tips", href: "/blog/parenting-tips" },
  { label: "Baby Care", href: "/blog/baby-care" },
  { label: "Product Guides", href: "/blog/product-guides" },
  { label: "Milestones", href: "/blog/milestones" },
  { label: "Health & Safety", href: "/blog/health-safety" },
];

const featuredArticle = {
  title: "A Gentle First-Year Parenting Roadmap",
  excerpt:
    "A practical month-by-month guide with realistic routines, milestones, and supportive tips for new parents navigating year one.",
  date: "Feb 20, 2026",
  readTime: "8 min read",
  category: "Parenting Tips",
  image: "📝",
  href: "/blog",
  author: "Heramba Editorial Team",
};

const articles = [
  {
    title: "5 Bedtime Routines That Help Your Baby Sleep Better",
    excerpt:
      "Discover gentle, proven routines that create a calming environment and help your baby drift off peacefully every night.",
    date: "Feb 18, 2026",
    readTime: "5 min read",
    category: "Parenting Tips",
    image: "🌙",
    href: "/blog",
    author: "Dr. Maya Sharma",
  },
  {
    title: "Understanding Baby Skin: A Complete Care Guide",
    excerpt:
      "Your baby's skin is delicate and needs special attention. Learn the best practices for keeping it soft and healthy.",
    date: "Feb 15, 2026",
    readTime: "6 min read",
    category: "Baby Care",
    image: "🧴",
    href: "/blog",
    author: "Anita Kharel",
  },
  {
    title: "Month-by-Month Milestones: What to Expect in Year One",
    excerpt:
      "From first smiles to first steps — a loving guide to every exciting milestone in your baby's first year.",
    date: "Feb 12, 2026",
    readTime: "7 min read",
    category: "Milestones",
    image: "👶",
    href: "/blog",
    author: "Heramba Editorial Team",
  },
  {
    title: "How to Baby-Proof Your Home Room by Room",
    excerpt:
      "A practical, room-by-room checklist for creating a safe space where your little explorer can roam freely.",
    date: "Feb 9, 2026",
    readTime: "6 min read",
    category: "Health & Safety",
    image: "🏠",
    href: "/blog",
    author: "Nina Shrestha",
  },
  {
    title: "Organic vs. Natural: What Do Baby Product Labels Really Mean?",
    excerpt:
      "Decode the labels and certifications so you can make confident, informed choices for your baby.",
    date: "Feb 5, 2026",
    readTime: "4 min read",
    category: "Product Guides",
    image: "🌿",
    href: "/blog",
    author: "Rohan Karki",
    badge: "Popular",
  },
  {
    title: "Bonding Through Play: Best Activities for 0-12 Months",
    excerpt:
      "Simple, joyful play ideas that strengthen your connection and support your baby's development.",
    date: "Feb 1, 2026",
    readTime: "5 min read",
    category: "Parenting Tips",
    image: "🎀",
    href: "/blog",
    author: "Aarati Giri",
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-linear-to-b from-rose-50/60 via-amber-50/40 to-white">

      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden py-16 px-6">
        <div className="absolute -top-16 -left-16 w-72 h-72 bg-rose-200 rounded-full blur-3xl opacity-25 pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-amber-200 rounded-full blur-3xl opacity-25 pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center">
          <span className="inline-block text-sm font-medium tracking-widest uppercase text-rose-400 mb-3">
            Our Journal
          </span>
          <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent leading-tight">
            Articles for Modern Parenting
          </h1>
          <p className="mt-4 text-gray-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Read practical, compassionate, and research-backed stories covering baby care, routines, safety, and early milestones.
          </p>
        </div>
      </section>

      {/* ─── Category Pills ─── */}
      <section className="max-w-6xl mx-auto px-6 -mt-2 mb-10">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat, i) => (
            <Link
              key={cat.label}
              href={cat.href}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                i === 0
                  ? "bg-rose-500 text-white shadow-md shadow-rose-200"
                  : "bg-white text-gray-500 border border-rose-100 hover:border-rose-300 hover:text-rose-500 hover:shadow-sm"
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Featured Post ─── */}
      <section className="max-w-6xl mx-auto px-6 mb-10">
        <div className="relative bg-white/80 backdrop-blur-md rounded-3xl shadow-lg shadow-rose-100/40 overflow-hidden border border-rose-100/60 transition-all duration-500 hover:shadow-xl hover:shadow-rose-200/30 hover:scale-[1.005] group">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5 bg-linear-to-br from-rose-100 via-amber-50 to-pink-100 flex flex-col items-center justify-center p-12 md:p-16">
              <span className="text-8xl md:text-9xl drop-shadow-sm transition-transform duration-500 group-hover:scale-110">
                {featuredArticle.image}
              </span>
            </div>

            <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-rose-100 text-rose-600 text-xs font-semibold px-3 py-1 rounded-full">
                  Featured
                </span>
                <span className="bg-amber-50 text-amber-600 text-xs font-medium px-3 py-1 rounded-full">
                  {featuredArticle.category}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-snug mb-3">
                {featuredArticle.title}
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">{featuredArticle.excerpt}</p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span>{featuredArticle.date}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span>{featuredArticle.readTime}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span>By {featuredArticle.author}</span>
                </div>
                <Link
                  href={featuredArticle.href}
                  className="inline-flex items-center gap-1 text-rose-500 font-medium text-sm hover:text-rose-600 transition-colors"
                >
                  Read Article
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Blog Grid ─── */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Latest Articles</h2>
          <Link href="/blog" className="text-sm text-rose-500 hover:text-rose-600 font-medium">
            View all →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {articles.map((article) => (
            <article
              key={article.title}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-rose-100/60 shadow-sm shadow-rose-50 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-rose-100/50 hover:-translate-y-1 flex flex-col"
            >
              <div className="h-44 bg-linear-to-br from-rose-50 via-amber-50 to-pink-50 flex items-center justify-center relative">
                <span className="text-6xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  {article.image}
                </span>
                {article.badge && (
                  <span className="absolute top-3 right-3 bg-rose-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                    {article.badge}
                  </span>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                <span className="inline-block text-xs font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full mb-3 self-start">
                  {article.category}
                </span>
                <h3 className="text-lg font-semibold text-gray-800 leading-snug mb-2 group-hover:text-rose-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2">
                  {article.excerpt}
                </p>

                <div className="text-xs text-gray-400 mb-4">
                  By {article.author}
                </div>

                <Link
                  href={article.href}
                  className="w-full text-center text-xs font-semibold text-rose-500 bg-rose-50 border border-rose-100 hover:bg-rose-500 hover:text-white hover:border-rose-500 py-2.5 rounded-xl transition-all duration-300 mb-4"
                >
                  Read Article
                </Link>

                <div className="flex items-center justify-between border-t border-rose-50 pt-4 mt-auto">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>{article.date}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span>{article.readTime}</span>
                  </div>
                  <Link
                    href={article.href}
                    className="text-rose-400 hover:text-rose-500 transition-colors"
                    aria-label={`Read ${article.title}`}
                  >
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button className="px-8 py-3 rounded-full border-2 border-rose-200 text-rose-500 font-medium text-sm hover:bg-rose-500 hover:text-white hover:border-rose-500 hover:shadow-lg hover:shadow-rose-200/40 transition-all duration-300">
            Load More Articles
          </button>
        </div>
      </section>
    </div>
  );
}
