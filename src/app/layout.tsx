import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: "東京 妊活・出産・育児 支援ガイド",
  description:
    "東京都23区の不妊治療から育児まで、国・都・区の補助金・助成金を一括検索。ライフステージとお住まいの区を選ぶだけで、受けられる支援制度を一覧で確認できます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
