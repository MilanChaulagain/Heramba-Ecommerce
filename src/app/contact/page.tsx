"use client";

import { useState, FormEvent } from "react";

const contactInfo = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: "Email Us",
    value: "support@heramba.np",
    description: "We reply within 24 hours",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    label: "Call Us",
    value: "+977 9800000000",
    description: "Mon–Sat, 10 AM – 5 PM",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    label: "Visit Us",
    value: "Panauti, Nepal",
    description: "By appointment only",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-white via-rose-50/20 to-white">
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute inset-0 bg-linear-to-br from-rose-100 via-amber-50/80 to-pink-100" />
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-rose-300 rounded-full blur-3xl opacity-25 pointer-events-none" />
        <div className="absolute -bottom-24 -right-16 w-96 h-96 bg-amber-200 rounded-full blur-3xl opacity-20 pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block text-sm font-medium tracking-widest uppercase text-rose-400 mb-3">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="bg-linear-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
              Contact Us
            </span>
          </h1>
          <p className="mt-4 text-gray-500 text-base md:text-lg max-w-lg mx-auto">
            Have a question, suggestion or just want to say hello? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* ─── Contact Info Cards ─── */}
      <section className="max-w-7xl mx-auto px-6 -mt-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {contactInfo.map((item) => (
            <div
              key={item.label}
              className="group bg-white/70 backdrop-blur-md rounded-2xl border border-rose-100/60 shadow-sm p-6 text-center hover:shadow-lg hover:shadow-rose-100/40 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-linear-to-br from-rose-50 to-pink-50 text-rose-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-sm font-semibold text-gray-800 group-hover:text-rose-600 transition-colors">
                {item.label}
              </h3>
              <p className="text-base font-bold text-rose-600 mt-1">{item.value}</p>
              <p className="text-xs text-gray-400 mt-1">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Contact Form ─── */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left — Form */}
          <div className="lg:col-span-3">
            <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-rose-100/60 shadow-sm p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Send us a Message</h2>
              <p className="text-sm text-gray-400 mb-8">Fill in the form below and we&apos;ll get back to you as soon as possible.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-rose-50/40 border border-rose-100 text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-rose-50/40 border border-rose-100 text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-shadow"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Subject</label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-rose-50/40 border border-rose-100 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-shadow"
                  >
                    <option value="">Select a topic</option>
                    <option value="order">Order Inquiry</option>
                    <option value="product">Product Question</option>
                    <option value="return">Returns &amp; Refunds</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Write your message here..."
                    className="w-full px-4 py-3 rounded-xl bg-rose-50/40 border border-rose-100 text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-shadow resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-3.5 rounded-full bg-rose-500 text-white font-medium shadow-lg shadow-rose-200/50 hover:bg-rose-600 hover:shadow-xl hover:shadow-rose-300/40 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </span>
                  ) : "Send Message"}
                </button>

                {/* Status Messages */}
                {status === "sent" && (
                  <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-xl px-4 py-3">
                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Message sent successfully! We&apos;ll be in touch soon.
                  </div>
                )}
                {status === "error" && (
                  <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-sm rounded-xl px-4 py-3">
                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Could not send your message. Please try again or email us directly.
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Right — Additional Info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* FAQ Teaser */}
            <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-rose-100/60 shadow-sm p-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Frequently Asked</h3>
              <ul className="space-y-4">
                {[
                  { q: "What is your return policy?", a: "We offer hassle-free returns within 15 days of delivery." },
                  { q: "Do you ship internationally?", a: "Currently we deliver across India. International shipping coming soon!" },
                  { q: "Are your products organic?", a: "Yes — we prioritise certified organic, non-toxic materials." },
                ].map((faq) => (
                  <li key={faq.q} className="border-b border-rose-50 pb-3 last:border-0 last:pb-0">
                    <p className="text-sm font-semibold text-gray-700">{faq.q}</p>
                    <p className="text-xs text-gray-400 mt-1">{faq.a}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social / Follow */}
            <div className="bg-linear-to-br from-rose-50 via-amber-50/60 to-pink-50 rounded-3xl border border-rose-100/60 shadow-sm p-8 text-center">
              <span className="text-4xl block mb-3">💝</span>
              <h3 className="text-lg font-bold text-gray-800 mb-1">Follow Our Journey</h3>
              <p className="text-xs text-gray-400 mb-5">Stay updated with new arrivals, tips &amp; offers.</p>
              <div className="flex justify-center gap-3">
                {["Instagram", "Facebook", "TikTok"].map((social) => (
                  <span
                    key={social}
                    className="px-4 py-2 rounded-full bg-white/80 border border-rose-100 text-xs font-medium text-gray-600 hover:text-rose-600 hover:border-rose-300 transition-colors cursor-pointer"
                  >
                    {social}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}