export default function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-[-10%] right-[10%] w-125 sm:w-150 h-87.5 sm:h-112.5 bg-secondry-color/30 rounded-full blur-[100px] animate-aurora" />

      <div className="absolute top-[5%] left-[5%] w-100 sm:w-137.5 h-75 sm:h-100 bg-main-color/20 rounded-full blur-[120px] animate-aurora-slow" />

      <div className="absolute top-[20%] right-[30%] w-87.5 sm:w-125 h-62.5 sm:h-87.5 bg-sky-400/20 rounded-full blur-[90px] animate-aurora" />
    </div>
  );
}
