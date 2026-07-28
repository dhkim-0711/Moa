import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "모아 — 나의 지식과 문서 작업실",
  description: "자료를 모으고, 근거 있는 답과 기획서·보고서 초안을 만드는 개인 지식 어시스턴트",
  metadataBase: new URL("https://moa-knowledge-assistant.sites.openai.com"),
  openGraph: {
    title: "모아 — 나의 지식과 문서 작업실",
    description: "자료를 모으고, 생각을 발전시키는 나의 지식 작업실",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "모아 — 나의 지식과 문서 작업실",
    description: "자료를 모으고, 생각을 발전시키는 나의 지식 작업실",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
