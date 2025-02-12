import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "홍성인 | 프론트엔드 개발자",
  description:
    "디테일한 인터랙션과 최적화된 퍼포먼스를 고민하는 개발자 홍성인입니다.",
  openGraph: {
    type: "website",
    title: "홍성인 | 프론트엔드 개발자",
    description:
      "디테일한 인터랙션과 최적화된 퍼포먼스를 고민하는 개발자 홍성인입니다.",
    locale: "ko_KR",
    siteName: "홍성인 | 프론트엔드 개발자",
    // images: [""], //TODO: 추후 추가
  },
  twitter: {
    card: "summary",
    title: "홍성인 | 프론트엔드 개발자",
    description:
      "디테일한 인터랙션과 최적화된 퍼포먼스를 고민하는 개발자 홍성인입니다.",
    // images: [""],//TODO: 추후 추가
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko-KR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
