"use client";
import { useTsData } from "@/store";
import { FaUserCheck } from "react-icons/fa6";
import { ImUsers } from "react-icons/im";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { CalendarCheck, BookOpenText, TrendingUp } from "lucide-react";

export default function Header() {
  const { userData, systemRole } = useTsData();
  const name = userData?.fullName || "";
  const subject = userData?.ts_subject?.name || "";

  const teacherContent = [
    {
      title: "الفصول النشطة",
      titleNumber: "٠٤",
      icon: <ImUsers className="text-secondry-color" />,
      iconBg: "bg-secondry-color/20",
    },
    {
      title: "إجمالي الطلاب",
      titleNumber: "١٢٤",
      icon: <FaUserCheck className="text-[#009966]" />,
      iconBg: "bg-[#009966]/20",
    },
    {
      title: "نسبة الحضور اليومي",
      titleNumber: "٩٦٪",
      icon: <IoMdCheckmarkCircleOutline className="text-[#E17100]" />,
      iconBg: "bg-[#E17100]/20",
    },
  ];

  const studentContent = [
    {
      title: "نسبة الحضور",
      titleNumber: "٩٦٪",
      icon: <CalendarCheck className="text-emerald-600" />,
      iconBg: "bg-emerald-50",
    },
    {
      title: "واجبات معلّقة",
      titleNumber: "٣",
      icon: <BookOpenText className="text-amber-600" />,
      iconBg: "bg-amber-50",
    },
    {
      title: "المعدل التراكمي",
      titleNumber: "٩٣٫٣",
      icon: <TrendingUp className="text-blue-600" />,
      iconBg: "bg-blue-50",
    },
  ];

  const isTeacher = systemRole === "Teacher";

  const crrContent = isTeacher ? teacherContent : studentContent;
  return (
    <div className="flex flex-col gap-3 pb-3 shadow-gray-200 shadow-xl">
      <div className="bg-white p-6">
        <h1 className="text-[20px] font-black">
          أهلاً، {isTeacher ? `أ/ ${name}` : name}
        </h1>

        <h2 className="text-[14px] font-medium text-texty-color">
          {isTeacher
            ? `مدرس ${subject} · للمرحلة الاعدادية`
            : "طالب · للمرحلة الاعدادية"}
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-3 px-3">
        {crrContent.map((el, index) => {
          return (
            <div
              key={index}
              className="w-full lg:w-[calc((100%-1.5rem)/3)] bg-white border border-[#E2E8F0] rounded-3xl p-5 flex justify-between items-center shadow-gray-200 shadow-xl"
            >
              <div className="flex flex-col justify-center gap-2">
                <h1 className="text-texty-color text-[14px]">{el.title}</h1>
                <h2 className="text-main-color text-[30px] font-black pr-3">
                  {el.titleNumber}
                </h2>
              </div>
              <div
                className={`w-10 h-10 ${el.iconBg} text-2xl rounded-lg flex justify-center items-center`}
              >
                {el.icon}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
