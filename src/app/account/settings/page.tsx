"use client";

import { useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useTheme } from "@/contexts/ThemeContext";

export default function SettingsPage() {
	const [emailNotifications, setEmailNotifications] = useState(true);
	const [smsNotifications, setSmsNotifications] = useState(false);
	const [websiteLanguage, setWebsiteLanguage] = useState<"en" | "ne">("en");
	const { theme, setTheme } = useTheme();

	return (
		<ProtectedRoute>
			<main className="min-h-screen bg-linear-to-b from-rose-50/40 to-white px-6 py-10 md:py-14 dark:from-slate-900 dark:to-slate-950">
				<section className="mx-auto w-full max-w-4xl rounded-2xl border border-rose-100 bg-white shadow-sm p-6 md:p-8 dark:border-slate-700 dark:bg-slate-900">
					<div>
						<h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-slate-100">Website Settings</h1>
						<p className="mt-2 text-sm md:text-base text-gray-500 dark:text-slate-300">Configure your notification and display preferences.</p>
					</div>

					<div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
						<label className="flex items-center justify-between rounded-xl border border-rose-100 px-4 py-3 text-sm text-gray-700 dark:border-slate-700 dark:text-slate-200">
							<span>Email Notifications</span>
							<input
								type="checkbox"
								checked={emailNotifications}
								onChange={(event) => setEmailNotifications(event.target.checked)}
								className="h-4 w-4 accent-rose-500"
							/>
						</label>

						<label className="flex items-center justify-between rounded-xl border border-rose-100 px-4 py-3 text-sm text-gray-700 dark:border-slate-700 dark:text-slate-200">
							<span>SMS Notifications</span>
							<input
								type="checkbox"
								checked={smsNotifications}
								onChange={(event) => setSmsNotifications(event.target.checked)}
								className="h-4 w-4 accent-rose-500"
							/>
						</label>

						<label className="text-sm text-gray-600 dark:text-slate-300">
							<span className="mb-1 block text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-slate-400">Language</span>
							<select
								value={websiteLanguage}
								onChange={(event) => setWebsiteLanguage(event.target.value as "en" | "ne")}
								className="w-full rounded-xl border border-rose-100 bg-white px-3 py-2 text-sm text-gray-700 focus:border-rose-300 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-500"
							>
								<option value="en">English</option>
								<option value="ne">Nepali</option>
							</select>
						</label>

						<label className="text-sm text-gray-600 dark:text-slate-300">
							<span className="mb-1 block text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-slate-400">Theme</span>
							<select
								value={theme}
								onChange={(event) => setTheme(event.target.value as "system" | "light" | "dark")}
								className="w-full rounded-xl border border-rose-100 bg-white px-3 py-2 text-sm text-gray-700 focus:border-rose-300 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-500"
							>
								<option value="system">System Default</option>
								<option value="light">Light</option>
								<option value="dark">Dark</option>
							</select>
						</label>
					</div>

					<div className="mt-6 flex flex-wrap gap-3">
						<Link
							href="/account/profile"
							className="inline-flex items-center justify-center rounded-full border border-rose-200 px-5 py-2.5 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50"
						>
							Back to Profile
						</Link>
						<Link
							href="/account/orders"
							className="inline-flex items-center justify-center rounded-full bg-rose-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-rose-600"
						>
							View Purchase History
						</Link>
					</div>
				</section>
			</main>
		</ProtectedRoute>
	);
}
