"use client";

import Link from "next/link";
import { useT } from "@/hooks/useT";

export default function Connections() {
  const t = useT("aboutPage");

  return (
    <div className="relative overflow-hidden text-center h-full flex flex-col justify-center">
      
      {/* Soft Background Blur Effects */}
      <div className="absolute -top-10 left-10 w-40 h-40 bg-pink-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-10 w-40 h-40 bg-rose-200 rounded-full blur-3xl opacity-30"></div>

      <div className="relative">
        <h2 className="text-2xl md:text-4xl font-bold text-rose-600">
          {t.connectionsTitle}
        </h2>

        <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed">
          {t.connectionsDescription}
        </p>

        {/* Social Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          
          <Link
            href="https://www.facebook.com/heramba_heramba"
            target="_blank"
            className="px-6 py-2 rounded-full bg-blue-500 text-white 
            shadow-md hover:shadow-lg hover:-translate-y-1 
            transition-all duration-300"
          >
            Facebook
          </Link>

          <Link
            href="https://www.instagram.com/heramba_heramba"
            target="_blank"
            className="px-6 py-2 rounded-full bg-gradient-to-r 
            from-pink-500 to-rose-500 text-white 
            shadow-md hover:shadow-lg hover:-translate-y-1 
            transition-all duration-300"
          >
            Instagram
          </Link>

          <Link
            href="https://www.tiktok.com/@heramba_heramba"
            target="_blank"
            className="px-6 py-2 rounded-full bg-black text-white 
            shadow-md hover:shadow-lg hover:-translate-y-1 
            transition-all duration-300"
          >
            TikTok
          </Link>

        </div>
      </div>
    </div>
  );
}