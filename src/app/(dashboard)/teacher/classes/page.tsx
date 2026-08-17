import ClassCard from "@/components/TeacherPage/TeacherClasses/ClassCard";

export default function ClassesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-extrabold text-[#1e3a5f] mb-3">
            فصولي الدراسية
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            ٤ فصول نشطة هذا الفصل الدراسي
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
      </div>
    </div>
  );
}
