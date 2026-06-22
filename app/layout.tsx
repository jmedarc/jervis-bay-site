import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Things To Do Jervis Bay",
  description:
    "A local guide to Jervis Bay — hidden gems, beaches, walks, rainy day ideas, and real advice from a local perspective.",
  metadataBase: new URL("https://thingstodojervisbay.com"),

  openGraph: {
    title: "Things To Do Jervis Bay",
    description:
      "A local guide to Jervis Bay — hidden gems, beaches, walks, rainy day ideas, and real advice from a local perspective.",
    url: "https://thingstodojervisbay.com",
    siteName: "Things To Do Jervis Bay",
    images: [
      {
        url: "/Crystal_Clear_Hyams_Beach_White_Sand.jpg",
        width: 1200,
        height: 630,
        alt: "Jervis Bay beach overview",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Things To Do Jervis Bay",
    description:
      "A local guide to Jervis Bay — hidden gems, beaches, walks, and rainy day ideas.",
    images: ["/Crystal_Clear_Hyams_Beach_White_Sand.jpg"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
