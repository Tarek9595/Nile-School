"use client";
import { useTsData } from "@/store";
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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    router.push("/");
    logout();
  };
  return (
    <div className="flex" dir="rtl">
      <aside className="w-72 h-dvh bg-main-color text-white text-xl font-bold flex flex-col gap-3">
        <div className="flex gap-2 items-center border-b border-gray-700 py-7 px-2">
          <div className="w-8.75 h-8.75 bg-secondry-color flex justify-center items-center rounded-lg">
            <FaSchool />
          </div>
          <div>
            <h1 className="text-[18px]">مدرسة النيل</h1>
            <h2 className="text-[12px] text-second-texty-color">
              بوابة المعلم
            </h2>
          </div>
        </div>
        <div className="grow flex flex-col gap-2.5 px-4">
          {mainSys.map((el, index) => {
            const isActive = pathname === el.href;
            return (
              <div
                key={index}
                className={`flex items-center px-10 gap-4 w-full p-3 rounded-2xl text-[16px] ${
                  isActive
                    ? `font-bold text-white bg-secondry-color`
                    : `text-second-texty-color font-medium bg-transparent`
                }`}
              >
                {el.icon}
                <Link href={el.href}>{el.title}</Link>
              </div>
            );
          })}
        </div>
        <div
          onClick={handleLogout}
          className="w-full flex gap-2 items-center border-t border-gray-700 p-7 text-[16px] text-red-400 cursor-pointer hover:text-red-700 font-bold"
        >
          <IoIosLogOut className="text-2xl" />
          <h1>تسجيل خروج</h1>
        </div>
      </aside>

      <main className="w-full flex-1 bg-slate-50 border border-black">
        <div>لوحة تحكم {systemRole}</div>
        <div className="bg-indigo-200 text-3xl text-red-600 flex justify-center items-center h-dvh">
          {children}
        </div>
      </main>
    </div>
  );
}
