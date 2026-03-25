"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";

type PurchaseStatus = "delivered" | "processing" | "cancelled";

type PurchaseItem = {
	id: number;
	title: string;
	quantity: number;
	price: number;
	image: string;
};

type PurchaseOrder = {
	id: string;
	placedOn: string;
	status: PurchaseStatus;
	items: PurchaseItem[];
	total: number;
};

const samplePurchases: PurchaseOrder[] = [];

const statusBadgeClass: Record<PurchaseStatus, string> = {
	delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
	processing: "bg-amber-50 text-amber-700 border-amber-200",
	cancelled: "bg-rose-50 text-rose-700 border-rose-200",
};

function formatCurrency(value: number) {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "NPR",
		maximumFractionDigits: 0,
	}).format(value);
}

function formatDate(value: string) {
	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	}).format(new Date(value));
}

export default function OrdersPage() {
	const [statusFilter, setStatusFilter] = useState<"all" | PurchaseStatus>("all");
	const [dateSort, setDateSort] = useState<"newest" | "oldest">("newest");
	const [reorderMessage, setReorderMessage] = useState<string>("");

	const filteredPurchases = useMemo(() => {
		const byStatus =
			statusFilter === "all"
				? samplePurchases
				: samplePurchases.filter((order) => order.status === statusFilter);

		return [...byStatus].sort((a, b) => {
			const left = new Date(a.placedOn).getTime();
			const right = new Date(b.placedOn).getTime();
			return dateSort === "newest" ? right - left : left - right;
		});
	}, [statusFilter, dateSort]);

	const orderCountLabel = `${samplePurchases.length} order${samplePurchases.length === 1 ? "" : "s"}`;

	const handleReorderPreview = (orderId: string) => {
		setReorderMessage(`Reorder preview ready for ${orderId}. Cart integration comes next.`);
	};

	return (
		<ProtectedRoute>
			<main className="min-h-screen bg-linear-to-b from-rose-50/40 to-white px-6 py-10 md:py-14">
				<section className="mx-auto w-full max-w-4xl rounded-2xl border border-rose-100 bg-white shadow-sm p-6 md:p-8">
					<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
						<div>
							<h1 className="text-3xl md:text-4xl font-bold text-gray-800">Purchase History</h1>
							<p className="mt-2 text-sm md:text-base text-gray-500">Track your past purchases and reorder quickly.</p>
						</div>
						<span className="inline-flex items-center rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-600 border border-rose-100">
							{orderCountLabel}
						</span>
					</div>

					<div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
						<label className="text-sm text-gray-600">
							<span className="mb-1 block text-xs font-medium uppercase tracking-wide text-gray-400">Status</span>
							<select
								value={statusFilter}
								onChange={(event) => setStatusFilter(event.target.value as "all" | PurchaseStatus)}
								className="w-full rounded-xl border border-rose-100 bg-white px-3 py-2 text-sm text-gray-700 focus:border-rose-300 focus:outline-none"
							>
								<option value="all">All statuses</option>
								<option value="delivered">Delivered</option>
								<option value="processing">Processing</option>
								<option value="cancelled">Cancelled</option>
							</select>
						</label>

						<label className="text-sm text-gray-600">
							<span className="mb-1 block text-xs font-medium uppercase tracking-wide text-gray-400">Sort By Date</span>
							<select
								value={dateSort}
								onChange={(event) => setDateSort(event.target.value as "newest" | "oldest")}
								className="w-full rounded-xl border border-rose-100 bg-white px-3 py-2 text-sm text-gray-700 focus:border-rose-300 focus:outline-none"
							>
								<option value="newest">Newest first</option>
								<option value="oldest">Oldest first</option>
							</select>
						</label>
					</div>

					{reorderMessage && (
						<div className="mt-4 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700">
							{reorderMessage}
						</div>
					)}

					<div className="mt-6 space-y-4">
						{samplePurchases.length === 0 ? (
							<div className="rounded-xl border border-dashed border-rose-200 bg-rose-50/30 px-5 py-8 text-center">
								<p className="text-sm font-medium text-gray-700">No purchase history yet</p>
								<p className="mt-1 text-xs text-gray-500">Your completed purchases will appear here once you place an order.</p>
							</div>
						) : filteredPurchases.length === 0 ? (
							<div className="rounded-xl border border-dashed border-rose-200 bg-rose-50/30 px-5 py-8 text-center">
								<p className="text-sm font-medium text-gray-700">No orders match your filters</p>
								<p className="mt-1 text-xs text-gray-500">Try a different status or date sort to view your purchases.</p>
							</div>
						) : (
							filteredPurchases.map((order) => {
								const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);

								return (
									<article
										key={order.id}
										className="rounded-2xl border border-rose-100/70 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
									>
										<div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
											<div>
												<p className="text-xs font-medium uppercase tracking-wide text-gray-400">Order ID</p>
												<p className="mt-1 text-sm font-semibold text-gray-800">{order.id}</p>
												<p className="mt-2 text-xs text-gray-500">Placed on {formatDate(order.placedOn)}</p>
											</div>

											<div className="flex flex-wrap items-center gap-2">
												<span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium capitalize ${statusBadgeClass[order.status]}`}>
													{order.status}
												</span>
												<span className="inline-flex rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600">
													{totalItems} item{totalItems === 1 ? "" : "s"}
												</span>
											</div>
										</div>

										<div className="mt-4 rounded-xl border border-rose-100/60 bg-rose-50/30 p-4">
											<ul className="space-y-3">
												{order.items.map((item) => (
													<li key={`${order.id}-${item.id}`} className="flex items-center justify-between gap-3 text-sm">
														<div className="flex min-w-0 items-center gap-3">
															<img
																src={item.image}
																alt={item.title}
																className="h-12 w-12 rounded-lg border border-rose-100 object-cover"
															/>
															<div className="min-w-0">
																<Link href={`/products/${item.id}`} className="block truncate font-medium text-gray-700 hover:text-rose-600 transition-colors">
																	{item.title}
																</Link>
																<p className="text-xs text-gray-500">Qty: {item.quantity}</p>
															</div>
														</div>
														<span className="shrink-0 font-medium text-gray-600">{formatCurrency(item.price)}</span>
													</li>
												))}
											</ul>
										</div>

										<div className="mt-4 flex flex-wrap items-center justify-between gap-3">
											<p className="text-sm font-semibold text-gray-800">Total: {formatCurrency(order.total)}</p>
											<button
												type="button"
												onClick={() => handleReorderPreview(order.id)}
												className="inline-flex items-center justify-center rounded-full border border-rose-200 px-4 py-2 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50"
											>
												Reorder
											</button>
										</div>
									</article>
								);
							})
						)}
					</div>

					<div className="mt-6">
						<Link
							href="/account/profile"
							className="inline-flex items-center justify-center rounded-full border border-rose-200 px-5 py-2.5 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50"
						>
							Back to Profile
						</Link>
					</div>
				</section>
			</main>
		</ProtectedRoute>
	);
}
