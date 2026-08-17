import { useAudienceModal } from "@/store";
import Audience from "../TeacherPanal/Audience";

export default function ClassAudience() {
  const { setModal } = useAudienceModal();
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-main-color/3"
      onClick={() => setModal(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
        className="bg-white rounded-2xl  w-full max-w-3xl max-h-[88vh] overflow-hidden flex flex-col"
      >
        <Audience />
      </div>
    </div>
  );
}
