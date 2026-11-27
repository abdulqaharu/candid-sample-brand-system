import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Sidebar } from "@/components/shell/sidebar";
import { SmoothScroll } from "@/components/shell/smooth-scroll";
import { sidebarScript } from "@/lib/sidebar-script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Candid brand system, sample", template: "%s | Candid brand system" },
  description: "Sample brand system for Candid, an owner's engineering firm for gas-fired power.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="scrollbar-hover"
      data-theme="light"
      data-sidebar="expanded"
      // The script below can change data-sidebar before React starts.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: sidebarScript }} />
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col font-sans antialiased lg:flex-row`}
      >
        <SmoothScroll />
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
