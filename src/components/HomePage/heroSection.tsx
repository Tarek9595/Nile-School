import Link from "next/link";
import { LuLayoutGrid } from "react-icons/lu";
import { FaUserCheck } from "react-icons/fa6";
import { ImUsers } from "react-icons/im";
import AuroraBackground from "@/components/Common/AuroraBackground";

export default function HeroSection() {
  return (
    <section
      className="relative w-full flex justify-center items-center py-8 sm:py-16 px-4 md:px-10 overflow-hidden"
      dir="rtl"
    >
      <AuroraBackground />

      <div className="relative z-10 w-full max-w-300 flex flex-col gap-12 sm:gap-16">
        <div className="w-full flex flex-col items-start gap-6 sm:gap-8">
          <p className="py-2 sm:py-2.5 px-5 sm:px-8 rounded-full bg-[#eff6ff] text-secondry-color text-sm sm:text-base font-semibold">
            بوابة التعلم الرقمي المتكاملة
          </p>

          <div className="flex flex-col text-3xl sm:text-5xl lg:text-[64px] xl:text-[72px] text-main-color font-bold leading-tight">
            <div className="flex gap-2 flex-wrap">
              <span>نبني عقول</span>
              <span className="text-secondry-color">تبتكر</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span>لمستقبلٍ</span>
              <span className="text-secondry-color">يزدهر</span>
            </div>
          </div>

          <p className="max-w-2xl text-base sm:text-xl lg:text-2xl text-texty-color leading-relaxed sm:leading-[1.8]">
            مرحباً بكم في مدرسة النيل الحديثة. منصة إلكترونية شاملة تربط بين
            الطالب، المعلم، وولي الأمر لضمان تجربة تعليمية متميزة تليق بجيل مصر
            القادم.
          </p>

          <Link
            href="/login"
            className="w-fit py-2.5 sm:py-3 px-6 sm:px-8 rounded-full bg-secondry-color text-white text-sm sm:text-base font-medium hover:opacity-95 transition-opacity"
          >
            تسجيل الدخول للبوابة
          </Link>
        </div>

        <div
          id="about"
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-4"
        >
          <div className="flex flex-col gap-2 p-4 sm:p-2 items-start">
            <div className="w-10 h-10 bg-secondry-color/20 text-2xl rounded-lg flex justify-center items-center">
              <ImUsers className="text-secondry-color" />
            </div>
            <span className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-main-color">
              ١,٢٥٠+
            </span>
            <h2 className="text-base sm:text-[18px] font-bold text-main-color">
              طالب وطالبة
            </h2>
            <p className="text-xs sm:text-[14px] text-texty-color">
              ملتحقون بمختلف المراحل الدراسية
            </p>
          </div>

          <div className="flex flex-col gap-2 p-4 sm:p-2 items-start">
            <div className="w-11 h-10 bg-[#4f39f6]/20 text-2xl rounded-lg flex justify-center items-center">
              <FaUserCheck className="text-[#4f39f6]" />
            </div>
            <span className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-main-color">
              ٨٥
            </span>
            <h2 className="text-base sm:text-[18px] font-bold text-main-color">
              معلم متميز
            </h2>
            <p className="text-xs sm:text-[14px] text-texty-color">
              نخبة من الكفاءات التربوية المصرية
            </p>
          </div>

          <div className="flex flex-col gap-2 p-4 sm:p-2 items-start">
            <div className="w-10 h-10 bg-[#009966]/20 text-2xl rounded-lg flex justify-center items-center">
              <LuLayoutGrid className="text-[#009966]" />
            </div>
            <span className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-main-color">
              ٤٢
            </span>
            <h2 className="text-base sm:text-[18px] font-bold text-main-color">
              فصل دراسي
            </h2>
            <p className="text-xs sm:text-[14px] text-texty-color">
              مجهزة بأحدث التقنيات التعليمية
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
