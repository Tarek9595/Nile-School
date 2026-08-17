import { LucideBookOpenText } from "lucide-react";
import { studentHomeWork } from "@/store";

export default function StudentHomeworks() {
  return (
    <div className="flex flex-col gap-4 p-6 bg-white max-h-110">
      <div className="flex gap-1.5 shrink-0">
        <div className="w-8 h-8 flex justify-center items-center rounded-lg bg-secondry-color/20 text-secondry-color">
          <LucideBookOpenText size={20} />
        </div>
        <h1 className="text-main-color text-[18px] font-black">
          الواجبات المدرسية
        </h1>
      </div>

      <div
        data-lenis-prevent
        className="flex flex-col gap-3 overflow-y-auto pl-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent"
      >
        {studentHomeWork.map((el) => (
          <div
            key={el.id}
            className="flex flex-col sm:flex-row justify-between items-center gap-2 rounded-lg p-3 bg-[#F8FAFC] shadow-sm"
          >
            <div className="flex justify-center items-center gap-1">
              <div className="w-12 h-12 flex flex-col bg-white justify-center items-center rounded-lg">
                <h1 className="text-second-texty-color text-[10px] font-bold">
                  {el.month}
                </h1>
                <h2 className="text-main-color text-sm font-black">{el.day}</h2>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-main-color text-sm font-bold">{el.title}</p>
                <p className="flex justify-center items-center gap-0.5 text-second-texty-color text-[12px]">
                  <span>{el.subject}</span>
                  <span>{el.teacher}</span>
                </p>
              </div>
            </div>
            <div
              className={`w-15 h-8 flex justify-center items-center rounded-xl text-[10px] font-bold border border-dashed ${
                el.isDeliver
                  ? "text-emerald-600 bg-emerald-100 border-emerald-600"
                  : "text-rose-600 bg-rose-100 border-rose-600"
              }`}
            >
              {el.isDeliver ? "تم التسليم" : "لم يسلم"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
