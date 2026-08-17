import { FaInstagram, FaSchool } from "react-icons/fa6";
import { MdOutlineLocalPhone } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { BsTwitterX } from "react-icons/bs";
import { LuFacebook } from "react-icons/lu";

export default function Footer() {
  return (
    <section className="w-full py-12 px-4 md:px-10 flex justify-center items-center bg-white">
      <div
        className="w-full max-w-300 flex flex-col items-center justify-center gap-8 lg:gap-12"
        dir="rtl"
      >
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 justify-between">
          <div className="flex flex-col gap-5 items-start">
            <div className="flex justify-center items-center gap-2">
              <span className="bg-main-color p-2 rounded-lg text-white">
                <FaSchool />
              </span>
              <h1 className="text-main-color font-bold text-[24px]">
                مدرسة النيل الحديثة
              </h1>
            </div>
            <p className="text-texty-color w-full max-w-[384px] text-[16px] leading-8">
              مؤسسة تعليمية رائدة تهدف إلى تقديم تعليم متميز يجمع بين الأصالة
              والمعاصرة لتنشئة جيل قادر على المنافسة عالمياً.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:gap-5 items-start">
            <h1 className="text-main-color font-bold text-[20px]">
              خدماتنا الرئيسية
            </h1>

            <span className="text-texty-color text-[16px]">بوابة المدرس</span>
            <span className="text-texty-color text-[16px]">بوابة الطالب</span>
            <span className="text-texty-color text-[16px]">
              الجداول الدراسية
            </span>
            <span className="text-texty-color text-[16px]">أنشطة متنوعة</span>
          </div>

          <div className="flex flex-col gap-4 md:gap-5 items-start">
            <h1 className="text-main-color font-bold text-[20px]" id="footer">
              تواصل معنا
            </h1>

            <div className="flex items-center gap-2">
              <IoLocationSharp className="text-2xl text-texty-color shrink-0" />
              <span className="text-texty-color text-[16px]">
                ١٢ شارع التحرير، الدقي، الجيزة، مصر
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MdOutlineLocalPhone className="text-2xl text-texty-color shrink-0" />
              <span className="text-texty-color text-[16px]" dir="ltr">
                +٢٠ ٢ ٣٣٣ ٤٤٤ ٥٥
              </span>
            </div>
            <div className="flex items-center gap-2">
              <IoMdMail className="text-2xl text-texty-color shrink-0" />
              <span className="text-texty-color text-[16px]">
                info@nilemodern.edu.eg
              </span>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col-reverse sm:flex-row justify-between items-center gap-4 px-0 md:px-8">
          <p className="text-texty-color text-[14px] md:text-[16px] text-center sm:text-right">
            © ٢٠٢٤ مدرسة النيل الحديثة. جميع الحقوق محفوظة.
          </p>
          <div className="flex justify-center items-center gap-5">
            <LuFacebook className="text-2xl text-texty-color" />
            <BsTwitterX className="text-2xl text-texty-color" />
            <FaInstagram className="text-2xl text-texty-color" />
          </div>
        </div>
      </div>
    </section>
  );
}
