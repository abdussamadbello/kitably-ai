"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Navbar from "@/components/common/Navbar";
import { Loader2 } from "lucide-react";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ 
  children, 
}: ProtectedLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { status } = useSession();

  // Define public paths internally
  const publicPaths = ["/auth/signin", "/auth/signup"];
  const isPublicPath = publicPaths.includes(pathname);

  // Effect for handling authentication
  React.useEffect(() => {
    if (status === "unauthenticated" && !isPublicPath) {
      router.push("/auth/signin");
    }
  }, [status, isPublicPath, router]);

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // If user is not authenticated and this is a protected route, don't render anything
  if (status === "unauthenticated" && !isPublicPath) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Only show navbar if authenticated or on public paths */}
      {(status === "authenticated" || isPublicPath) && <Navbar />}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}