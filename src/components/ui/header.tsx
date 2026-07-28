"use client";

import Link from "next/link";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaSchool } from "react-icons/fa6";
import { HiOutlineMenu } from "react-icons/hi";

export default function Header() {
  const [openNav, setOpenNav] = useState(false);
  return (
    <section className="w-full flex justify-center items-center">
      <div className="w-full max-w-[1540px] py-3 px-6 gap-2.5 shadow-lg flex justify-between items-center sticky top-0 bg-white z-50">
        <HiOutlineMenu
          className="block md:hidden text-3xl cursor-pointer text-main-color"
          onClick={() => setOpenNav(true)}
        />

        <WideNav />
        <NarrowNav openNav={openNav} setOpenNav={setOpenNav} />

        <div className="flex justify-center items-center gap-2">
          <span className="bg-main-color p-2 rounded-lg text-white">
            <FaSchool />
          </span>
          <h1 className="text-main-color font-bold">مدرسة النيل الحديثة</h1>
        </div>
      </div>
    </section>
  );
}

function WideNav() {
  return (
    <nav className="grow hidden md:flex justify-between items-center">
      <Link
        href="/login"
        className="py-2.5 px-8 rounded-full bg-main-color text-white font-medium"
      >
        تسجيل الدخول
      </Link>
      <div className="grow flex justify-center items-center gap-6">
        <Link href="#footer" className="text-main-color font-medium">
          تواصل معنا
        </Link>

        <Link href="#vision" className="text-main-color font-medium">
          الرؤية والرسالة
        </Link>

        <Link href="#about" className="text-main-color font-medium">
          عن المدرسة
        </Link>
      </div>
    </nav>
  );
}

function NarrowNav({ openNav, setOpenNav }) {
  const handleLinkClick = () => setOpenNav(false);
  return (
    <div
      className={`fixed inset-0 z-[10000] transition-all duration-300 ${
        openNav ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          openNav ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setOpenNav(false)}
      />

      <div
        className={`absolute right-0 top-0 h-full w-72 bg-white shadow-2xl p-6 flex flex-col z-10 transition-transform duration-300 ease-in-out ${
          openNav ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <div className="flex items-center gap-2">
            <span className="bg-main-color p-1.5 rounded-lg text-white text-sm">
              <FaSchool />
            </span>
            <h2 className="text-main-color font-bold text-sm">
              مدرسة النيل الحديثة
            </h2>
          </div>
          <AiOutlineClose
            className="text-2xl cursor-pointer text-gray-600 hover:text-black"
            onClick={() => setOpenNav(false)}
          />
        </div>

        <nav className="grow flex flex-col justify-between py-4" dir="rtl">
          <div className="w-full flex flex-col gap-3">
            <Link
              href="#footer"
              onClick={handleLinkClick}
              className="text-main-color font-medium p-3 rounded-xl hover:bg-main-color hover:text-white transition-colors"
            >
              تواصل معنا
            </Link>

            <Link
              href="#vision"
              onClick={handleLinkClick}
              className="text-main-color font-medium p-3 rounded-xl hover:bg-main-color hover:text-white transition-colors"
            >
              الرؤية والرسالة
            </Link>

            <Link
              href="#about"
              onClick={handleLinkClick}
              className="text-main-color font-medium p-3 rounded-xl hover:bg-main-color hover:text-white transition-colors"
            >
              عن المدرسة
            </Link>
          </div>

          <Link
            href="/login"
            onClick={handleLinkClick}
            className="w-full text-center py-3 rounded-full bg-main-color text-white font-medium shadow-md mt-6"
          >
            تسجيل الدخول
          </Link>
        </nav>
      </div>
    </div>
  );
}
