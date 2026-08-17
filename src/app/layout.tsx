import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/HomePage/SmoothScroll";
import PageLoader from "@/components/Common/PageLoader";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "مدرسة النيل الحديثة",
  description: "نظام إدارة المدرسة الذكي",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" className={`${cairo.variable} antialiased`}>
      <body className={`${cairo.className} w-full`}>
        <SmoothScroll>
          <PageLoader />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
