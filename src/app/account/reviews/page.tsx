"use client";

import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function ReviewsPage() {
	return (
		<ProtectedRoute>
			<main className="min-h-screen bg-linear-to-b from-rose-50/40 to-white px-6 py-10 md:py-14">
				<section className="mx-auto w-full max-w-4xl rounded-2xl border border-rose-100 bg-white p-6 shadow-sm md:p-8">
					<h1 className="text-3xl md:text-4xl font-bold text-gray-800">My Reviews</h1>
					<p className="mt-2 text-sm md:text-base text-gray-500">
						You have not submitted any product reviews yet.
					</p>

					<div className="mt-6 rounded-xl border border-dashed border-rose-200 bg-rose-50/30 px-5 py-8 text-center">
						<p className="text-sm font-medium text-gray-700">No reviews found</p>
						<p className="mt-1 text-xs text-gray-500">
							Browse products and share your feedback after purchase.
						</p>
					</div>

					<div className="mt-6">
						<Link
							href="/products"
							className="inline-flex items-center justify-center rounded-full border border-rose-200 px-5 py-2.5 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50"
						>
							Browse Products
						</Link>
					</div>
				</section>
			</main>
		</ProtectedRoute>
	);
}
