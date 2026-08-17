"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { IoBookOutline } from "react-icons/io5";

export default function Homeworks() {
  const [formData, setFormData] = useState({
    targetClass: "",
    title: "",
    instructions: "",
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("بيانات الواجب:", formData);
  };

  return (
    <div className="w-full bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-sm">
      <div className="flex items-center  gap-3 mb-6">
        <div className="w-10 h-10 bg-[#EFF6FF] rounded-xl flex items-center justify-center text-[#2563EB]">
          <IoBookOutline className="text-xl" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#1E293B]">
          إضافة واجب جديد
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-[#475569]">
            الفصل الدراسي المستهدف
          </label>
          <div className="relative w-full">
            <select
              value={formData.targetClass}
              onChange={(e) =>
                setFormData({ ...formData, targetClass: e.target.value })
              }
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl py-3 px-4 text-sm text-[#1E293B] appearance-none focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all cursor-pointer"
            >
              <option value="" disabled>
                اختر الفصل...
              </option>
              <option value="1/1">فصل ١/١</option>
              <option value="1/2">فصل ١/٢</option>
              <option value="2/1">فصل ٢/١</option>
            </select>

            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              <FiChevronDown className="text-lg" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-[#475569]">
            عنوان الواجب
          </label>
          <input
            type="text"
            placeholder="مثال: حل مسائل الهندسة ص ٤٥"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl py-3 px-4 text-sm text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-[#475569]">
            وصف التعليمات
          </label>
          <textarea
            rows={4}
            placeholder="اكتب تفاصيل الواجب هنا..."
            value={formData.instructions}
            onChange={(e) =>
              setFormData({ ...formData, instructions: e.target.value })
            }
            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 text-sm text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold py-3.5 rounded-2xl transition-all shadow-md active:scale-[0.99] mt-2"
        >
          نشر الواجب
        </button>
      </form>
    </div>
  );
}
