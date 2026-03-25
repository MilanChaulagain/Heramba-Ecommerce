
// Another approach when backend is not ready yet (mock login flow)
  "use client";

 import { useRouter } from "next/navigation";
 import { useState } from "react";

 export default function SocialLoginModal({ close }: { close: () => void }) {
   const router = useRouter();
   const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

   // Toggle this when backend is ready
   const isBackendReady = false;

   const handleSocialLogin = (provider: string) => {
     setLoadingProvider(provider);
     close();

     if (isBackendReady) {
       //  Real OAuth (Django backend)
       window.location.href = `http://localhost:8000/auth/${provider}/login/`;
     } else {
       //  Mock login (for now)
       setTimeout(() => {
         router.push("/login/success");
       }, 2000);
     }
   };

   return (
     <div className="w-75 rounded-2xl border border-rose-100 bg-white shadow-xl shadow-rose-100/60 overflow-hidden">
      
       {/* Header */}
       <div className="flex items-center justify-between px-4 py-3 border-b border-rose-100 bg-rose-50/70">
         <h2 className="text-sm font-semibold text-gray-800">
           Continue with
         </h2>
         <button
           onClick={close}
           aria-label="Close login options"
           className="text-gray-500 hover:text-rose-600 transition-colors"
         >
           <svg
             className="w-4 h-4"
             fill="none"
             stroke="currentColor"
             strokeWidth={2}
             viewBox="0 0 24 24"
           >
             <path
              strokeLinecap="round"
               strokeLinejoin="round"
               d="M6 18L18 6M6 6l12 12"
             />
           </svg>
         </button>
       </div>

       {/* Buttons */}
       <div className="space-y-2.5 p-3">
        
         {/* Facebook */}
         <button
           onClick={() => handleSocialLogin("facebook")}
           disabled={loadingProvider !== null}
           className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60"
         >
           {loadingProvider === "facebook" ? "Logging in..." : "Facebook"}
         </button>

         {/* Instagram */}
         <button
           onClick={() => handleSocialLogin("instagram")}
           disabled={loadingProvider !== null}
           className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-red-500 text-white text-sm font-semibold hover:opacity-95 transition-opacity disabled:opacity-60"
         >
           {loadingProvider === "instagram" ? "Logging in..." : "Instagram"}
         </button>

         {/* TikTok */}
         <button
           onClick={() => handleSocialLogin("tiktok")}
           disabled={loadingProvider !== null}
           className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-black text-white text-sm font-semibold hover:bg-neutral-900 transition-colors disabled:opacity-60"
         >
           {loadingProvider === "tiktok" ? "Logging in..." : "TikTok"}
         </button>
       </div>
     </div>
   );
 } 
  