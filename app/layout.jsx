export const metadata = {
  title: "Cell Battle - タンパク質カードバトル",
  description: "122種類のタンパク質カードで戦う、細胞生物学カードバトルゲーム",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#f5f0e6",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body style={{ margin: 0, background: "#f5f0e6" }}>{children}</body>
    </html>
  );
}
