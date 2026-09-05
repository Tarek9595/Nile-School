"use client";

import { FileSpreadsheet, GraduationCap, Library } from "lucide-react";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { getGradeInfo, useTextHelpers, useStudentGrades } from "@/store";

type TermType = "first" | "second";

export default function StudentSelfResult() {
  const { studentGrades } = useStudentGrades();
  const { toArabicDigits } = useTextHelpers();
  const [selectedTerm, setSelectedTerm] = useState<TermType>("first");

  const currentTermGrades = studentGrades.filter((item) =>
    selectedTerm === "first"
      ? item.term === "term_one"
      : item.term === "term_two",
  );

  const termTitle =
    selectedTerm === "first" ? "الفصل الدراسي الأول" : "الفصل الدراسي الثاني";

  const totalScore = currentTermGrades.reduce(
    (acc, curr) => acc + curr.final_score,
    0,
  );

  const totalMaxScore = currentTermGrades.reduce(
    (acc, curr) => acc + (curr.total_score || 50),
    0,
  );

  const subjectsCount = currentTermGrades.length;

  const averagePercentage =
    totalMaxScore > 0 ? Math.round((totalScore / totalMaxScore) * 100) : 0;

  const formattedPercentage = toArabicDigits
    ? `${toArabicDigits(averagePercentage)}٪`
    : `${averagePercentage}%`;

  const formattedScoreText = toArabicDigits
    ? `${toArabicDigits(totalScore)} / ${toArabicDigits(totalMaxScore)}`
    : `${totalScore} / ${totalMaxScore}`;

  const formattedSubjectsCount = toArabicDigits
    ? toArabicDigits(subjectsCount)
    : subjectsCount;

  const titles = [
    {
      title: "المعدل العام",
      value: formattedPercentage,
      icon: <GraduationCap />,
      colors: "bg-blue-100 text-blue-600 ",
    },
    {
      title: "إجمالي الدرجات",
      value: formattedScoreText,
      icon: <FileSpreadsheet />,
      colors: "bg-emerald-100 text-emerald-600 ",
    },
    {
      title: "عدد المواد",
      value: formattedSubjectsCount,
      icon: <Library />,
      colors: "bg-amber-100 text-amber-600 ",
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-7">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
        <div>
          <h3 className="text-xl font-extrabold text-[#1b406f]">
            نتائج الاختبارات
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            درجاتك في جميع المواد الدراسية
          </p>
        </div>

        <div className="relative inline-block min-w-52">
          <select
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value as TermType)}
            className="w-full appearance-none bg-[#1e3a5f] text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#162d4a] transition-colors duration-200 cursor-pointer pr-4 pl-10 focus:outline-none"
          >
            <option value="first" className="bg-white text-main-color py-1">
              الفصل الدراسي الأول
            </option>
            <option value="second" className="bg-white text-main-color py-1">
              الفصل الدراسي الثاني
            </option>
          </select>

          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-white">
            <MdKeyboardArrowDown className="text-xl" />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-3 w-full">
        {titles.map((el, i) => (
          <div
            key={i}
            className={`w-full md:w-1/3 flex justify-between items-center rounded-xl p-7 font-extrabold ${el.colors}`}
          >
            <div>
              <p className="text-xs opacity-80">{el.title}</p>
              <p className="text-2xl">{el.value}</p>
            </div>
            {el.icon}
          </div>
        ))}
      </div>

      <h4 className="text-sm font-bold text-slate-600 mb-4">
        درجات المواد — {termTitle}
      </h4>

      <div className="flex flex-col gap-7">
        {currentTermGrades.length === 0 ? (
          <p className="text-center text-slate-500 py-10">
            لا توجد درجات مضافة لهذا الفصل الدراسي
          </p>
        ) : (
          currentTermGrades.map((el) => {
            const maxScore = el.total_score || 50;
            const studentTotalFinalScore =
              el.perform_score + el.midterm_score + el.final_score;
            const gradeInfo = getGradeInfo({
              score: studentTotalFinalScore,
              maxScore,
            });
            const itemPercentage = Math.round(
              (el.final_score / maxScore) * 100,
            );

            return (
              <div
                key={el.id}
                className="flex flex-col md:grid md:grid-cols-[1fr_1.5fr_1fr] items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all"
              >
                <div className="flex justify-start items-center gap-4 w-fit self-start md:self-center">
                  <div
                    className={`w-1.5 h-12 rounded-full shrink-0 ${gradeInfo.bgColor}`}
                  ></div>
                  <div className="flex flex-col gap-1.5">
                    <h5
                      className="font-bold text-slate-800 text-sm"
                      onClick={() => console.log(studentGrades)}
                    >
                      {el.subject}
                    </h5>
                    <p className="text-xs text-slate-500">أ / {el.teacher}</p>
                  </div>
                </div>

                <div className="flex justify-between gap-6 md:justify-center w-full md:w-auto">
                  <div className="flex items-center">
                    <div className="flex flex-col items-center justify-center sm:p-2 rounded-lg">
                      <h5
                        className="font-bold text-slate-800 text-sm text-center mb-1"
                        onClick={() => console.log(studentGrades)}
                      >
                        اعمال السنة
                      </h5>
                      <div className="flex justify-center items-center gap-1">
                        <span
                          className={`text-lg font-extrabold ${gradeInfo.textColor}`}
                        >
                          {toArabicDigits
                            ? toArabicDigits(el.perform_score)
                            : el.perform_score}
                        </span>
                        <span>/</span>
                        <span className="text-texty-color text-sm font-bold">
                          {toArabicDigits
                            ? toArabicDigits(el.perform_total_score)
                            : el.perform_total_score}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex flex-col items-center justify-center sm:p-2 rounded-lg">
                      <h5 className="font-bold text-slate-800 text-sm text-center mb-1">
                        الاختبار النصفي
                      </h5>
                      <div className="flex justify-center items-center gap-1">
                        <span
                          className={`text-lg font-extrabold ${gradeInfo.textColor}`}
                        >
                          {toArabicDigits
                            ? toArabicDigits(el.midterm_score)
                            : el.midterm_score}
                        </span>
                        <span>/</span>
                        <span className="text-texty-color text-sm font-bold">
                          {toArabicDigits
                            ? toArabicDigits(el.midterm_total_score)
                            : el.midterm_total_score}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex flex-col items-center justify-center sm:p-2 rounded-lg">
                      <h5 className="font-bold text-slate-800 text-sm text-center mb-1">
                        الاختبار النهائي
                      </h5>
                      <div className="flex justify-center items-center gap-1">
                        <span
                          className={`text-lg font-extrabold ${gradeInfo.textColor}`}
                        >
                          {toArabicDigits
                            ? toArabicDigits(el.final_score)
                            : el.final_score}
                        </span>
                        <span>/</span>
                        <span className="text-texty-color text-sm font-bold">
                          {toArabicDigits
                            ? toArabicDigits(el.final_total_score)
                            : el.final_total_score}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between md:justify-end items-center gap-4 w-full">
                  <div className="hidden sm:block flex-1 max-w-30">
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${gradeInfo.bgColor}`}
                        style={{ width: `${itemPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-center items-center gap-1">
                    <span
                      className={`text-lg font-extrabold ${gradeInfo.textColor}`}
                    >
                      {toArabicDigits
                        ? toArabicDigits(studentTotalFinalScore)
                        : studentTotalFinalScore}
                    </span>
                    <span>/</span>
                    <span className="text-texty-color text-sm font-bold">
                      {toArabicDigits ? toArabicDigits(maxScore) : maxScore}
                    </span>
                  </div>

                  <div
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 ${gradeInfo.colorClass}`}
                  >
                    {gradeInfo.label}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
