import { useTsData } from "@/store";

export default function TeacherHeader() {
  const { userData } = useTsData();
  const name = userData?.fullName || "";
  const subject = userData?.ts_subject.name || "";
  return (
    <div>
      <h1 className="text-[20px] font-black"> أهلاً، أ/ {name}</h1>
      <h2 className="text-[14px] font-medium test-texty-color">
        مدرس {subject} · الفصل الدراسي الأول
      </h2>
    </div>
  );
}
