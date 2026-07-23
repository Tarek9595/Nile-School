import Link from "next/link";
import { FaSchool } from "react-icons/fa6";

export default function header() {
  return (
    <div className="w-full py-3 px-6 gap-2.5 shadow-lg flex justify-between sticky">
      <Link
        href="/login"
        className="py-2.5 px-8 rounded-full bg-main-color text-white"
      >
        تسجيل الدخول
      </Link>
      <nav className="grow flex justify-center items-center gap-6 ">
        <Link href="#" className="text-main-color font-mediumm">
          تواصل معنا
        </Link>

        <Link href="#" className="text-main-color font-mediumm">
          الرؤية والرسالة
        </Link>

        <Link href="#" className="text-main-color font-mediumm">
          عن المدرسة
        </Link>
      </nav>
      <div className="flex justify-center items-center gap-2">
        <span className="bg-main-color p-2  rounded-lg text-white">
          <FaSchool />
        </span>
        <h1 className="text-main-color font-bold">مدرسة النيل الحديثة</h1>
      </div>
    </div>
  );
}
