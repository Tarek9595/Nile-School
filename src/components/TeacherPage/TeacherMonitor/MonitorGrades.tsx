"use client";

import { useState } from "react";
import GradeInput from "./GradeInput";

export default function MonitorGrades() {
  const [grades, setGrades] = useState([
    { id: 1, name: "أحمد محمد علي", midterm: 18, final: 0, coursework: 9 },
    { id: 2, name: "سارة إبراهيم حسن", midterm: 20, final: 0, coursework: 10 },
    { id: 3, name: "عمر خالد عبد الله", midterm: 14, final: 0, coursework: 7 },
    { id: 4, name: "فاطمة أحمد سعيد", midterm: 19, final: 0, coursework: 10 },
    { id: 5, name: "يوسف مصطفى كمال", midterm: 16, final: 0, coursework: 8 },
    { id: 6, name: "مريم سامي فؤاد", midterm: 17, final: 0, coursework: 9 },
    { id: 7, name: "مريم سامي فؤاد", midterm: 17, final: 0, coursework: 9 },
    { id: 8, name: "مريم سامي فؤاد", midterm: 17, final: 0, coursework: 9 },
    { id: 9, name: "مريم سامي فؤاد", midterm: 17, final: 0, coursework: 9 },
    { id: 10, name: "مريم سامي فؤاد", midterm: 17, final: 0, coursework: 9 },
    { id: 11, name: "مريم سامي فؤاد", midterm: 17, final: 0, coursework: 9 },
    { id: 12, name: "مريم سامي فؤاد", midterm: 17, final: 0, coursework: 9 },
    { id: 13, name: "مريم سامي فؤاد", midterm: 17, final: 0, coursework: 9 },
    { id: 14, name: "مريم سامي فؤاد", midterm: 17, final: 0, coursework: 9 },
    { id: 15, name: "مريم سامي فؤاد", midterm: 17, final: 0, coursework: 9 },
    { id: 16, name: "مريم سامي فؤاد", midterm: 17, final: 0, coursework: 9 },
    { id: 17, name: "مريم سامي فؤاد", midterm: 17, final: 0, coursework: 9 },
    { id: 18, name: "مريم سامي فؤاد", midterm: 17, final: 0, coursework: 9 },
    { id: 19, name: "مريم سامي فؤاد", midterm: 17, final: 0, coursework: 9 },
    { id: 20, name: "مريم سامي فؤاد", midterm: 17, final: 0, coursework: 9 },
    { id: 21, name: "مريم سامي فؤاد", midterm: 17, final: 0, coursework: 9 },
    { id: 22, name: "مريم سامي فؤاد", midterm: 17, final: 0, coursework: 9 },
    { id: 23, name: "مريم سامي فؤاد", midterm: 17, final: 0, coursework: 9 },
    { id: 24, name: "مريم سامي فؤاد", midterm: 17, final: 0, coursework: 9 },
    { id: 25, name: "مريم سامي فؤاد", midterm: 17, final: 0, coursework: 9 },
    { id: 26, name: "مريم سامي فؤاد", midterm: 17, final: 0, coursework: 9 },
    { id: 27, name: "مريم سامي فؤاد", midterm: 17, final: 0, coursework: 9 },
    { id: 28, name: "مريم سامي فؤاد", midterm: 17, final: 0, coursework: 9 },
    { id: 29, name: "مريم سامي فؤاد", midterm: 17, final: 0, coursework: 9 },
  ]);
  const handleGradeChange = (
    id: number,
    field: string,
    value: number | null,
  ) => {
    setGrades((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, [field]: value } : student,
      ),
    );
  };
  return (
    <div
      data-lenis-prevent
      className="flex flex-col overflow-y-auto h-dvh gap-10 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent"
    >
      <div className="flex justify-between items-center px-5">
        <div>
          <h4 className="text-lg font-extrabold text-[#1e3a5f]">رصد الدرجات</h4>
          <p className="text-xs text-slate-500 mt-0.5">
            الصف الاول الاعدادي 1/1
          </p>
        </div>
        <div className="flex justify-center items-center gap-3">
          <button className="bg-slate-200  text-slate-700 px-4 py-2 rounded-lg font-medium text-sm hover:bg-slate-400 hover:text-slate-100 transition-colors duration-200 cursor-pointer">
            إلغاء
          </button>
          <button className="bg-[#15223e] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-main-color transition-colors duration-200 cursor-pointer">
            حفظ الدرجات
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:hidden">
        {grades.map((g) => {
          const total = (g.midterm || 0) + (g.coursework || 0) + (g.final || 0);
          return (
            <div
              key={g.id}
              className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex flex-col gap-3"
            >
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <span className="font-bold text-slate-800 text-sm">
                  {g.name}
                </span>
                <div className="text-xs">
                  <span className="font-extrabold text-[#1e3a5f] text-sm">
                    {total}
                  </span>
                  <span className="text-slate-400"> / 70</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="flex flex-col gap-1 items-center bg-slate-50 p-2 rounded-lg">
                  <span className="text-slate-500 font-medium">النصفي</span>
                  <GradeInput
                    value={g.midterm}
                    max={20}
                    onChange={(val) => handleGradeChange(g.id, "midterm", val)}
                  />
                </div>

                <div className="flex flex-col gap-1 items-center bg-slate-50 p-2 rounded-lg">
                  <span className="text-slate-500 font-medium">
                    أعمال الفصل
                  </span>
                  <GradeInput
                    value={g.coursework}
                    max={10}
                    onChange={(val) =>
                      handleGradeChange(g.id, "coursework", val)
                    }
                  />
                </div>

                <div className="flex flex-col gap-1 items-center bg-slate-50 p-2 rounded-lg">
                  <span className="text-slate-500 font-medium">النهائي</span>
                  <GradeInput
                    value={g.final}
                    max={40}
                    onChange={(val) => handleGradeChange(g.id, "final", val)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-200/80 shadow-sm bg-white">
        <table className="w-full text-sm min-w-162.5">
          <thead className="">
            <tr className="bg-slate-50 text-slate-600 ">
              <th className="p-3 font-bold text-center">اسم الطالب</th>
              <th className="p-3 font-bold text-center">الاختبار النصفي</th>
              <th className="p-3 font-bold text-center">أعمال الفصل</th>
              <th className="p-3 font-bold text-center">الاختبار النهائي</th>
              <th className="p-3 font-bold text-center">المجموع</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((g) => {
              const total =
                (g.midterm || 0) + (g.coursework || 0) + (g.final || 0);
              return (
                <tr
                  key={g.id}
                  className="border-t border-slate-100 hover:bg-slate-50/60"
                >
                  <td className="p-3 font-semibold text-slate-700 text-center">
                    {g.name}
                  </td>
                  <td className="p-2 text-center">
                    <GradeInput
                      value={g.midterm}
                      max={20}
                      onChange={(val) =>
                        handleGradeChange(g.id, "midterm", val)
                      }
                    />
                  </td>

                  <td className="p-2 text-center">
                    <GradeInput
                      value={g.coursework}
                      max={10}
                      onChange={(val) =>
                        handleGradeChange(g.id, "coursework", val)
                      }
                    />
                  </td>

                  <td className="p-2 text-center">
                    <GradeInput
                      value={g.final}
                      max={40}
                      onChange={(val) => handleGradeChange(g.id, "final", val)}
                    />
                  </td>
                  <td className="p-3 text-center">
                    <span className="font-bold text-[#1e3a5f]">{total}</span>
                    <span className="text-slate-400 text-xs"> / 70</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
