import type { Metadata } from "next";
import "./globals.css";
import Menu from "@/components/Menu";
import { AuthProvider } from "./providers";

export const metadata: Metadata = {
  title: "e3web",
  description: "e3webは、WebGLを簡単に扱うためのフレームワークです。シンプルなAPIで、3Dグラフィックスの作成やアニメーションが可能です。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <Menu />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
