"use client";

import { useAudienceModal } from "@/store";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { LuRefreshCcw } from "react-icons/lu";
import { VscSave } from "react-icons/vsc";

export default function Audience() {
  const { showModal, setModal } = useAudienceModal();

  const [students, setStudents] = useState([
    { id: 1, name: "أحمد محمد إبراهيم", status: "حاضر", notes: "" },
    { id: 2, name: "سارة علي حسن", status: "غائب", notes: "" },
    { id: 3, name: "ياسين محمود كمال", status: "متأخر", notes: "" },
    { id: 4, name: "نور فؤاد زكي", status: "حاضر", notes: "" },
    { id: 5, name: "عبد الله يوسف مصطفى", status: "حاضر", notes: "" },
    { id: 6, name: "مريم محمود خليل", status: "حاضر", notes: "" },
    { id: 7, name: "عمر خالد سعيد", status: "غائب", notes: "" },
  ]);

  const handleStatusChange = (id: number, status: string) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, status } : student,
      ),
    );
  };

  const handleNotesChange = (id: number, notes: string) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, notes } : student,
      ),
    );
  };
  return (
    <div
      className="w-full bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-sm"
      dir="rtl"
    >
      {showModal && (
        <div className=" w-full flex justify-end">
          <button
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            onClick={() => setModal(false)}
          >
            <FaXmark className="w-5 h-5 text-slate-500" />
          </button>
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-5 justify-between items-center p-3">
        <div className="flex flex-col gap-2">
          <h1 className="text-base sm:text-[18px] font-black text-main-color">
            كشف حضور فصل ١/١
          </h1>
          <p className="text-xs sm:text-[14px] text-texty-color">
            الاثنين، ٢٠ مايو ٢٠٢٤ · الحصة الثالثة
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-3 justify-center items-center">
          <div className="flex justify-center items-center gap-2 p-3 rounded-xl border-2 border-[#E2E8F0] cursor-pointer font-bold text-texty-color transition-colors hover:bg-slate-50">
            <LuRefreshCcw className="text-xl" />
            <span className="text-[14px]">تغيير الفصل</span>
          </div>
          <div className="flex justify-center items-center gap-2 p-3 rounded-xl bg-secondry-color text-white font-bold cursor-pointer transition-opacity hover:opacity-90">
            <VscSave className="text-xl" />
            <span className="text-[14px]">حفظ الكشف</span>
          </div>
        </div>
      </div>

      <div className="w-full mt-4 border border-[#F1F5F9] rounded-xl overflow-hidden relative">
        <table className="w-full text-right border-collapse table-fixed">
          <thead>
            <tr className="bg-slate-50/50 border-b border-[#F1F5F9] text-[#94A3B8] text-xs sm:text-sm font-semibold">
              <th className="py-4 px-6 w-[40%]">اسم الطالب</th>
              <th className="py-4 px-4 w-[35%] text-center">الحالة</th>
              <th className="py-4 px-6 w-[25%] text-center">ملاحظات</th>
            </tr>
          </thead>
        </table>

        <div
          data-lenis-prevent
          className="w-full overflow-y-auto max-h-80 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent"
        >
          <table className="w-full text-right border-collapse table-fixed">
            <tbody className="divide-y divide-[#F1F5F9] text-xs sm:text-sm">
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-4 px-6 w-[40%]">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-[#1E293B] truncate">
                        {student.name}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-4 w-[35%]">
                    <div className="flex items-center justify-center bg-[#F8FAFC] p-1.5 rounded-xl gap-1 max-w-55 mx-auto border border-[#EDF2F7]">
                      <button
                        type="button"
                        onClick={() => handleStatusChange(student.id, "حاضر")}
                        className={`flex-1 py-1.5 px-3 rounded-lg font-bold transition-all text-xs cursor-pointer ${
                          student.status === "حاضر"
                            ? "bg-[#00A36C] text-white shadow-sm"
                            : "text-[#64748B] hover:text-[#1E293B]"
                        }`}
                      >
                        حاضر
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStatusChange(student.id, "غائب")}
                        className={`flex-1 py-1.5 px-3 rounded-lg font-bold transition-all text-xs cursor-pointer ${
                          student.status === "غائب"
                            ? "bg-[#E11D48] text-white shadow-sm"
                            : "text-[#64748B] hover:text-[#1E293B]"
                        }`}
                      >
                        غائب
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStatusChange(student.id, "متأخر")}
                        className={`flex-1 py-1.5 px-3 rounded-lg font-bold transition-all text-xs cursor-pointer ${
                          student.status === "متأخر"
                            ? "bg-[#F59E0B] text-white shadow-sm"
                            : "text-[#64748B] hover:text-[#1E293B]"
                        }`}
                      >
                        متأخر
                      </button>
                    </div>
                  </td>

                  <td className="py-4 px-6 w-[25%] text-center">
                    <input
                      type="text"
                      placeholder="أضف ملاحظة..."
                      value={student.notes}
                      onChange={(e) =>
                        handleNotesChange(student.id, e.target.value)
                      }
                      className="w-full max-w-45 bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl py-2.5 px-4 text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#CBD5E1] focus:bg-white transition-all"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
