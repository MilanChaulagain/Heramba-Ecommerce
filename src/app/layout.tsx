import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { LanguageProvider } from "@/contexts/LanguageContext";
import AppProviders from "@/components/providers/AppProviders";

export const metadata: Metadata = {
  title: "Heramba",
  description: "Premium Baby Essentials",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body>
        <AppProviders>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="grow">{children}</main>
            <Footer />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}


