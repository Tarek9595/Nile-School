import { FileSpreadsheet, GraduationCap, Library } from "lucide-react";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function StudentSelfResult() {
  const titles = [
    {
      title: "المعدل العام",
      value: "٩٣٪",
      icon: <GraduationCap />,
      colors: "bg-blue-100 text-blue-600 ",
    },
    {
      title: "إجمالي الدرجات",
      value: "٣٧٠ / ٤٠٠",
      icon: <FileSpreadsheet />,
      colors: "bg-emerald-100 text-emerald-600 ",
    },
    {
      title: "عدد المواد",
      value: "٨",
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
          <select className="w-full appearance-none bg-[#1e3a5f] text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#162d4a] transition-colors duration-200 cursor-pointer pr-4 pl-10 focus:outline-none">
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
        درجات المواد — الفصل الدراسي الثاني
      </h4>

      <div className="flex flex-col gap-7">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all">
          <div className="flex justify-center items-center gap-6">
            <div className="w-1.5 h-12 rounded-full bg-blue-500 shrink-0"></div>
            <div className="flex-1 flex flex-col gap-1.5">
              <h5 className="font-bold text-slate-800 text-sm">
                اللغة العربية
              </h5>
              <p className="text-xs text-slate-500 mt-0.5">أ. هاني كمال</p>
            </div>
          </div>

          <div className="flex justify-center items-center gap-6">
            <div className="hidden sm:block w-32 shrink-0">
              <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 bg-blue-500"
                  style={{ width: "92%" }}
                ></div>
              </div>
            </div>
            <div className="text-left shrink-0">
              <p className="text-lg font-extrabold text-blue-600">
                ٤٦
                <span className="text-slate-400 text-sm font-bold"> / ٥٠</span>
              </p>
            </div>
            <div className="px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 bg-emerald-50 text-emerald-700">
              ممتاز
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
