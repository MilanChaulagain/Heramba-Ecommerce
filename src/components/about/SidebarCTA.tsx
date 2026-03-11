import Link from "next/link";

export default function SidebarCTA() {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-lg h-fit sticky top-6">
      
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-pink-100 to-rose-100"></div>

      {/* Soft Glow Blur */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-pink-300 rounded-full blur-2xl opacity-40"></div>
      <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-rose-300 rounded-full blur-2xl opacity-40"></div>

      {/* Content */}
      <div className="relative text-center p-6 bg-white/40 backdrop-blur-sm">
        
        <h3 className="text-xl font-bold text-rose-600 leading-tight">
          Ready to Explore?
        </h3>

        <p className="mt-3 text-gray-600 text-sm leading-relaxed">
          Discover safe, loving essentials designed to make parenting easier and more joyful.
        </p>

        <Link
          href="/products"
          className="inline-block mt-5 bg-rose-500 hover:bg-rose-600 
          text-white px-6 py-2.5 rounded-full text-sm
          shadow-md hover:shadow-rose-300/50 
          hover:scale-105 active:scale-95
          transition-all duration-300 font-medium"
        >
          Shop with Love
        </Link>

      </div>
    </div>
  );
}
