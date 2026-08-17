"use client";
import { useState } from "react";
import Header from "@/components/Common/Header";
import SideBar from "@/components/Common/SideBar";
import Logo from "@/components/Common/Logo";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-[#f4f4f4]" dir="rtl">
      <SideBar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <main className="flex-1 flex flex-col min-w-0">
        <Logo setIsSidebarOpen={setIsSidebarOpen} />

        <div className="w-full bg-transparent border-b-2 border-[#E2E8F0]">
          <Header />
        </div>

        <div className="flex-1 p-3">{children}</div>
      </main>
    </div>
  );
}
