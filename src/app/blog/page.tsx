import Link from "next/link";

const categories = [
  { label: "All", href: "/blog" },
  { label: "Parenting Tips", href: "/blog/parenting-tips" },
  { label: "Baby Care", href: "/blog/baby-care" },
  { label: "Product Guides", href: "/blog/product-guides" },
  { label: "Milestones", href: "/blog/milestones" },
  { label: "Health & Safety", href: "/blog/health-safety" },
];

const featuredPost = {
  title: "The Ultimate Guide to Choosing Safe Baby Products",
  excerpt:
    "Everything you need to know about materials, certifications, and what to look for when shopping for your little one's essentials.",
  date: "Feb 20, 2026",
  readTime: "8 min read",
  category: "Product Guides",
  image: "🧸",
  shopLink: "/collections/safe-essentials",
  shopLabel: "Shop Safe Essentials",
  relatedProducts: [
    { name: "Organic Muslin Swaddle", price: "$24.99", badge: "Bestseller" },
    { name: "BPA-Free Feeding Set", price: "$34.99", badge: "Editor's Pick" },
  ],
};

const blogPosts = [
  {
    title: "5 Bedtime Routines That Help Your Baby Sleep Better",
    excerpt:
      "Discover gentle, proven routines that create a calming environment and help your baby drift off peacefully every night.",
    date: "Feb 18, 2026",
    readTime: "5 min read",
    category: "Parenting Tips",
    image: "🌙",
    shopLink: "/collections/sleep",
    shopLabel: "Shop Sleep Collection",
    rating: 4.9,
    reviews: 312,
  },
  {
    title: "Understanding Baby Skin: A Complete Care Guide",
    excerpt:
      "Your baby's skin is delicate and needs special attention. Learn the best practices for keeping it soft and healthy.",
    date: "Feb 15, 2026",
    readTime: "6 min read",
    category: "Baby Care",
    image: "🧴",
    shopLink: "/collections/skincare",
    shopLabel: "Shop Skincare",
    rating: 4.8,
    reviews: 204,
  },
  {
    title: "Month-by-Month Milestones: What to Expect in Year One",
    excerpt:
      "From first smiles to first steps — a loving guide to every exciting milestone in your baby's first year.",
    date: "Feb 12, 2026",
    readTime: "7 min read",
    category: "Milestones",
    image: "👶",
    shopLink: "/collections/milestone",
    shopLabel: "Shop Milestone Gifts",
    rating: 4.7,
    reviews: 189,
  },
  {
    title: "How to Baby-Proof Your Home Room by Room",
    excerpt:
      "A practical, room-by-room checklist for creating a safe space where your little explorer can roam freely.",
    date: "Feb 9, 2026",
    readTime: "6 min read",
    category: "Health & Safety",
    image: "🏠",
    shopLink: "/collections/safety",
    shopLabel: "Shop Safety Gear",
    rating: 4.9,
    reviews: 427,
  },
  {
    title: "Organic vs. Natural: What Do Baby Product Labels Really Mean?",
    excerpt:
      "Decode the labels and certifications so you can make confident, informed choices for your baby.",
    date: "Feb 5, 2026",
    readTime: "4 min read",
    category: "Product Guides",
    image: "🌿",
    shopLink: "/collections/organic",
    shopLabel: "Shop Organic Range",
    rating: 4.8,
    reviews: 156,
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
    shopLink: "/collections/play",
    shopLabel: "Shop Play Essentials",
    rating: 4.6,
    reviews: 98,
  },
];

