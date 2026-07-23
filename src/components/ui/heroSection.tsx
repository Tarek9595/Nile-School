import Link from "next/link";
import { LuLayoutGrid } from "react-icons/lu";
import { FaUserCheck } from "react-icons/fa6";
import { ImUsers } from "react-icons/im";

export default function heroSection() {
  return (
    <div className="w-full flex flex-col gap-16  p-12 " dir="rtl">
      <div className="w-full pr-45">
        <div className="flex flex-col gap-8">
          <p className="w-fit py-2.5 px-8 rounded-full bg-[#eff6ff] text-secondry-color font-semibold">
            بوابة التعلم الرقمي المتكاملة
          </p>
          <div>
            <p className="text-[72px] text-main-color flex gap-2 font-bold">
              <span>نبني عقول</span>
              <span className="text-secondry-color">تبتكر</span>
            </p>
            <p className="text-[72px] text-main-color flex gap-2 font-bold">
              <span>لمستقبلٍ</span>
              <span className="text-secondry-color"> يزدهر</span>
            </p>
          </div>
          <p className="max-w-2xl leading-11.25 text-2xl text-texty-color">
            مرحباً بكم في مدرسة النيل الحديثة. منصة إلكترونية شاملة تربط بين
            الطالب، المعلم، وولي الأمر لضمان تجربة تعليمية متميزة تليق بجيل مصر
            القادم.
          </p>
          <Link
            href="/login"
            className="w-fit py-2.5 px-8 rounded-full bg-secondry-color text-white"
          >
            تسجيل الدخول للبوابة
          </Link>
        </div>
      </div>
      <div className="w-full flex justify-evenly items-center" dir="ltr">
        <div className="flex flex-col gap-1.5 p-2 ">
          <div className="w-10 h-10 bg-[#009966]/20 text-2xl rounded-lg flex justify-center items-center">
            <LuLayoutGrid className="text-[#009966]" />
          </div>
          <span className="text-[48px] font-bold">٤٢</span>
          <h2 className="text-[18px] text-texty-color">فصل دراسي</h2>
          <p className="text-[14px] text-texty-color">
            مجهزة بأحدث التقنيات التعليمية
          </p>
        </div>
        <div className="flex flex-col gap-1.5 p-2 ">
          <div className="w-11 h-10 bg-[#4f39f6]/20 text-2xl rounded-lg flex justify-center items-center">
            <FaUserCheck className="text-[#4f39f6]" />
          </div>
          <span className="text-[48px] font-bold">٨٥</span>
          <h2 className="text-[18px] text-texty-color">معلم متميز</h2>
          <p className="text-[14px] text-texty-color">
            نخبة من الكفاءات التربوية المصرية
          </p>
        </div>
        <div className="flex flex-col gap-1.5 p-2">
          <div className="w-10 h-10 bg-secondry-color/20 text-2xl rounded-lg flex justify-center items-center">
            <ImUsers className="text-secondry-color" />
          </div>
          <span className="text-[48px] font-bold">١,٢٥٠+</span>
          <h2 className="text-[18px] text-texty-color">طالب وطالبة</h2>
          <p className="text-[14px] text-texty-color">
            ملتحقون بمختلف المراحل الدراسية
          </p>
        </div>
      </div>
    </div>
  );
}
