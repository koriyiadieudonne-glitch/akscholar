// ============================================================
// AKSCHOLAR — Layout Racine
// ============================================================

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AKSCHOLAR — Votre Passeport vers l'Excellence Académique Mondiale",
    template: "%s | AKSCHOLAR",
  },
  description:
    "Découvrez les meilleures bourses d'études, stages et programmes d'échange mondiaux. Guides premium, coaching VIP et tuteurs certifiés pour maximiser vos chances de succès.",
  keywords: [
    "bourses d'études",
    "scholarships",
    "bourse internationale",
    "étudier en France",
    "étudier au Canada",
    "DAAD",
    "Eiffel",
    "Fulbright",
    "Chevening",
    "aide financière études",
  ],
  openGraph: {
    title: "AKSCHOLAR — Bourses d'études mondiales",
    description: "La plateforme #1 pour trouver et décrocher les meilleures bourses internationales.",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "AKSCHOLAR",
    description: "Bourses d'études, universités, tuteurs — tout pour réussir à l'international.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ background: "var(--ak-gris-leger)" }}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
