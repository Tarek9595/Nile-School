import { FaSchool } from "react-icons/fa6";
import { HiOutlineMenu } from "react-icons/hi";
interface LogoProps {
  setIsSidebarOpen: (value: boolean) => void;
}

export default function Logo({ setIsSidebarOpen }: LogoProps) {
  return (
    <div className="lg:hidden bg-main-color text-white p-4 flex items-center justify-between border-b border-gray-700">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 bg-secondry-color flex justify-center items-center rounded-lg text-base">
          <FaSchool />
        </div>
        <h1 className="text-base font-bold">مدرسة النيل</h1>
      </div>
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="text-2xl text-white p-1"
      >
        <HiOutlineMenu />
      </button>
    </div>
  );
}
