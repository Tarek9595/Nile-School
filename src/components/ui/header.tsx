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
      <div className="w-full max-w-385 py-3 px-6 gap-2.5 shadow-lg flex justify-between items-center sticky">
        <HiOutlineMenu
          className="block md:hidden text-3xl cursor-pointer"
          onClick={() => setOpenNav(true)}
        />
        {openNav ? (
          <NarrowNav openNav={openNav} setOpenNav={setOpenNav} />
        ) : (
          <WideNav />
        )}
        <div className="flex justify-center items-center gap-2">
          <span className="bg-main-color p-2  rounded-lg text-white">
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
        className="py-2.5 px-8 rounded-full bg-main-color text-white"
      >
        تسجيل الدخول
      </Link>
      <div className="grow flex justify-center items-center gap-6">
        <Link href="#footer" className="text-main-color font-mediumm">
          تواصل معنا
        </Link>

        <Link href="#vision" className="text-main-color font-mediumm">
          الرؤية والرسالة
        </Link>

        <Link href="#about" className="text-main-color font-mediumm">
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
      className={`fixed inset-0 z-6000 transition-all duration-500 ${openNav ? "visible" : "invisible"}`}
    >
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${openNav ? "opacity-100" : "opacity-0"}`}
        onClick={() => setOpenNav(false)}
      ></div>

      <div
        className={`absolute left-0 top-0 h-full w-70 bg-white shadow-2xl p-8 flex flex-col transition-transform duration-500 ${openNav ? "translate-x-0" : "translate-x-full"} `}
      >
        <div className="flex justify-end mb-8 ">
          <AiOutlineClose
            className="text-3xl cursor-pointer"
            onClick={() => setOpenNav(false)}
          />
        </div>
        <nav className="gorw h-full flex flex-col justify-between items-center py-10">
          <div className="w-full flex flex-col items-end gap-10">
            <div className="text-right w-[90%] p-3 pr-5 rounded-4xl bg-transparent cursor-pointer hover:bg-main-color group">
              <Link
                href="#footer"
                onClick={handleLinkClick}
                className="text-main-color font-mediumm group-hover:text-white"
              >
                تواصل معنا
              </Link>
            </div>
            <div className="text-right w-[90%] p-3 pr-5 rounded-4xl bg-transparent cursor-pointer hover:bg-main-color group">
              <Link
                href="#about"
                onClick={handleLinkClick}
                className="text-main-color font-mediumm group-hover:text-white"
              >
                الرؤية والرسالة
              </Link>
            </div>

            <div className="text-right w-[90%] p-3 pr-5 rounded-4xl bg-transparent cursor-pointer hover:bg-main-color group">
              <Link
                href="#vision"
                onClick={handleLinkClick}
                className="text-main-color font-mediumm group-hover:text-white"
              >
                عن المدرسة
              </Link>
            </div>
          </div>

          <Link
            href="/login"
            className="py-2.5 px-8 rounded-full bg-main-color text-white"
          >
            تسجيل الدخول
          </Link>
        </nav>
      </div>
    </div>
  );
}