const trendingProducts = [
  { name: "Cloud Crib Mobile", price: "$49.99", originalPrice: "$64.99", emoji: "☁️", badge: "Sale" },
  { name: "Bamboo Sleepsuit Set", price: "$39.99", emoji: "🐼", badge: "New" },
  { name: "Organic Bath Kit", price: "$29.99", originalPrice: "$38.00", emoji: "🛁", badge: "Sale" },
  { name: "Teether Gift Box", price: "$22.99", emoji: "🎁", badge: "Bestseller" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3 h-3 ${star <= Math.round(rating) ? "text-amber-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Blog() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/60 via-amber-50/40 to-white">

      {/* ─── Promo Bar ─── */}
      <div className="bg-rose-500 text-white text-center text-xs font-medium py-2.5 px-4 tracking-wide">
        🎉 Free shipping on orders over $50 · Use code{" "}
        <span className="font-bold bg-white/20 px-1.5 py-0.5 rounded">BABYLOVE</span>{" "}
        for 15% off your first order
        <Link href="/product" className="ml-3 underline underline-offset-2 hover:no-underline opacity-90">
          Shop Now →
        </Link>
      </div>

      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden py-16 px-6">
        <div className="absolute -top-16 -left-16 w-72 h-72 bg-rose-200 rounded-full blur-3xl opacity-25 pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-amber-200 rounded-full blur-3xl opacity-25 pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center">
          <span className="inline-block text-sm font-medium tracking-widest uppercase text-rose-400 mb-3">
            Our Journal
          </span>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent leading-tight">
            Stories, Tips &amp; Inspiration
          </h1>
          <p className="mt-4 text-gray-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Thoughtful reads for new parents — from expert baby-care advice to heartwarming milestone moments.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Link
              href="/shop"
              className="px-6 py-2.5 rounded-full bg-rose-500 text-white text-sm font-medium shadow-md shadow-rose-200 hover:bg-rose-600 transition-all duration-300"
            >
              Shop All Products
            </Link>
            <Link
              href="/collections/new"
              className="px-6 py-2.5 rounded-full bg-white border border-rose-200 text-rose-500 text-sm font-medium hover:border-rose-400 hover:shadow-sm transition-all duration-300"
            >
              New Arrivals ✨
            </Link>
          </div>
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
            {/* Left – visual area */}
            <div className="md:w-2/5 bg-gradient-to-br from-rose-100 via-amber-50 to-pink-100 flex flex-col items-center justify-center p-12 md:p-16 gap-6">
              <span className="text-8xl md:text-9xl drop-shadow-sm transition-transform duration-500 group-hover:scale-110">
                {featuredPost.image}
              </span>
              {/* Mini product teasers */}
              <div className="w-full space-y-2">
                {featuredPost.relatedProducts.map((p) => (
                  <div
                    key={p.name}
                    className="flex items-center justify-between bg-white/70 backdrop-blur-sm rounded-xl px-3 py-2 text-xs border border-rose-100"
                  >
                    <div>
                      <span className="font-medium text-gray-700">{p.name}</span>
                      <span className="ml-2 text-rose-500 font-semibold">{p.price}</span>
                    </div>
                    <span className="bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full font-medium">
                      {p.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right – content */}
            <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-rose-100 text-rose-600 text-xs font-semibold px-3 py-1 rounded-full">
                  Featured
                </span>
                <span className="bg-amber-50 text-amber-600 text-xs font-medium px-3 py-1 rounded-full">
                  {featuredPost.category}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-snug mb-3">
                {featuredPost.title}
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">{featuredPost.excerpt}</p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span>{featuredPost.date}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span>{featuredPost.readTime}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    href="#"
                    className="inline-flex items-center gap-1 text-rose-500 font-medium text-sm hover:text-rose-600 transition-colors"
                  >
                    Read Article
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <span className="text-gray-200">|</span>
                  <Link
                    href={featuredPost.shopLink}
                    className="inline-flex items-center gap-1.5 bg-rose-500 text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-rose-600 shadow-sm shadow-rose-200 transition-all duration-300"
                  >
                    🛍 {featuredPost.shopLabel}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Trending Products Strip ─── */}
      <section className="max-w-6xl mx-auto px-6 mb-14">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-rose-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="text-lg">🔥</span>
              <h2 className="text-base font-bold text-gray-800">Trending Right Now</h2>
            </div>
            <Link href="/shop" className="text-xs text-rose-500 font-medium hover:text-rose-600 flex items-center gap-1">
              View All
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trendingProducts.map((product) => (
              <Link
                key={product.name}
                href="/shop"
                className="group flex flex-col items-center text-center bg-gradient-to-b from-rose-50/60 to-white rounded-xl p-4 border border-rose-100/60 hover:border-rose-200 hover:shadow-md hover:shadow-rose-100/50 transition-all duration-300"
              >
                <span className="text-4xl mb-3 transition-transform duration-300 group-hover:scale-110 block">
                  {product.emoji}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2
                  bg-amber-100 text-amber-600">
                  {product.badge}
                </span>
                <p className="text-xs font-semibold text-gray-700 leading-snug mb-1">{product.name}</p>
                <div className="flex items-center gap-1.5">
                  <span className="text-rose-500 font-bold text-sm">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-gray-300 text-xs line-through">{product.originalPrice}</span>
                  )}
                </div>
              </Link>
            ))}
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
          {blogPosts.map((post) => (
            <article
              key={post.title}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-rose-100/60 shadow-sm shadow-rose-50 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-rose-100/50 hover:-translate-y-1 flex flex-col"
            >
              {/* Card image area */}
              <div className="h-44 bg-gradient-to-br from-rose-50 via-amber-50 to-pink-50 flex items-center justify-center relative">
                <span className="text-6xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  {post.image}
                </span>
                {post.badge && (
                  <span className="absolute top-3 right-3 bg-rose-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                    {post.badge}
                  </span>
                )}
              </div>

              {/* Card body */}
              <div className="p-6 flex flex-col flex-1">
                <span className="inline-block text-xs font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full mb-3 self-start">
                  {post.category}
                </span>
                <h3 className="text-lg font-semibold text-gray-800 leading-snug mb-2 group-hover:text-rose-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <StarRating rating={post.rating} />
                  <span className="text-xs text-gray-400">
                    {post.rating} ({post.reviews} reviews)
                  </span>
                </div>

                {/* Shop CTA */}
                <Link
                  href={post.shopLink}
                  className="w-full text-center text-xs font-semibold text-rose-500 bg-rose-50 border border-rose-100 hover:bg-rose-500 hover:text-white hover:border-rose-500 py-2.5 rounded-xl transition-all duration-300 mb-4"
                >
                  🛍 {post.shopLabel}
                </Link>

                <div className="flex items-center justify-between border-t border-rose-50 pt-4 mt-auto">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span>{post.readTime}</span>
                  </div>
                  <Link
                    href="#"
                    className="text-rose-400 hover:text-rose-500 transition-colors"
                    aria-label={`Read ${post.title}`}
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

        {/* Load More */}
        <div className="flex justify-center mt-12">
          <button className="px-8 py-3 rounded-full border-2 border-rose-200 text-rose-500 font-medium text-sm hover:bg-rose-500 hover:text-white hover:border-rose-500 hover:shadow-lg hover:shadow-rose-200/40 transition-all duration-300">
            Load More Articles
          </button>
        </div>
      </section>

      {/* ─── Shop Banner ─── */}
      <section className="max-w-6xl mx-auto px-6 mb-14">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-500 to-pink-500 p-8 md:p-12 text-white shadow-xl shadow-rose-200">
          <div className="absolute -top-8 -right-8 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-white/80 text-xs font-semibold tracking-widest uppercase mb-1 block">
                Exclusive Bundle
              </span>
              <h3 className="text-2xl md:text-3xl font-bold leading-snug mb-2">
                New Parent Starter Kit 🍼
              </h3>
              <p className="text-white/80 text-sm max-w-sm">
                Everything you need in the first 3 months — curated by pediatric experts and loved by 10,000+ parents.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 shrink-0">
              <div className="text-center">
                <span className="text-3xl font-extrabold">$89.99</span>
                <span className="text-white/60 text-sm line-through ml-2">$129.99</span>
                <span className="ml-2 bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full">Save 31%</span>
              </div>
              <Link
                href="/products/starter-kit"
                className="px-8 py-3 bg-white text-rose-500 font-bold text-sm rounded-full hover:bg-rose-50 shadow-md transition-all duration-300 whitespace-nowrap"
              >
                Shop the Bundle →
              </Link>
              <p className="text-white/60 text-xs">⭐ 4.9 · 2,300+ happy families</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Newsletter CTA ─── */}
      <section className="relative overflow-hidden py-16 px-6 mb-0">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-amber-50 to-pink-100 opacity-70" />
        <div className="absolute -top-10 -right-10 w-56 h-56 bg-rose-300 rounded-full blur-3xl opacity-20 pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-amber-300 rounded-full blur-3xl opacity-20 pointer-events-none" />

        <div className="relative max-w-2xl mx-auto text-center">
          <span className="text-3xl mb-3 block">💌</span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Join Our Parenting Circle
          </h2>
          <p className="text-gray-500 mb-2 max-w-md mx-auto">
            Get the latest tips, guides, and exclusive offers delivered straight to your inbox — with love.
          </p>
          <p className="text-rose-500 text-sm font-semibold mb-6">
            🎁 Subscribe and get 10% off your first order
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-3 rounded-full border border-rose-200 bg-white/90 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-shadow"
            />
            <button
              type="submit"
              className="px-7 py-3 rounded-full bg-rose-500 text-white font-medium shadow-md shadow-rose-200 hover:bg-rose-600 hover:shadow-lg transition-all duration-300 whitespace-nowrap"
            >
              Subscribe & Save
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-4">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
}
