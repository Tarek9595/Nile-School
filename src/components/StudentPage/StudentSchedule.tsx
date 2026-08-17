import { days, studentPeriodTimes, studentSchedule } from "@/store";
import { CalendarDays } from "lucide-react";

const subjectColors: Record<string, { bg: string; text: string }> = {
  "لغة عربية": { bg: "bg-emerald-50", text: "text-emerald-600" },
  رياضيات: { bg: "bg-blue-50", text: "text-blue-600" },
  علوم: { bg: "bg-amber-50", text: "text-amber-600" },
  دراسات: { bg: "bg-rose-50", text: "text-rose-600" },
  إنجليزي: { bg: "bg-purple-50", text: "text-purple-600" },
  "تربية دينية": { bg: "bg-teal-50", text: "text-teal-600" },
  "تربية فنية": { bg: "bg-orange-50", text: "text-orange-600" },
  "تربية رياضية": { bg: "bg-lime-50", text: "text-lime-600" },
  "حاسب آلي": { bg: "bg-sky-50", text: "text-sky-600" },
  نشاط: { bg: "bg-fuchsia-50", text: "text-fuchsia-600" },
  فسحة: { bg: "bg-slate-50", text: "text-slate-300" },
};

export default function StudentSchedule() {
  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-xl font-extrabold text-[#1e3a5f]">جدول الحصص</h3>
          <p className="text-sm text-slate-500 mt-1">
            الأسبوع الدراسي — من الأحد إلى الخميس
          </p>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl">
          <CalendarDays className="w-4 h-4" />
          <span className="text-sm font-bold">٥ أيام • ٧ حصص يومياً</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-1 bg-slate-200">
          <thead>
            <tr>
              <th className="p-2 text-center text-xs bg-[#1e3a5f] text-white font-bold sticky right-0 z-10 min-w-27.5">
                الحصة \ اليوم
              </th>
              {days.map((d) => (
                <th
                  key={d}
                  className="p-2 text-center text-xs bg-[#1e3a5f] text-white font-bold min-w-35"
                >
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {studentPeriodTimes.map((e, i) => (
              <tr key={i}>
                <td className="p-2 text-center text-xs bg-slate-50 font-bold text-slate-700 sticky right-0 z-10">
                  <div>{e.period}</div>
                  <div className="text-[10px] text-slate-400 font-normal mt-0.5">
                    {e.time}
                  </div>
                </td>

                {days.map((d) => {
                  const daySchedule = studentSchedule.find((s) => s.day === d);
                  const slot = daySchedule?.slots.find(
                    (s) => s.period === e.period,
                  );

                  const colors = slot ? subjectColors[slot.subject] : null;

                  return (
                    <td
                      key={d}
                      className={`p-3 text-center text-xs font-bold transition-colors ${
                        colors ? colors.bg : "bg-white"
                      }`}
                    >
                      {slot ? (
                        <span className={`font-extrabold ${colors?.text}`}>
                          {slot.subject}
                        </span>
                      ) : (
                        <span className="text-[11px] font-normal text-slate-300">
                          —
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
