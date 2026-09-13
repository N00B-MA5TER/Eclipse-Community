// Force reload
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Playfair_Display, Space_Grotesk } from "next/font/google";
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


import { SmoothScrolling } from "@/components/SmoothScrolling";

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
      className={`${inter.variable} ${plusJakarta.variable} ${playfair.variable} ${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300" suppressHydrationWarning>
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
