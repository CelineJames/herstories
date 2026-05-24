import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ChatWidget from "@/components/chat-widget";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: {
    default: "HerStories — Documenting Her, Defining Us...",
    template: "%s | HerStories",
  },
  description:
    "A digital archive celebrating the African women who shaped history — their biographies, stories, and legacies.",
  keywords: [
    "African women",
    "African history",
    "women's history",
    "biography",
    "archive",
    "Africa",
    "feminism",
    "activism",
  ],
  openGraph: {
    type: "website",
    siteName: "HerStories",
    title: "HerStories — Documenting Her, Defining Us...",
    description:
      "A digital archive celebrating the African women who shaped history — their biographies, stories, and legacies.",
    url: "https://herstories-africa.vercel.app",
    images: [
      {
        url: "https://herstories-africa.vercel.app/logo.png",
        width: 1200,
        height: 630,
        alt: "HerStories — Documenting Her, Defining Us...",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HerStories — Documenting Her, Defining Us...",
    description:
      "A digital archive celebrating the African women who shaped history — their biographies, stories, and legacies.",
    images: ["https://herstories-africa.vercel.app/logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({
  children,
}: RootLayoutProps): React.ReactElement {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Header />
          <main className="pt-20">{children}</main>
          <Footer />
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
