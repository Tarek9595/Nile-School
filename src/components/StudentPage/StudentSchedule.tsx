"use client";
import { days, useSchedule, subjectColors } from "@/store";
import { CalendarDays } from "lucide-react";

export default function StudentSchedule() {
  const { schedule } = useSchedule();

  const periods = schedule.find((item) => item.day == "الاحد")?.periods;

  const sortedPeriods = periods?.slice().sort((a, b) => {
    const numA = Number(
      a.period.replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d))),
    );
    const numB = Number(
      b.period.replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d))),
    );
    return numA - numB;
  });

  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-xl font-extrabold text-[#1e3a5f]">جدول الحصص</h3>
          <p
            className="text-sm text-slate-500 mt-1 cursor-pointer"
            onClick={() => {
              console.log(schedule);
            }}
          >
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
            {sortedPeriods?.map((el) => {
              return (
                <tr key={el.time}>
                  <td className="p-2 text-center text-xs bg-slate-50 font-bold text-slate-700 sticky right-0 z-10">
                    <div>الحصه {el.period}</div>
                    <div className="text-[10px] text-slate-400 font-normal mt-0.5">
                      {el.time}
                    </div>
                  </td>

                  {days.map((day) => {
                    const daySchedule = schedule.find((s) => s.day === day);
                    const slot = daySchedule?.periods.find(
                      (s) => s.period === el.period,
                    );

                    const subjectName =
                      slot?.subject !== "غير محدد" ? slot?.subject : "فسحه";

                    const style = subjectColors[subjectName || ""] || {
                      bg: "bg-white",
                      text: "text-slate-700",
                    };

                    return (
                      <td
                        key={day}
                        className={`p-3 text-center text-xs font-bold transition-colors ${style.bg}`}
                        onClick={() => console.log(slot)}
                      >
                        <span
                          className={
                            slot?.subject !== "غير محدد"
                              ? `font-extrabold ${style.text}`
                              : "text-[11px] font-normal text-slate-500"
                          }
                        >
                          {subjectName}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
