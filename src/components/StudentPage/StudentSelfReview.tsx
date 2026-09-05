"use client";

import { BookMarked, Calendar, MessageSquareQuote } from "lucide-react";
import {
  getInitials,
  getGradeInfo,
  useTextHelpers,
  useStudentReviews,
} from "@/store";

export default function StudentSelfReview() {
  const { studentReviews } = useStudentReviews();
  const { monthNumberToName } = useTextHelpers();
  const isEnglish = (text: string) => /^[A-Za-z]/.test(text.trim());
  return (
    <div className="flex flex-col gap-6 p-7">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
        <div>
          <h3 className="text-xl font-extrabold text-[#1b406f]">
            تقييمات المدرسين
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            ملاحظات وتقييمات المدرسين عن أدائك الدراسي وسلوكك
          </p>
        </div>
        <div className="p-4 flex justify-center items-center rounded-xl font-bold text-blue-600 bg-blue-100 gap-2">
          <MessageSquareQuote size={16} />
          <span>{studentReviews.length} تقييمات</span>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        {studentReviews.map((el) => {
          const isEng = isEnglish(el.description);
          const gradeInfo = getGradeInfo(el.teacherGrading);
          return (
            <div
              key={el.documentId}
              className="flex items-start gap-4 bg-white rounded-2xl shadow-sm border border-slate-100 p-6"
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg shrink-0 shadow-sm ${gradeInfo.bgColor}`}
              >
                {getInitials(el.teacher)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <div>
                    <h4 className="font-extrabold text-[#1e3a5f] text-sm">
                      أ. {el.teacher}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <BookMarked size={14} />
                        {el.subject}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <Calendar size={14} />
                        {monthNumberToName(el.createdDate)}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${gradeInfo.colorClass}`}
                  >
                    {gradeInfo.label}
                  </span>
                </div>
                <p
                  dir={isEng ? "ltr" : "rtl"}
                  className={`text-sm text-slate-700 leading-relaxed mt-3 ${isEng ? "text-left" : "text-right"}`}
                >
                  {el.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
