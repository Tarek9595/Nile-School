import StrudentResults from "./StudentResults";
import StudentHomeworks from "./StudentHomeworks";
import StudentSchedule from "./StudentSchedule";
import StudentReviews from "./StudentReviews";

export default function StudentCPanal() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
      <div className="lg:col-span-2 rounded-2xl shadow-sm border border-gray-100">
        <StudentSchedule />
      </div>

      <div className="col-span-1 rounded-2xl shadow-sm border border-gray-100 ">
        <StudentHomeworks />
      </div>

      <div className="col-span-1 rounded-2xl shadow-sm border border-gray-100">
        <StrudentResults />
      </div>

      <div className="lg:col-span-2 rounded-2xl shadow-sm border border-gray-100">
        <StudentReviews />
      </div>
    </div>
  );
}
