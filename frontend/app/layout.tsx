// Force reload
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Playfair_Display, Space_Grotesk, Bodoni_Moda } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/firebase/auth";
import { MobileBlocker } from "@/components/MobileBlocker";
import { ParallaxBackground } from "@/components/ParallaxBackground";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-mono",
  subsets: ["latin"],
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

import { SmoothScrolling } from "@/components/SmoothScrolling";
import { SplashScreen } from "@/components/SplashScreen";

export const metadata: Metadata = {
  title: "Eclipse Tech Community",
  description: "Secure, scalable, and responsive workshop registration.",
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable} ${playfair.variable} ${spaceGrotesk.variable} ${bodoni.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300" suppressHydrationWarning>
        <SplashScreen />
        <ParallaxBackground />
        <MobileBlocker />
        <SmoothScrolling>
          <AuthProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </AuthProvider>
        </SmoothScrolling>
      </body>
    </html>
  );
}
