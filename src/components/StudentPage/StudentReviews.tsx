import { CiChat1 } from "react-icons/ci";
import { teacherReviews, getInitials, getGradeInfo } from "@/store";

export default function StudentReviews() {
  const isEnglish = (text: string) => /^[A-Za-z]/.test(text.trim());
  return (
    <div className="flex flex-col gap-4 p-6 bg-white">
      <div className="flex gap-3 items-center">
        <div className="w-10 h-10 bg-amber-50 text-amber-600 text-xl rounded-lg flex justify-center items-center">
          <CiChat1 />
        </div>
        <h1 className="text-main-color text-[18px] font-black">
          تقييمات المدرسين الأخيرة
        </h1>
      </div>

      <div
        data-lenis-prevent
        className="grid grid-cols-1 gap-3 max-h-35 lg:grid-cols-2 overflow-y-auto pl-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent"
      >
        {teacherReviews.map((el) => {
          const isEng = isEnglish(el.review);
          const gradeInfo = getGradeInfo(el.score, el.maxScore);
          return (
            <div
              key={el.id}
              className="flex flex-col gap-4 rounded-lg p-3 bg-[#F8FAFC] shadow-sm"
            >
              <div className="flex justify-between items-center gap-2">
                <div className="flex justify-center items-center gap-3">
                  <div
                    className={`w-12 h-12 flex flex-col justify-center items-center rounded-full text-[14px] font-bold ${gradeInfo.colorClass}`}
                  >
                    {getInitials(el.teacher)}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <p className="text-main-color text-sm font-bold">
                      أ/ {el.teacher}
                    </p>
                    <p className="flex justify-center items-center gap-0.5 text-second-texty-color text-[12px]">
                      مدرس {el.subject}
                    </p>
                  </div>
                </div>
                <div className="text-second-texty-color text-[10px] font-medium">
                  {el.date}
                </div>
              </div>
              <div
                dir={isEng ? "ltr" : "rtl"}
                className={`text-texty-color text-[14px] ${
                  isEng ? "text-left" : "text-right"
                }`}
              >
                {el.review}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
