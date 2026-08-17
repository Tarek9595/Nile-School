"use client";
import { useLoader, useTsData } from "@/store";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { FaSchool } from "react-icons/fa";
import { LuLayoutDashboard, LuNotebook } from "react-icons/lu";
import { HiMiniUsers } from "react-icons/hi2";
import { IoBookOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { LuGraduationCap } from "react-icons/lu";
import { CiChat1 } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { HiOutlineX } from "react-icons/hi";

interface SideBarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export default function SideBar({
  isSidebarOpen,
  setIsSidebarOpen,
}: SideBarProps) {
  const { startLoadingNavigation } = useLoader();
  const { systemRole, logout } = useTsData();
  const router = useRouter();
  const pathname = usePathname();

  const teacherSys = [
    {
      title: "لوحة التحكم",
      href: "/teacher",
      icon: <LuLayoutDashboard className="text-2xl" />,
    },
    {
      title: "فصولي الدراسية",
      href: "/teacher/classes",
      icon: <HiMiniUsers className="text-2xl" />,
    },
    {
      title: "رصد الدرجات",
      href: "/teacher/grades",
      icon: <LuNotebook className="text-2xl" />,
    },
    {
      title: "الواجبات المدرسية",
      href: "/teacher/assignments",
      icon: <IoBookOutline className="text-2xl" />,
    },
    {
      title: "الجدول الدراسي",
      href: "/teacher/schedule",
      icon: <SlCalender className="text-2xl" />,
    },
  ];

  const studentSys = [
    {
      title: "لوحة التحكم",
      href: "/student",
      icon: <LuLayoutDashboard className="text-2xl" />,
    },
    {
      title: "جدول الحصص",
      href: "/student/schedule",
      icon: <SlCalender className="text-2xl" />,
    },
    {
      title: "الواجبات اليومية",
      href: "/student/homework",
      icon: <IoBookOutline className="text-2xl" />,
    },
    {
      title: "نتائج الاختبارات",
      href: "/student/grades",
      icon: <LuGraduationCap className="text-2xl" />,
    },
    {
      title: "تقييمات المدرسين",
      href: "/student/reviews",
      icon: <CiChat1 className="text-2xl" />,
    },
  ];

  const mainSys =
    systemRole === "Teacher"
      ? teacherSys
      : systemRole === "Student"
        ? studentSys
        : [];

  const handleLogout = () => {
    startLoadingNavigation(() => {
      logout();
      router.push("/");
    });
  };

  return (
    <div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <aside
        className={`fixed lg:static top-0 right-0 z-50 w-64 lg:w-72 min-h-screen bg-main-color text-white text-xl font-bold flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between border-b border-gray-700 py-5 px-4 sm:py-7 sm:px-6">
            <div className="flex items-center gap-2">
              <div className="w-8.5 h-8.5 sm:w-9 sm:h-9 bg-secondry-color flex justify-center items-center rounded-lg text-lg sm:text-xl">
                <FaSchool />
              </div>
              <div>
                <h1 className="text-[16px] sm:text-[18px]">مدرسة النيل</h1>
                <h2 className="text-[11px] sm:text-[12px] text-second-texty-color font-normal">
                  {systemRole === "Teacher" ? "بوابة المعلم" : "بوابة الطالب"}
                </h2>
              </div>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden text-2xl text-second-texty-color hover:text-white"
            >
              <HiOutlineX />
            </button>
          </div>

          <div className="flex flex-col gap-1.5 sm:gap-2.5 px-3 sm:px-4 mt-2">
            {mainSys.map((el, index) => {
              const isActive = pathname === el.href;
              return (
                <Link
                  key={index}
                  href={el.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3.5 w-full p-2.5 sm:p-3 rounded-xl text-[14px] sm:text-[16px] transition-all ${
                    isActive
                      ? "font-bold text-white bg-secondry-color"
                      : "text-second-texty-color font-medium hover:bg-white/5"
                  }`}
                >
                  <span className="shrink-0">{el.icon}</span>
                  <span>{el.title}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div
          onClick={handleLogout}
          className="w-full flex gap-3 items-center border-t border-gray-700 p-5 sm:p-7 text-[15px] sm:text-[16px] text-red-400 cursor-pointer hover:text-red-300 transition-colors font-bold mt-auto"
        >
          <IoIosLogOut className="text-2xl shrink-0" />
          <span>تسجيل خروج</span>
        </div>
      </aside>
    </div>
  );
}
