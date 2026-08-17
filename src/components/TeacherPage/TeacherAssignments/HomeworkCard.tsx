import { toArabicDigits } from "@/store";
import { CheckCircle2, Clock, Trash2 } from "lucide-react";

interface HomeworkItem {
  id: number;
  classId: string;
  className: string;
  title: string;
  instructions: string;
  assigned: string;
  due: string;
  submitted: number;
  total: number;
}

export default function HomeworkCard({
  hw,
  onDelete,
}: {
  hw: HomeworkItem;
  onDelete?: () => void;
}) {
  const rate = hw.total ? Math.round((hw.submitted / hw.total) * 100) : 0;
  const done = hw.submitted === hw.total;

  return (
    <div className="border border-slate-100 rounded-xl p-4 hover:border-slate-200 hover:shadow-sm transition-all">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2.5 py-1 rounded-lg">
              {hw.className}
            </span>
            {done && (
              <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                مكتمل
              </span>
            )}
          </div>
          <h5 className="font-bold text-slate-800 text-sm leading-snug">
            {hw.title}
          </h5>
        </div>
        <button
          onClick={onDelete}
          className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">
        {hw.instructions}
      </p>

      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-3">
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          التسليم: {hw.due}
        </span>
        <span className="text-slate-300">•</span>
        <span>النشر: {hw.assigned}</span>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-500 font-semibold">
              تم تسليم {toArabicDigits(hw.submitted)} من{" "}
              {toArabicDigits(hw.total)}
            </span>
            <span className="font-bold text-[#1e3a5f]">
              {toArabicDigits(rate)}٪
            </span>
          </div>
          <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${done ? "bg-emerald-500" : "bg-blue-500"}`}
              style={{ width: `${rate}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
