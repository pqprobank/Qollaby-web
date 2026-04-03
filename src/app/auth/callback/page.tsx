"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function AuthCallbackPage() {
  const router = useRouter();
  const { completeOAuthLogin, error } = useAuth();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    async function handleCallback() {
      try {
        await completeOAuthLogin();
        router.replace("/pricing");
      } catch {
        router.replace("/login?error=oauth_failed");
      }
    }

    handleCallback();
  }, [completeOAuthLogin, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      {error ? (
        <div className="text-center space-y-2">
          <p className="font-medium text-red-600">{error}</p>
          <p className="text-sm text-[#6c727a]">Redirecting to login...</p>
        </div>
      ) : (
        <div className="flex items-center gap-3 text-[#6c727a]">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Verifying identity...</span>
        </div>
      )}
    </div>
  );
}
