import PrevHomeworks from "@/components/TeacherPage/TeacherAssignments/PrevHomeworks";
import Homeworks from "@/components/TeacherPage/TeacherPanal/Homeworks";

export default function AssignmentsPage() {
  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-extrabold text-main-color">
          الواجبات المدرسية
        </h3>
        <p className="text-sm text-texty-color">
          إدارة وتتبّع الواجبات المدرسية لجميع الفصول
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-2 ">
          <Homeworks />
        </div>
        <div
          data-lenis-prevent
          className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-y-auto max-h-[calc(100vh-160px)] gap-10 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent"
        >
          <PrevHomeworks />
        </div>
      </div>
    </div>
  );
}
