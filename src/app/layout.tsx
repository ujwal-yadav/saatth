import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { SaatthProvider } from "@/components/saatth-provider";

export const metadata: Metadata = {
  title: { default: "Saatth — Thoughtful support", template: "%s · Saatth" },
  description: "Thoughtful support for you and the people you love. Explore companions for hospital visits, care for parents, everyday errands and more.",
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={GeistSans.variable} data-scroll-behavior="smooth">
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <SaatthProvider>{children}</SaatthProvider>
      </body>
    </html>
  );
}
