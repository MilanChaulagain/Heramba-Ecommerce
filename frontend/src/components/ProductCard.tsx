import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addToCart } from "@/lib/cartStorage";
import { toggleWishlist, isInWishlist, onWishlistUpdate } from "@/lib/wishlistStorage";

type ProductCardProps = {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  image?: string;
  badge?: string;
  rating?: number;
  category?: string;
};

export default function ProductCard({
  id,
  title,
  price,
  originalPrice,
  image,
  badge,
  rating = 4.5,
  category,
}: ProductCardProps) {
  const router = useRouter();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showAddedFeedback, setShowAddedFeedback] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    setWishlisted(isInWishlist(id));
    return onWishlistUpdate(() => setWishlisted(isInWishlist(id)));
  }, [id]);

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id,
      title,
      price,
      originalPrice,
      image,
      badge,
      rating,
      category,
    });
    router.push("/cart");
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAddingToCart(true);
    
    addToCart({
      id,
      title,
      price,
      originalPrice,
      image,
      badge,
      rating,
      category,
    });

    setShowAddedFeedback(true);
    setTimeout(() => {
      setIsAddingToCart(false);
      setShowAddedFeedback(false);
    }, 1500);
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-rose-100/60 shadow-sm overflow-hidden hover:shadow-xl hover:shadow-rose-100/40 hover:-translate-y-1.5 transition-all duration-400">
      {/* Badge */}
      {badge && (
        <div className="absolute top-3 left-3 z-10 bg-rose-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
          {badge}
        </div>
      )}

      {/* Wishlist button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist({ id, title, price, originalPrice, image, rating, category });
        }}
        className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border flex items-center justify-center transition-all duration-200 ${
          wishlisted
            ? "text-rose-500 border-rose-300 shadow-sm"
            : "text-gray-400 border-rose-100 hover:text-rose-500 hover:border-rose-300 hover:shadow-sm"
        }`}
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <svg
          className="w-4 h-4"
          fill={wishlisted ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </button>

      {/* Image */}
      <div className="relative h-52 bg-linear-to-br from-rose-50/80 via-amber-50/50 to-pink-50/80 overflow-hidden">
        <img
          src={image || "https://via.placeholder.com/300x300?text=Product"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Quick view button */}
        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Link
            href={`/products/${id}`}
            className="block w-full text-center py-2 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium hover:bg-white transition-colors"
          >
            Quick View
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`w-3.5 h-3.5 ${
                i < Math.floor(rating) ? "text-amber-400" : "text-gray-200"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-[10px] text-gray-400 ml-0.5">
            {rating.toFixed(1)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-800 leading-snug group-hover:text-rose-600 transition-colors line-clamp-1">
          {title}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-1.5">
          <span className="text-lg font-bold text-rose-600">${price}</span>
          {originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              ${originalPrice}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className={`w-full py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
            showAddedFeedback
              ? "bg-emerald-500 text-white"
              : "bg-rose-100 text-rose-600 hover:bg-rose-500 hover:text-white"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {showAddedFeedback ? (
            <span className="flex items-center justify-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Added to Cart
            </span>
          ) : (
            "Add to Cart"
          )}
        </button>

        {/* Buy Now */}
        <div className="block mt-2">
          <button 
            onClick={handleBuyNow}
            className="w-full py-2 rounded-full bg-orange-400 text-white text-xs font-semibold hover:bg-orange-500 transition-all duration-300">
            Buy Now
          </button>
        </div>
        
      </div>
    </div>
  );
}