"use client";

import { NextUIProvider } from "@nextui-org/system";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider>
        <SessionProvider>{children}</SessionProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
