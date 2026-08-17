import { days, toArabicDigits, periodTimes, schedule } from "@/store";
import { CalendarDays } from "lucide-react";

const slotColors: Record<
  string,
  { bg: string; title: string; subtitle: string }
> = {
  "1/1": {
    bg: "bg-blue-50/80",
    title: "text-blue-900",
    subtitle: "text-blue-600",
  },
  "1/2": {
    bg: "bg-emerald-50/80",
    title: "text-emerald-900",
    subtitle: "text-emerald-600",
  },
  "1/3": {
    bg: "bg-rose-50/80",
    title: "text-rose-900",
    subtitle: "text-rose-600",
  },
  "2/1": {
    bg: "bg-amber-50/80",
    title: "text-amber-900",
    subtitle: "text-amber-600",
  },
  "2/2": {
    bg: "bg-purple-50/80",
    title: "text-purple-900",
    subtitle: "text-purple-600",
  },
  "2/3": {
    bg: "bg-indigo-50/80",
    title: "text-indigo-900",
    subtitle: "text-indigo-600",
  },
  "3/1": {
    bg: "bg-teal-50/80",
    title: "text-teal-900",
    subtitle: "text-teal-600",
  },
  "3/2": {
    bg: "bg-cyan-50/80",
    title: "text-cyan-900",
    subtitle: "text-cyan-600",
  },
  "3/3": {
    bg: "bg-orange-50/80",
    title: "text-orange-900",
    subtitle: "text-orange-600",
  },
};

export default function TeacherSchedule() {
  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-xl font-extrabold text-[#1e3a5f]">
            الجدول الدراسي
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            الأسبوع الدراسي — من الأحد إلى الخميس
          </p>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl">
          <CalendarDays className="w-4 h-4" />
          <span className="text-sm font-bold">
            {toArabicDigits(13)} حصص أسبوعياً
          </span>
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
            {periodTimes.map((e, i) => (
              <tr key={i}>
                <td className="p-2 text-center text-xs bg-slate-50 font-bold text-slate-700 sticky right-0 z-10">
                  <div>{e.period}</div>
                  <div className="text-[10px] text-slate-400 font-normal mt-0.5">
                    {e.time}
                  </div>
                </td>

                {days.map((d) => {
                  const daySchedule = schedule.find((s) => s.day === d);
                  const slot = daySchedule?.slots.find(
                    (s) => s.period === e.period,
                  );

                  const colors = slot
                    ? slotColors[slot.classId] || {
                        bg: "bg-slate-100",
                        title: "text-slate-800",
                        subtitle: "text-slate-500",
                      }
                    : null;

                  return (
                    <td
                      key={d}
                      className={`p-2 text-center text-xs font-bold transition-colors ${
                        colors ? colors.bg : "bg-white text-slate-300"
                      }`}
                    >
                      {slot && colors ? (
                        <>
                          <div className={`font-extrabold ${colors.title}`}>
                            {slot.className}
                          </div>
                          <div
                            className={`text-[10px] font-medium mt-0.5 ${colors.subtitle}`}
                          >
                            {slot.room}
                          </div>
                        </>
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
