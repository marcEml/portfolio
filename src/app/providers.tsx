"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { PreferencesProvider } from "@/contexts/PreferencesContext";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <PreferencesProvider>
        {children}
        <Toaster position="top-right" />
      </PreferencesProvider>
    </QueryClientProvider>
  );
}
