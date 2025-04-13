// pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import clsx from "clsx";

import { Navbar } from "@/components/navbar";
import { fontSans } from "@/config/fonts";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <div
      className={clsx(
        "min-h-screen bg-background font-sans antialiased overflow-x-hidden", // ← 추가
        fontSans.variable
      )}
    >
      <HeroUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="w-full max-w-4xl mx-auto pt-16 px-4 sm:px-6 flex-grow">
            <Component {...pageProps} />
            </main>
          </div>
        </NextThemesProvider>
      </HeroUIProvider>
    </div>
  );
}
