"use client";

import { useState } from "react";
import axios from "axios";
import GradeInput from "./GradeInput";
import {
  domain,
  useStudentGrades,
  useTeacherClasses,
  useTsData,
} from "@/store";

type TermType = "first" | "second";

export default function MonitorGrades() {
  const { TeacherClasses } = useTeacherClasses();
  const { studentGrades, setStudentGrades } = useStudentGrades();
  const { token } = useTsData();

  const [activeTerm, setActiveTerm] = useState<TermType>("first");

  // 1. استخدام state فقط للتعديلات المؤقتة (null تعني أنه لم يقم المعلم بالتعديل بعد)
  const [editedGrades, setEditedGrades] = useState<
    Record<string, Partial<(typeof studentGrades)[0]>>
  >({});
  const [isSaving, setIsSaving] = useState(false);

  // 2. تصفية الدرجات حسب الترم المختار أثناء الرندر مباشرة (Derived State)
  const currentTermGrades = studentGrades
    .filter((item) =>
      activeTerm === "first"
        ? item.term === "term_one"
        : item.term === "term_two",
    )
    .map((item) => ({
      ...item,
      // إذا كان هناك تعديل محلي للطالب، نطبقه على البيانات الحالية
      ...(editedGrades[item.documentId] || {}),
    }));

  const termTitle =
    activeTerm === "first" ? "الفصل الدراسي الأول" : "الفصل الدراسي الثاني";

  // 3. تحديث التعديل المحلي للـ Input
  const handleGradeChange = (
    documentId: string,
    field: "midterm_score" | "perform_score" | "final_score",
    value: number | null,
  ) => {
    setEditedGrades((prev) => ({
      ...prev,
      [documentId]: {
        ...prev[documentId],
        [field]: value ?? 0,
      },
    }));
  };

  // 4. إلغاء التعديلات
  const handleCancel = () => {
    setEditedGrades({});
  };

  // 5. حفظ الدرجات إلى Strapi
  const handleSaveGrades = async () => {
    if (Object.keys(editedGrades).length === 0) return;

    setIsSaving(true);
    try {
      const updatePromises = currentTermGrades
        .filter((g) => editedGrades[g.documentId]) // نرسل فقط الطلاب الذين تم تعديلهم
        .map((g) => {
          const updateUrl = `${domain}api/ts-grades/${g.documentId}`;
          const payload = {
            data: {
              midterm_score: g.midterm_score,
              perform_score: g.perform_score,
              final_score: g.final_score,
            },
          };

          return axios.put(updateUrl, payload, {
            headers: { Authorization: `Bearer ${token}` },
          });
        });

      await Promise.all(updatePromises);

      // تحديث الـ Store بالبيانات الجديدة وتفريغ التعديلات المؤقتة
      setStudentGrades(
        studentGrades.map((sg) => {
          const edited = editedGrades[sg.documentId];
          return edited ? { ...sg, ...edited } : sg;
        }),
      );

      setEditedGrades({});
      alert("تم حفظ الدرجات بنجاح!");
    } catch (error) {
      console.error("Error saving grades:", error);
      alert("حدث خطأ أثناء حفظ الدرجات، يرجى المحاولة مرة أخرى.");
    } finally {
      setIsSaving(false);
    }
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
            {termTitle} {TeacherClasses[0]?.name}
          </p>
        </div>
        <div className="flex gap-5">
          <div className="flex justify-center items-center gap-3">
            <button
              onClick={() => {
                setActiveTerm("first");
                setEditedGrades({}); // تصفير التعديلات غير المحفوظة عند التنقل بين الأترام
              }}
              className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTerm === "first"
                  ? "bg-[#1e3a5f] text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              الترم الأول
            </button>
            <button
              onClick={() => {
                setActiveTerm("second");
                setEditedGrades({});
              }}
              className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTerm === "second"
                  ? "bg-[#1e3a5f] text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              الترم الثاني
            </button>
          </div>
          <div className="flex justify-center items-center gap-3">
            <button
              onClick={handleCancel}
              className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium text-sm hover:bg-slate-400 hover:text-slate-100 transition-colors duration-200 cursor-pointer"
            >
              إلغاء
            </button>
            <button
              onClick={handleSaveGrades}
              disabled={isSaving}
              className="bg-[#15223e] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-main-color transition-colors duration-200 cursor-pointer disabled:opacity-50"
            >
              {isSaving ? "جاري الحفظ..." : "حفظ الدرجات"}
            </button>
          </div>
        </div>
      </div>

      {currentTermGrades.length === 0 ? (
        <p className="text-center text-slate-500 py-6 text-xs">
          لا توجد درجات مضافة لهذا الفصل الدراسي
        </p>
      ) : (
        <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-200/80 shadow-sm bg-white">
          <table className="w-full text-sm min-w-162.5">
            <thead>
              <tr className="bg-slate-50 text-slate-600">
                <th className="p-3 font-bold text-center">اسم الطالب</th>
                <th className="p-3 font-bold text-center">الاختبار النصفي</th>
                <th className="p-3 font-bold text-center">أعمال السنة</th>
                <th className="p-3 font-bold text-center">الاختبار النهائي</th>
                <th className="p-3 font-bold text-center">المجموع</th>
              </tr>
            </thead>
            <tbody>
              {currentTermGrades.map((g) => {
                const total =
                  (g.midterm_score || 0) +
                  (g.perform_score || 0) +
                  (g.final_score || 0);

                return (
                  <tr
                    key={g.documentId || g.id}
                    className="border-t border-slate-100 hover:bg-slate-50/60"
                  >
                    <td className="p-3 font-semibold text-slate-700 text-center">
                      {g.studentName}
                    </td>

                    {/* الاختبار النصفي */}
                    <td className="p-2 text-center">
                      <GradeInput
                        value={g.midterm_score}
                        max={g.midterm_total_score}
                        onChange={(val) =>
                          handleGradeChange(g.documentId, "midterm_score", val)
                        }
                      />
                    </td>

                    {/* أعمال السنة */}
                    <td className="p-2 text-center">
                      <GradeInput
                        value={g.perform_score}
                        max={g.perform_total_score}
                        onChange={(val) =>
                          handleGradeChange(g.documentId, "perform_score", val)
                        }
                      />
                    </td>

                    {/* الاختبار النهائي */}
                    <td className="p-2 text-center">
                      <GradeInput
                        value={g.final_score}
                        max={g.final_total_score}
                        onChange={(val) =>
                          handleGradeChange(g.documentId, "final_score", val)
                        }
                      />
                    </td>

                    {/* المجموع */}
                    <td className="p-3 text-center">
                      <span className="font-bold text-[#1e3a5f]">{total}</span>
                      <span className="text-slate-400 text-xs">
                        {" "}
                        / {g.total_score}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
