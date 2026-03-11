"use client";

import Link from "next/link";

export default function Footer() {
  const quickLinks = [
    { href: "/" as const, label: "Home" },
    { href: "/products" as const, label: "Shop" },
    { href: "/products" as const, label: "Categories" },
    { href: "/blog" as const, label: "Blog" },
  ];

  const companyLinks = [
    { href: "/about" as const, label: "About Us" },
    { href: "/contact" as const, label: "Contact" },
    { href: "/" as const, label: "Privacy Policy" },
    { href: "/" as const, label: "Terms of Service" },
  ];

  return (
    <footer className="relative overflow-hidden bg-linear-to-b from-rose-50/80 via-amber-50/40 to-white border-t border-rose-100">
      {/* Soft decorative blurs */}
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-rose-200 rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-200 rounded-full blur-3xl opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        {/* ─── Top Grid ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 group mb-4">
              <span className="text-xl font-bold tracking-tight bg-linear-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
                HERAMBA
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Timeless jewelry, crafted with care and elegance.<br/>
              Panauti-4 Kushadevi Road, Nepal
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-5">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/heramba_heramba" target="_blank"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white border border-rose-100 flex items-center justify-center text-gray-400 hover:text-rose-500 hover:border-rose-300 hover:shadow-sm transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="https://www.facebook.com/heramba_heramba" target="_blank"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white border border-rose-100 flex items-center justify-center text-gray-400 hover:text-rose-500 hover:border-rose-300 hover:shadow-sm transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@heramba_heramba" target="_blank"
                aria-label="TikTok"
                className="w-9 h-9 rounded-full bg-white border border-rose-100 flex items-center justify-center text-gray-400 hover:text-rose-500 hover:border-rose-300 hover:shadow-sm transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.5 3c.4 2.1 1.9 3.8 3.9 4.3v3.1c-1.5 0-3-.5-4.2-1.4v6.6c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6c.5 0 1 .1 1.5.2v3.2c-.4-.2-.9-.3-1.5-.3-1.6 0-2.8 1.3-2.8 2.9s1.2 2.9 2.8 2.9 2.8-1.3 2.8-2.9V3h3.5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-gray-500 hover:text-rose-500 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-gray-500 hover:text-rose-500 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">
              Stay Updated
            </h3>
            <p className="text-sm text-gray-500 mb-4 leading-relaxed">
              Get updates on new arrivals, exclusive offers, and seasonal collections.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 min-w-0 px-4 py-2.5 rounded-l-full bg-white border border-rose-100 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-shadow"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-r-full bg-rose-500 text-white text-sm font-medium hover:bg-rose-600 shadow-sm shadow-rose-200/50 transition-all duration-300"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* ─── Divider ─── */}
        <div className="border-t border-rose-100" />

        {/* ─── Bottom Bar ─── */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 gap-3">
          <p className="text-xs text-gray-400">
            2026 Heramba. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs text-gray-400 hover:text-rose-500 transition-colors">
              Privacy
            </Link>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <Link href="/" className="text-xs text-gray-400 hover:text-rose-500 transition-colors">
              Terms
            </Link>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <Link href="/" className="text-xs text-gray-400 hover:text-rose-500 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}