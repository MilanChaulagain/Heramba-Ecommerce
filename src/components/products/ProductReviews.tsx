"use client";

import { useState } from "react";

export default function ProductReviews() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const mockReviews = [
    {
      id: 1,
      rating: 5,
      title: "Excellent quality",
      message: "Great product. Very good quality!",
      author: "Aarav",
      date: "2 days ago",
    },
    {
      id: 2,
      rating: 4,
      title: "Good value",
      message: "Worth the price.",
      author: "Sita",
      date: "1 week ago",
    },
  ];

  const handleSubmit = () => {
    console.log({
      rating,
      review,
    });

    setRating(0);
    setReview("");
  };

  const isSubmitDisabled = rating === 0 || review.trim().length === 0;

  const renderStars = (value: number) =>
    "★".repeat(value) + "☆".repeat(5 - value);

  return (
    <section className="mt-8 ml-5 mr-5 border-t border-gray-200 pt-6">
      {/* Header with Title and Rating Summary */}
      <div className="mb-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
        </div>

        {/* Rating Summary Card */}
        <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">4.5</p>
              <p className="text-xs text-gray-500">of 5</p>
            </div>
            <div className="h-8 w-px bg-gray-200" />
            <div>
              <p className="text-lg text-amber-500">★★★★☆</p>
              <p className="text-xs text-gray-600">{mockReviews.length} reviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="mb-6 space-y-3">
        {mockReviews.map((item) => (
          <article
            key={item.id}
            className="rounded-lg border border-gray-200 bg-white p-4 transition hover:border-gray-300 hover:bg-gray-50"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-700">
                  {item.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{item.author}</p>
                  <p className="text-xs text-gray-500">{item.date}</p>
                </div>
              </div>
              <p className="text-sm text-amber-500">{renderStars(item.rating)}</p>
            </div>

            <div className="mt-3">
              <h4 className="text-sm font-semibold text-gray-900">{item.title}</h4>
              <p className="mt-1 text-sm text-gray-700">{item.message}</p>
            </div>
          </article>
        ))}
      </div>

      {/* Write Review Form */}
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <h3 className="text-lg font-bold text-gray-900">Write a Review</h3>

        <div className="mt-4 space-y-4">
          {/* Rating Input */}
          <div className="space-y-2">
            <label htmlFor="rating" className="block text-sm font-semibold text-gray-700">
              Rating <span className="text-red-500">*</span>
            </label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-black focus:ring-1 focus:ring-black/20"
            >
              <option value="0">Select a rating...</option>
              <option value="5">★★★★★ - Excellent</option>
              <option value="4">★★★★☆ - Good</option>
              <option value="3">★★★☆☆ - Average</option>
              <option value="2">★★☆☆☆ - Fair</option>
              <option value="1">★☆☆☆☆ - Poor</option>
            </select>
          </div>

          {/* Review Textarea */}
          <div className="space-y-2">
            <label htmlFor="review" className="block text-sm font-semibold text-gray-700">
              Review <span className="text-red-500">*</span>
            </label>
            <textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your feedback..."
              rows={4}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black/20"
            />
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Be honest and specific</span>
              <span>{review.length}/500</span>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={handleSubmit}
              disabled={isSubmitDisabled}
              className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => {
                setRating(0);
                setReview("");
              }}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}