import { BookMarked, Calendar, MessageSquareQuote } from "lucide-react";

export default function StudentSelfReview() {
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
          <span> ٦ تقييمات</span>
        </div>
      </div>

      <div>
        <div className="flex items-start gap-4 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-extrabold text-lg shrink-0 shadow-sm">
            مع
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
              <div>
                <h4 className="font-extrabold text-[#1e3a5f] text-sm">
                  أ. محمود علي
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <BookMarked size={14} />
                    الرياضيات
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <Calendar size={14} />
                    ٢٠٢٤/١٠/١٢
                  </span>
                </div>
              </div>
              <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700">
                ممتاز
              </span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed mt-3">
              عمر طالب مجتهد جداً ويشارك بفعالية في الحصة. مستواه في الجبر خلال
              الشهر الحالي ملحوظ، ويُظهر شغفاً كبيراً بالتجارب العلمية. أنصحه
              بالاستمرار على هذا النهج.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
