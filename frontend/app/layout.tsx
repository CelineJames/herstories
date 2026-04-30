import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ChatWidget from "@/components/chat-widget";

export const metadata: Metadata = {
  title: "HerStories",
  description: "Documenting Her, Defining Us....",
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
        <Header />
        <main className="pt-20">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
