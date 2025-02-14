import type { Metadata } from "next";

import { notoSansKR } from "@/fonts/ko";

import "./globals.scss";

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
      <body className={notoSansKR.className}>{children}</body>
    </html>
  );
}
