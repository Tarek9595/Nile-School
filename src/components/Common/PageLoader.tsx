"use client";
import { useLoader } from "@/store";
import { FaSchool } from "react-icons/fa6";

export default function PageLoader() {
  const { isLoading } = useLoader();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-99999 bg-white/90 backdrop-blur-md flex flex-col justify-center items-center gap-4 transition-all duration-300">
      <div className="relative flex justify-center items-center">
        <div className="w-20 h-20 border-4 border-main-color/20 border-t-main-color rounded-full animate-spin"></div>
        <div className="absolute bg-main-color p-3 rounded-xl text-white text-xl animate-pulse">
          <FaSchool />
        </div>
      </div>
      <p className="text-main-color font-bold text-lg animate-pulse">
        جاري التحميل...
      </p>
    </div>
  );
}
