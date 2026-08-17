import Audience from "./Audience";
import Evaluation from "./Evaluation";
import Homeworks from "./Homeworks";

export default function controlPanal() {
  return (
    <>
      <Audience />
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Homeworks />
        <Evaluation />
      </div>
    </>
  );
}
