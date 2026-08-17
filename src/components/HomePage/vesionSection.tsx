import Image from "next/image";
import { PiMedal } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";

export default function VesionSection() {
  return (
    <section
      id="vision"
      className="w-full bg-[#0F172A] py-12 px-4 md:px-10 flex justify-center items-center"
    >
      <div className="w-full max-w-300 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
        <div className="relative w-full max-w-xl aspect-576/324 rounded-2xl shrink-0">
          <Image
            src="/class.png"
            alt="رؤيتنا للتعليم"
            fill
            sizes="(max-width: 768px) 100vw, 576px"
            className="object-cover"
            priority
          />

          <div className="absolute -bottom-2.5 -right-1.25 sm:-bottom-5 sm:-right-10 z-10 w-20 h-17 sm:w-30 sm:h-26.25 bg-secondry-color flex flex-col justify-center items-center rounded-xl text-white">
            <span className="text-[12px] sm:text-[14px]">تأسست عام</span>
            <span className="text-lg sm:text-2xl font-bold">٢٠٠٥</span>
          </div>
        </div>

        <div
          className="w-full max-w-xl flex flex-col justify-between text-white gap-6"
          dir="rtl"
        >
          <h2 className="text-[20 px] sm:text-[36px] font-bold">
            رؤيتنا للتعليم في الجمهورية الجديدة
          </h2>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex justify-center items-center text-xl rounded-full bg-secondry-color/20 text-secondry-color">
                  <PiMedal />
                </div>
                <h3 className="text-[16px] sm:text-[20px] font-bold">
                  التميز الأكاديمي
                </h3>
              </div>
              <p className="text-[12px] sm:text-[16px] text-second-texty-color">
                نطبق أحدث معايير وزارة التربية والتعليم مع دمج التكنولوجيا في كل
                حصة دراسية.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex justify-center items-center text-xl rounded-full bg-[#00D492]/20 text-[#00D492]">
                  <FaRegHeart />
                </div>
                <h3 className="text-[16px] sm:text-[20px] font-bold">
                  بناء الشخصية
                </h3>
              </div>
              <p className="text-[12px] sm:text-[16px] text-second-texty-color">
                نهتم بالجانب الأخلاقي والمهاري للطلاب بجانب التفوق العلمي.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
