"use client";

import { useAudienceModal, FormattedTeacherClasses } from "@/store";
import { LuUsersRound } from "react-icons/lu";
import { TbClipboardCheck } from "react-icons/tb";
import ClassAudience from "./ClassAudience";

interface ClassCardProps {
  classItem: FormattedTeacherClasses;
  subject?: string;
}

export default function ClassCard({ classItem, subject }: ClassCardProps) {
  const { showModal, setModal } = useAudienceModal();
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-lg font-extrabold text-[#1e3a5f]">
            فصل {classItem.name}
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">{classItem.stage}</p>
        </div>
        <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1.5 rounded-lg">
          {subject}
        </span>
      </div>

      <div className="space-y-2.5 mb-4">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <LuUsersRound className="w-4 h-4 text-slate-400" />
          <span>عدد الطلاب:</span>
          <span className="font-bold text-[#1e3a5f]">
            {classItem.studentCount} طالب
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-slate-500 font-semibold">نسبة الحضور</span>
          <span className="font-bold text-emerald-600">٩٦٪</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill bg-emerald-500 h-2 rounded-sm"
            style={{ width: `${96}%` }}
          />
        </div>
      </div>

      <div className="flex gap-2 pt-4 border-t border-slate-100">
        <button
          className="flex items-center justify-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-100 transition-colors cursor-pointer"
          onClick={() => setModal(true)}
        >
          <TbClipboardCheck className="w-4 h-4" />
          تسجيل الحضور
        </button>
      </div>
      {showModal && <ClassAudience />}
    </div>
  );
}
