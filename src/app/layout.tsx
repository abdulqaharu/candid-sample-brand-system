import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Intro } from "@/components/intro/intro";
import { Sidebar } from "@/components/shell/sidebar";
import { Welcome } from "@/components/welcome/welcome";
import { SmoothScroll } from "@/components/shell/smooth-scroll";
import { introScript } from "@/lib/intro-script";
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
  title: { default: "Candid Intelligence brand system, sample", template: "%s | Candid Intelligence brand system" },
  description: "Sample brand system for Candid, an owner's engineering firm for gas-fired power.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="scrollbar-hover"
      data-theme="light"
      data-sidebar="expanded"
      // The scripts below can change data-sidebar and the class before React starts.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: sidebarScript }} />
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col font-sans antialiased lg:flex-row`}
      >
        <SmoothScroll />
        <Intro />
        {/* The intro holds this still beneath itself while it plays. */}
        <div id="app" className="flex min-w-0 flex-1 flex-col lg:flex-row">
          <Sidebar />
          {children}
        </div>
        <Welcome />
      </body>
    </html>
  );
}
