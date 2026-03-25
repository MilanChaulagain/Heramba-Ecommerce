"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { addToCart } from "@/lib/cartStorage";
import { isInWishlist, onWishlistUpdate, toggleWishlist } from "@/lib/wishlistStorage";
import { productService, type Product } from "@/services/productService";
import ProductReviews from "@/components/products/ProductReviews";
import ProductQuestions from "@/components/products/ProductQuestions";

type MediaItem = {
  type: "image" | "video";
  url: string;
  thumbnail?: string;
};

type ProductVideo = {
  url: string;
  thumbnail?: string;
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = Number(params.id);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [wishlisted, setWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);

  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [buying, setBuying] = useState(false);

  const fallbackImage = "https://via.placeholder.com/900x900?text=Product";

  const normalizeVideoUrl = (url: string) => {
    if (url.includes("youtube.com/watch?v=")) {
      const id = url.split("v=")[1]?.split("&")[0];
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1]?.split("?")[0];
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }
    return url;
  };

  const isDirectVideoFile = (url: string) => /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);

  /* Load Product */
  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);

        const data = await productService.getProductById(productId);

        if (data) {
          setProduct(data);
          setWishlisted(isInWishlist(data.id));
        } else {
          router.push("/products");
        }
      } catch (error) {
        console.error("Failed to load product:", error);
        router.push("/products");
      } finally {
        setLoading(false);
      }
    }

    if (productId) {
      loadProduct();
    }
  }, [productId, router]);

  /* Wishlist Listener */
  useEffect(() => {
    if (product) {
      return onWishlistUpdate(() =>
        setWishlisted(isInWishlist(product.id))
      );
    }
  }, [product]);

  const allMedia: MediaItem[] = useMemo(() => {
    if (!product) return [];

    const images =
      product.images && product.images.length > 0
        ? product.images
        : product.image
          ? [product.image]
          : [fallbackImage];

    const imageMedia: MediaItem[] = images.map((img) => ({
      type: "image",
      url: img,
    }));

    const videos = ((product as Product & { videos?: ProductVideo[] }).videos ?? [])
      .filter((video) => Boolean(video?.url))
      .map((video) => ({
        type: "video" as const,
        url: video.url,
        thumbnail: video.thumbnail,
      }));

    const merged = [...imageMedia, ...videos];
    return merged.length > 0 ? merged : [{ type: "image", url: fallbackImage }];
  }, [product]);

  useEffect(() => {
    setSelectedMediaIndex(0);
    setQuantity(1);
  }, [productId]);

  useEffect(() => {
    if (selectedMediaIndex >= allMedia.length) {
      setSelectedMediaIndex(0);
    }
  }, [allMedia.length, selectedMediaIndex]);

  const selectedMedia = allMedia[selectedMediaIndex] ?? allMedia[0];

  const addSelectedQuantityToCart = (targetProduct: Product, amount: number) => {
    const safeAmount = Math.max(1, Math.min(10, amount));
    const primaryImage = targetProduct.images?.[0] ?? targetProduct.image ?? fallbackImage;

    for (let i = 0; i < safeAmount; i += 1) {
      addToCart({
        id: targetProduct.id,
        title: targetProduct.title,
        price: targetProduct.price,
        originalPrice: targetProduct.originalPrice,
        image: primaryImage,
        badge: targetProduct.badge,
        rating: targetProduct.rating,
        category: targetProduct.category,
      });
    }
  };

  /* Add To Cart */
  const handleAddToCart = () => {
    if (!product) return;

    setAdding(true);
    addSelectedQuantityToCart(product, quantity);

    setAdded(true);

    setTimeout(() => {
      setAdding(false);
      setAdded(false);
    }, 1400);
  };

  /* Buy Now */
  const handleBuyNow = () => {
    if (!product) return;

    setBuying(true);
    addSelectedQuantityToCart(product, quantity);

    router.push("/cart");
  };

  /* Wishlist Toggle */
  const handleToggleWishlist = () => {
    if (!product) return;

    const added = toggleWishlist({
      id: product.id,
      title: product.title,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images?.[0] ?? product.image ?? fallbackImage,
      rating: product.rating,
      category: product.category,
    });

    setWishlisted(added);
  };

  /* Loading Skeleton */
  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
        <section className="mx-auto max-w-7xl animate-pulse">
          <div className="mb-6 h-6 w-40 rounded-full bg-slate-200" />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_1fr]">
            <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <div className="aspect-square rounded-2xl bg-slate-200" />
              <div className="mt-4 flex gap-3">
                <div className="h-16 w-16 rounded-xl bg-slate-200" />
                <div className="h-16 w-16 rounded-xl bg-slate-200" />
                <div className="h-16 w-16 rounded-xl bg-slate-200" />
              </div>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="h-4 w-24 rounded-full bg-slate-200" />
              <div className="mt-3 h-10 w-4/5 rounded-xl bg-slate-200" />
              <div className="mt-6 h-8 w-36 rounded-xl bg-slate-200" />
              <div className="mt-6 h-24 rounded-2xl bg-slate-200" />
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="h-11 rounded-full bg-slate-200" />
                <div className="h-11 rounded-full bg-slate-200" />
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  /* Product Not Found */
  if (!product) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-24">
        <section className="mx-auto max-w-xl rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
          <h1 className="text-3xl font-semibold text-slate-800">Product not found</h1>
          <p className="mt-3 text-slate-500">
            This product may have been moved or removed from the catalog.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-flex rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-600"
          >
            Back to Products
          </Link>
        </section>
      </main>
    );
  }

  const ratingValue = product.rating ?? 0;
  const roundedRating = Math.round(ratingValue * 10) / 10;

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) *
            100
        )
      : 0;

  return (
    <main
      className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_0%_0%,#fff1f2_0%,#fff_38%),radial-gradient(circle_at_100%_100%,#fef3c7_0%,#fff_44%)]"
      style={{ fontFamily: '"Sora", "Nunito Sans", "Segoe UI", sans-serif' }}
    >
      <div className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-rose-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-24 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-14">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-full border border-rose-200/80 bg-white/75 px-4 py-2 text-sm font-medium text-rose-600 shadow-sm backdrop-blur transition hover:bg-rose-50"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </Link>

        <div className="mt-7 grid grid-cols-1 gap-8 lg:grid-cols-[1.12fr_1fr] xl:gap-10">
          <div className="rounded-[28px] bg-white/85 p-4 shadow-xl shadow-rose-100/40 ring-1 ring-white/80 sm:p-5">
            <div className="relative overflow-hidden rounded-3xl bg-[linear-gradient(145deg,#ffe4e6_0%,#fff7ed_45%,#ffffff_100%)]">
              {selectedMedia?.type === "video" ? (
                isDirectVideoFile(selectedMedia.url) ? (
                  <video
                    className="aspect-square w-full bg-black object-cover"
                    controls
                    playsInline
                    poster={selectedMedia.thumbnail ?? product.images?.[0] ?? fallbackImage}
                    src={selectedMedia.url}
                  />
                ) : (
                  <iframe
                    src={normalizeVideoUrl(selectedMedia.url)}
                    title={`${product.title} video`}
                    className="aspect-square w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )
              ) : (
                <img
                  src={selectedMedia?.url ?? fallbackImage}
                  alt={product.title}
                  className="aspect-square w-full object-cover"
                />
              )}

              {product.badge && (
                <span className="absolute left-4 top-4 rounded-full bg-rose-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  {product.badge}
                </span>
              )}
            </div>

            <div className="mt-4 flex gap-2.5 overflow-x-auto pb-1 sm:gap-3">
              {allMedia.map((media, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedMediaIndex(index)}
                  className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition sm:h-24 sm:w-24 ${
                    selectedMediaIndex === index
                      ? "border-rose-500 ring-2 ring-rose-200"
                      : "border-slate-200 hover:border-rose-300"
                  }`}
                  aria-label={`Select media ${index + 1}`}
                >
                  {media.type === "image" ? (
                    <img
                      src={media.url}
                      alt={`${product.title} thumbnail ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="relative h-full w-full">
                      <img
                        src={media.thumbnail ?? product.images?.[0] ?? fallbackImage}
                        alt={`${product.title} video thumbnail ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 grid place-items-center bg-black/30">
                        <span className="rounded-full bg-white/85 px-2 py-1 text-[10px] font-semibold text-slate-700">
                          Video
                        </span>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] bg-white/90 p-6 shadow-xl shadow-rose-100/30 ring-1 ring-white/80 sm:p-7 lg:sticky lg:top-6 lg:h-fit">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wide">
              {product.category && (
                <span className="rounded-full bg-rose-100 px-2.5 py-1 text-rose-700">{product.category}</span>
              )}
              {product.ageGroup && (
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-amber-700">{product.ageGroup}</span>
              )}
              {product.stock !== undefined && (
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-emerald-700">
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </span>
              )}
            </div>

            <div className="mt-3 flex items-start justify-between gap-4">
              <h1 className="text-3xl font-black leading-tight text-slate-800 sm:text-4xl">{product.title}</h1>
              <button
                onClick={handleToggleWishlist}
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border transition ${
                  wishlisted
                    ? "border-rose-300 bg-rose-50 text-rose-500"
                    : "border-slate-200 bg-white text-slate-400 hover:border-rose-300 hover:text-rose-500"
                }`}
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </button>
            </div>

            <div className="mt-5 flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(ratingValue) ? "text-amber-400" : "text-slate-200"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-sm font-medium text-slate-500">{roundedRating.toFixed(1)} rating</span>
            </div>

            <div className="mt-6 flex items-end gap-3">
              <span className="text-4xl font-black text-rose-600">${product.price}</span>

              {product.originalPrice && (
                <span className="text-xl text-slate-400 line-through">${product.originalPrice}</span>
              )}

              {discountPercent > 0 && (
                <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-700">
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            <p className="mt-6 text-base leading-relaxed text-slate-600">
              {product.description}
            </p>

            <div className="mt-7 rounded-2xl border border-rose-100 bg-rose-50/60 p-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-rose-500">Quantity</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="grid h-10 w-10 place-items-center rounded-full border border-rose-200 bg-white text-lg text-rose-600 transition hover:border-rose-300"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="min-w-10 text-center text-lg font-bold text-slate-700">{quantity}</span>
                <button
                  onClick={() => setQuantity((prev) => Math.min(10, prev + 1))}
                  className="grid h-10 w-10 place-items-center rounded-full border border-rose-200 bg-white text-lg text-rose-600 transition hover:border-rose-300"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                onClick={handleAddToCart}
                disabled={adding}
                className={`h-12 rounded-full text-sm font-semibold transition-all ${
                  added
                    ? "bg-emerald-500 text-white"
                    : "bg-rose-100 text-rose-700 hover:bg-rose-500 hover:text-white"
                }`}
              >
                {added ? `Added x${quantity}` : `Add to Cart x${quantity}`}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={buying}
                className="h-12 rounded-full bg-orange-400 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Buy Now
              </button>
            </div>

            <ul className="mt-7 space-y-2 text-sm text-slate-500">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                Skin-safe materials and tested finish
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                7-day easy returns and replacement support
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                Fast delivery to major cities across Nepal
              </li>
            </ul>
          </div>
        </div>
      </section>
      <ProductReviews />
      <ProductQuestions />
    </main>
  );
}