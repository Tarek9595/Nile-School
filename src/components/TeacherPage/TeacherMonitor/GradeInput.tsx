import { ChevronUp, ChevronDown } from "lucide-react";

export default function GradeInput({
  value,
  max,
  onChange,
}: {
  value: number | null;
  max: number;
  onChange: (value: number | null) => void;
}) {
  const handleIncrement = () => {
    const current = value ?? 0;
    if (current < max) {
      onChange(current + 1);
    }
  };

  const handleDecrement = () => {
    const current = value ?? 0;
    if (current > 0) {
      onChange(current - 1);
    }
  };

  return (
    <div className="relative inline-flex items-center group w-full max-w-22.5 sm:w-20">
      <input
        type="number"
        min={0}
        max={max}
        value={value ?? ""}
        placeholder="—"
        onChange={(e) => {
          const val = e.target.value;
          if (val === "") {
            onChange(null);
            return;
          }
          const num = Number(val);
          if (num >= 0 && num <= max) {
            onChange(num);
          }
        }}
        className="w-full pl-6 pr-2 text-center border border-slate-200 rounded-lg py-1.5 text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-white"
      />

      <div className="absolute left-1 flex flex-col justify-center h-full opacity-60 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          onClick={handleIncrement}
          className="text-slate-400 hover:text-blue-600 focus:outline-none p-0.5"
        >
          <ChevronUp className="w-3 h-3" />
        </button>
        <button
          type="button"
          onClick={handleDecrement}
          className="text-slate-400 hover:text-blue-600 focus:outline-none p-0.5"
        >
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
