import { ClipboardList } from "lucide-react";
import HomeworkCard from "./HomeworkCard";

interface deleteProps {
  onDelete?: (id: number) => void;
}

export default function PrevHomeworks({ onDelete }: deleteProps) {
  const homework = [
    {
      id: 1,
      classId: "1/1",
      className: "فصل ١/١",
      title: "تمارين الفصل الثالث - المعادلات الخطية",
      instructions:
        "حل التمارين من رقم ١ إلى رقم ١٥ في الصفحة ٤٥، مع كتابة خطوات الحل كاملة.",
      assigned: "٢٠٢٤/١٠/٢٠",
      due: "٢٠٢٤/١٠/٢٤",
      submitted: 28,
      total: 32,
    },
    {
      id: 2,
      classId: "1/2",
      className: "فصل ١/٢",
      title: "مراجعة عامة على الكسور",
      instructions: "حل ورقة المراجعة المرفقة وإعادة كتابة القواعد الأساسية.",
      assigned: "٢٠٢٤/١٠/١٨",
      due: "٢٠٢٤/١٠/٢٢",
      submitted: 25,
      total: 30,
    },
    {
      id: 3,
      classId: "2/1",
      className: "فصل ٢/١",
      title: "بحث قصير عن الهندسة الإقليدية",
      instructions: "إعداد بحث لا يتجاوز صفحتين عن نشأة الهندسة وأهم علمائها.",
      assigned: "٢٠٢٤/١٠/١٥",
      due: "٢٠٢٤/١٠/٢٨",
      submitted: 18,
      total: 31,
    },
    {
      id: 4,
      classId: "1/3",
      className: "فصل ١/٣",
      title: "ورقة عمل: خواص الأعداد الحقيقية",
      instructions: "تحديد الخاصية المستخدمة في كل عبارة مع التبرير.",
      assigned: "٢٠٢٤/١٠/١٧",
      due: "٢٠٢٤/١٠/٢١",
      submitted: 31,
      total: 31,
    },
  ];
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ClipboardList className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-[#1e3a5f]">الواجبات السابقة</h4>
            <p className="text-xs text-slate-500">٤ واجبات تم نشرها</p>
          </div>
        </div>
      </div>

      {homework.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          <ClipboardList className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p className="text-sm">لا توجد واجبات منشورة بعد</p>
        </div>
      ) : (
        <div className="space-y-3">
          {homework.map((hw) => (
            <HomeworkCard
              key={hw.id}
              hw={hw}
              onDelete={onDelete ? () => onDelete(hw.id) : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
