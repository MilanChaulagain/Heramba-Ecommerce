"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginSuccess() {
  const router = useRouter();

  useEffect(() => {
    // FAKE TOKEN (temporary)
    const fakeToken = "mock-user-token";

    localStorage.setItem("token", fakeToken);

    router.push("/");
  }, []);

  return <p>Logging you in...</p>;
}