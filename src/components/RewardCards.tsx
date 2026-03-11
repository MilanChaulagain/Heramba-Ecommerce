import Link from "next/link";

const rewards = [
  {
    icon: "🎁",
    title: "Welcome Gift",
    description: "Get $200 off on your very first order when you sign up today.",
    cta: "Claim Now",
    href: "/login",
    accent: "from-rose-100 to-pink-100",
    iconBg: "bg-rose-50",
  },
  {
    icon: "⭐",
    title: "Loyalty Points",
    description: "Earn 1 point per $10 spent. Redeem for discounts on future orders.",
    cta: "Learn More",
    href: "/about",
    accent: "from-amber-100 to-orange-100",
    iconBg: "bg-amber-50",
  },
  {
    icon: "💝",
    title: "Refer & Earn",
    description: "Share your code with friends. You both get $150 off your next purchase.",
    cta: "Start Sharing",
    href: "/login",
    accent: "from-pink-100 to-rose-100",
    iconBg: "bg-pink-50",
  },
];

export default function RewardCards() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-medium tracking-widest uppercase text-rose-400 mb-2">
            Rewards & Perks
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            More Reasons to Love Heramba
          </h2>
          <p className="mt-3 text-gray-500 max-w-md mx-auto">
            Enjoy exclusive perks designed to make every purchase sweeter.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {rewards.map((reward) => (
            <div
              key={reward.title}
              className="group relative bg-white rounded-2xl border border-rose-100/60 shadow-sm overflow-hidden hover:shadow-lg hover:shadow-rose-100/40 hover:-translate-y-1 transition-all duration-400"
            >
              {/* Top gradient band */}
              <div
                className={`h-2 bg-linear-to-r ${reward.accent}`}
              />

              <div className="p-7">
                {/* Icon */}
                <div
                  className={`w-14 h-14 ${reward.iconBg} rounded-2xl flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  {reward.icon}
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {reward.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">
                  {reward.description}
                </p>

                <Link
                  href={reward.href}
                  className="inline-flex items-center gap-1 text-rose-500 text-sm font-medium hover:text-rose-600 transition-colors group/link"
                >
                  {reward.cta}
                  <svg
                    className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
