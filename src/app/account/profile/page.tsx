"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useMemo, useState } from "react";
import Link from "next/link";

const defaultUser = {
	fullName: "Guest User",
	email: "Not available",
	phone: "+977 9812345678",
	joinedOn: "March 2025",
	address: "Kathmandu, Nepal",
};

type PurchaseStatus = "delivered" | "processing" | "cancelled";

function decodeJwtPayload(token: string) {
	try {
		const parts = token.split(".");
		if (parts.length < 2) return null;

		const payloadBase64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
		const paddedPayload = payloadBase64.padEnd(
			payloadBase64.length + ((4 - (payloadBase64.length % 4)) % 4),
			"="
		);

		return JSON.parse(atob(paddedPayload));
	} catch {
		return null;
	}
}

function resolveInitialFullName(): string {
	if (typeof window === "undefined") {
		return defaultUser.fullName;
	}

	const storedUser = localStorage.getItem("auth_user");
	if (storedUser) {
		try {
			const parsedUser = JSON.parse(storedUser);
			if (typeof parsedUser?.name === "string" && parsedUser.name.trim()) {
				return parsedUser.name.trim();
			}
		} catch {
		}
	}

	const token = localStorage.getItem("token");
	if (!token) {
		return defaultUser.fullName;
	}

	const payload = decodeJwtPayload(token);
	const candidateName = payload?.name ?? payload?.full_name ?? payload?.username;

	if (typeof candidateName === "string" && candidateName.trim()) {
		return candidateName.trim();
	}

	return defaultUser.fullName;
}

export default function UserPage() {
	const [fullName] = useState<string>(resolveInitialFullName);

	const initials = useMemo(() => {
		return fullName
			.split(" ")
			.filter(Boolean)
			.map((part) => part[0])
			.join("")
			.slice(0, 2)
			.toUpperCase();
	}, [fullName]);

	return (
		<ProtectedRoute>
		<main className="min-h-screen bg-linear-to-b from-rose-50/40 to-white px-6 py-10 md:py-14">
			<section className="mx-auto w-full max-w-4xl">
				<div className="mb-8">
					<div>
						<h1 className="text-3xl md:text-4xl font-bold text-gray-800">My Profile</h1>
						<p className="mt-2 text-sm md:text-base text-gray-500">
							View your personal account details and quick account links.
						</p>
					</div>
				</div>

				<div className="rounded-2xl border border-rose-100 bg-white shadow-sm overflow-hidden">
					<div className="bg-linear-to-r from-rose-100 to-pink-100 px-6 py-8 md:px-8">
						<div className="flex items-center gap-4">
							<div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-xl font-semibold text-rose-500">
								{initials}
							</div>
							<div>
								<h2 className="text-xl font-semibold text-gray-800">{fullName}</h2>
								<p className="text-sm text-gray-600">Member since {defaultUser.joinedOn}</p>
							</div>
						</div>
					</div>

					<div className="p-6 md:p-8">
						<dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
							<div>
								<dt className="text-xs font-medium uppercase tracking-wide text-gray-400">Email</dt>
								<dd className="mt-1 text-sm md:text-base text-gray-700">{defaultUser.email}</dd>
							</div>

							<div>
								<dt className="text-xs font-medium uppercase tracking-wide text-gray-400">Phone</dt>
								<dd className="mt-1 text-sm md:text-base text-gray-700">{defaultUser.phone}</dd>
							</div>

							<div className="sm:col-span-2">
								<dt className="text-xs font-medium uppercase tracking-wide text-gray-400">Address</dt>
								<dd className="mt-1 text-sm md:text-base text-gray-700">{defaultUser.address}</dd>
							</div>
						</dl>

						<div className="mt-8 flex flex-wrap gap-3">
							<Link
								href="/account/orders"
								className="inline-flex items-center justify-center rounded-full bg-rose-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-rose-600"
							>
								View Purchase History
							</Link>
							<Link
								href="/account/settings"
								className="inline-flex items-center justify-center rounded-full border border-rose-200 px-5 py-2.5 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50"
							>
								Manage Settings
							</Link>
						</div>
					</div>
				</div>
			</section>
		</main>
		</ProtectedRoute>
	);
}
