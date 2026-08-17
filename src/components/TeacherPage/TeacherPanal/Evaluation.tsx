"use client";

import { useState } from "react";
import { LuNotebookTabs } from "react-icons/lu";

export default function Evaluation() {
  const [evaluations] = useState([
    {
      id: 1,
      name: "أحمد محمد إبراهيم",
      initials: "أ.م",
      exam: "اختبار شهر مايو",
      score: "١٩ / ٢٠",
      appreciation: "ممتاز",
      avatarBg: "bg-[#E0F2FE]", // أزرق فاتح
      avatarText: "text-[#0284C7]",
    },
    {
      id: 2,
      name: "سارة علي حسن",
      initials: "س.ع",
      exam: "اختبار شهر مايو",
      score: "٢٠ / ٢٠",
      appreciation: "ممتاز",
      avatarBg: "bg-[#DCFCE7]", // أخضر فاتح
      avatarText: "text-[#16A34A]",
    },
    {
      id: 3,
      name: "ياسين محمود كمال",
      initials: "ي.م",
      exam: "اختبار شهر مايو",
      score: "١٥ / ٢٠",
      appreciation: "جيد جداً",
      avatarBg: "bg-[#FEF3C7]", // أصفر/برتقالي فاتح
      avatarText: "text-[#D97706]",
    },
  ]);

  return (
    <div
      className="w-full  bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-sm"
      dir="rtl"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#DCFCE7] rounded-2xl flex items-center justify-center text-[#16A34A]">
            <LuNotebookTabs className="text-xl" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0F172A]">
            التقييمات الأخيرة
          </h2>
        </div>
        <button
          type="button"
          className="text-sm font-bold text-[#1D4ED8] hover:underline cursor-pointer"
        >
          عرض الكل
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {evaluations.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-[#F8FAFC] border border-[#F1F5F9] rounded-2xl p-4 transition-all hover:bg-slate-100/60"
          >
            <div className="flex flex-col items-start gap-0.5">
              <span className="text-sm font-black text-[#16A34A] tracking-wider">
                {item.score}
              </span>
              <span className="text-xs font-semibold text-[#94A3B8]">
                {item.appreciation}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex flex-col text-right">
                <h3 className="text-sm font-bold text-[#1E293B]">
                  {item.name}
                </h3>
                <p className="text-xs text-[#94A3B8] font-medium">
                  {item.exam}
                </p>
              </div>

              <div
                className={`w-11 h-11 rounded-full ${item.avatarBg} ${item.avatarText} font-bold text-xs sm:text-sm flex items-center justify-center shrink-0`}
              >
                {item.initials}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
