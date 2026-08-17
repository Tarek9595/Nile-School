"use client";

import { useState } from "react";
import { Award } from "lucide-react";
import {
  studentGradesFirstTerm,
  studentGradesSecondTerm,
  getGradeInfo,
  toArabicDigits,
} from "@/store";

type TermType = "first" | "second";

export default function StrudentResults() {
  const [activeTerm, setActiveTerm] = useState<TermType>("first");

  const termConfig = {
    first: {
      title: "الفصل الدراسي الأول",
      data: studentGradesFirstTerm,
    },
    second: {
      title: "الفصل الدراسي الثاني",
      data: studentGradesSecondTerm,
    },
  };

  const currentTerm = termConfig[activeTerm];

  return (
    <div className="flex flex-col gap-4 p-6 bg-white max-h-110 rounded-2xl">
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex justify-center items-center rounded-lg bg-emerald-100 text-emerald-700 shrink-0">
            <Award size={20} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-main-color text-[16px] font-extrabold">
              النتائج الدراسية
            </h1>
            <span className="text-xs font-semibold text-emerald-600">
              {currentTerm.title}
            </span>
          </div>
        </div>

        <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTerm("first")}
            className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTerm === "first"
                ? "bg-[#1e3a5f] text-white shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            الترم الأول
          </button>
          <button
            onClick={() => setActiveTerm("second")}
            className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTerm === "second"
                ? "bg-[#1e3a5f] text-white shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            الترم الثاني
          </button>
        </div>
      </div>

      <div
        data-lenis-prevent
        className="flex flex-col gap-3 overflow-y-auto pl-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent"
      >
        {currentTerm.data.map((el) => {
          const gradeInfo = getGradeInfo(el.score, el.maxScore);
          return (
            <div
              key={el.id}
              className="flex flex-col sm:flex-row justify-between items-center gap-2 rounded-lg p-3 hover:bg-slate-50 transition-colors"
            >
              <div className="flex justify-center items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#2563EB]"></div>
                <p className="text-main-color text-sm font-bold">
                  {el.subject}
                </p>
              </div>

              <div className="flex justify-center items-center gap-3">
                <div className="flex justify-center items-center gap-1 text-sm font-black text-main-color">
                  <span>
                    {toArabicDigits ? toArabicDigits(el.score) : el.score}
                  </span>
                  <span>/</span>
                  <span>
                    {toArabicDigits ? toArabicDigits(el.maxScore) : el.maxScore}
                  </span>
                </div>
                <div
                  className={`w-15 h-8 flex justify-center items-center rounded-xl text-sm font-bold ${gradeInfo.colorClass}`}
                >
                  {gradeInfo.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
