import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

export const domain = "https://pos.skyready.online/";

export const periodTimes = [
  { period: "الحصة ١", time: "٠٧:٣٠ - ٠٨:١٥" },
  { period: "الحصة ٢", time: "٠٨:١٥ - ٠٩:٠٠" },
  { period: "الحصة ٣", time: "٠٩:١٥ - ١٠:٠٠" },
  { period: "الحصة ٤", time: "١٠:٠٠ - ١٠:٤٥" },
  { period: "الحصة ٥", time: "١١:٠٠ - ١١:٤٥" },
];
export interface ScheduleSlot {
  period: string;
  className: string;
  room: string;
}

export interface studentScheduleSlot {
  period: string;
  subject: string;
  isBreak?: boolean;
}

export interface studentDaySchedule {
  day: string;
  slots: studentScheduleSlot[];
}

export const studentSchedule: studentDaySchedule[] = [
  {
    day: "الأحد",
    slots: [
      { period: "الحصة ١", subject: "لغة عربية" },
      { period: "الحصة ٢", subject: "رياضيات" },
      { period: "الحصة ٣", subject: "علوم" },
      { period: "الحصة ٤", subject: "فسحة", isBreak: true },
      { period: "الحصة ٥", subject: "دراسات" },
      { period: "الحصة ٦", subject: "إنجليزي" },
      { period: "الحصة ٧", subject: "تربية دينية" },
    ],
  },
  {
    day: "الإثنين",
    slots: [
      { period: "الحصة ١", subject: "رياضيات" },
      { period: "الحصة ٢", subject: "رياضيات" },
      { period: "الحصة ٣", subject: "لغة عربية" },
      { period: "الحصة ٤", subject: "فسحة", isBreak: true },
      { period: "الحصة ٥", subject: "علوم" },
      { period: "الحصة ٦", subject: "حاسب آلي" },
      { period: "الحصة ٧", subject: "تربية فنية" },
    ],
  },
  {
    day: "الثلاثاء",
    slots: [
      { period: "الحصة ١", subject: "إنجليزي" },
      { period: "الحصة ٢", subject: "لغة عربية" },
      { period: "الحصة ٣", subject: "دراسات" },
      { period: "الحصة ٤", subject: "فسحة", isBreak: true },
      { period: "الحصة ٥", subject: "رياضيات" },
      { period: "الحصة ٦", subject: "علوم" },
      { period: "الحصة ٧", subject: "نشاط" },
    ],
  },
  {
    day: "الأربعاء",
    slots: [
      { period: "الحصة ١", subject: "علوم" },
      { period: "الحصة ٢", subject: "رياضيات" },
      { period: "الحصة ٣", subject: "إنجليزي" },
      { period: "الحصة ٤", subject: "فسحة", isBreak: true },
      { period: "الحصة ٥", subject: "دراسات" },
      { period: "الحصة ٦", subject: "لغة عربية" },
      { period: "الحصة ٧", subject: "دراسات" },
    ],
  },
  {
    day: "الخميس",
    slots: [
      { period: "الحصة ١", subject: "دراسات" },
      { period: "الحصة ٢", subject: "علوم" },
      { period: "الحصة ٣", subject: "رياضيات" },
      { period: "الحصة ٤", subject: "فسحة", isBreak: true },
      { period: "الحصة ٥", subject: "رياضيات" },
      { period: "الحصة ٦", subject: "تربية رياضية" },
      { period: "الحصة ٧", subject: "تربية رياضية" },
    ],
  },
];

export interface HomeWorkItem {
  id: number;
  month: string;
  day: string;
  title: string;
  subject: string;
  teacher: string;
  deliverDate: string;
  isDeliver: boolean;
  description: string;
}

export const studentHomeWork: HomeWorkItem[] = [
  {
    id: 1,
    month: "أكتوبر",
    day: "٠٢",
    deliverDate: "2026/10/20",
    title: "حل تمارين الجبر ص ٤٠",
    description:
      "حل جميع التمارين الفردية الخاصة بدرس المعادلات من الدرجة الثانية بالكتاب المدرسي.",
    subject: "مادة الرياضيات",
    teacher: "أ/ محمود علي",
    isDeliver: false,
  },
  {
    id: 2,
    month: "أكتوبر",
    day: "٠١",
    deliverDate: "2026/10/15",
    title: "مراجعة الفصل الرابع",
    description:
      "مراجعة أهم المفاهيم والقوانين والأسئلة الخاصة بالفصل الرابع وتحضير الأسئلة المستعصية.",
    subject: "مادة العلوم",
    teacher: "أ/ سارة أحمد",
    isDeliver: true,
  },
  {
    id: 3,
    month: "أكتوبر",
    day: "٠٢",
    deliverDate: "2026/10/18",
    title: "كتابة نص الاستماع",
    description:
      "كتابة أفكار نص الاستماع وتلخيص أهم الدروس المستفادة منه في الكشكول الخاص بالمادة.",
    subject: "مادة اللغة العربية",
    teacher: "أ/ هاني كمال",
    isDeliver: true,
  },
  {
    id: 4,
    month: "أكتوبر",
    day: "١٩",
    deliverDate: "2026/10/30",
    title: "حل خريطة الوطن العربي ص ١٥",
    description:
      "تحديد المضايق والدول والتضاريس الرئيسية على الخريطة المرفقة بكتاب الأنشطة.",
    subject: "مادة الدراسات الاجتماعية",
    teacher: "أ/ مصطفى العراقي",
    isDeliver: false,
  },
  {
    id: 5,
    month: "أكتوبر",
    day: "١٨",
    deliverDate: "2026/10/28",
    title: "Grammar Unit 8 Exercises",
    description:
      "Complete all workbook exercises on page 42 focusing on relative clauses and past tenses.",
    subject: "مادة اللغة الإنجليزية",
    teacher: "أ/ رانيا يوسف",
    isDeliver: true,
  },
  {
    id: 6,
    month: "أكتوبر",
    day: "١٧",
    deliverDate: "2026/10/27",
    title: "حفظ سورة الملك من آية ١ إلى ١٥",
    description:
      "حفظ الآيات المقررة مع مراعاة أحكام التجويد الأساسية والاستعداد للتسميع الشفهي.",
    subject: "مادة التربية الدينية",
    teacher: "أ/ عبد الرحمن السيد",
    isDeliver: true,
  },
  {
    id: 7,
    month: "أكتوبر",
    day: "١٥",
    deliverDate: "2026/10/25",
    title: "تطبيق قواعد الأشكال الهندسية",
    description:
      "حل المسائل البرهانية المتعلقة بنظريات المثلث والرباعي الدائري صفحة ٦٥.",
    subject: "مادة الهندسة",
    teacher: "أ/ محمود علي",
    isDeliver: false,
  },
  {
    id: 8,
    month: "أكتوبر",
    day: "١٤",
    deliverDate: "2026/10/24",
    title: "تقرير عن الجهاز الهضمي",
    description:
      "كتابة تقرير يتضمن مكونات الجهاز الهضمي ووظيفة كل عضو مع الاستعانة بالرسومات التوضيحية.",
    subject: "مادة العلوم",
    teacher: "أ/ سارة أحمد",
    isDeliver: true,
  },
  {
    id: 9,
    month: "أكتوبر",
    day: "١٢",
    deliverDate: "2026/10/22",
    title: "إعداد عرض تقديم في PowerPoint",
    description:
      "تصميم عرض تقديمي من ٥ شرائح يناقش تأثير التكنولوجيا الحديثة على التعليم.",
    subject: "مادة الحاسب الآلي",
    teacher: "أ/ خالد إبراهيم",
    isDeliver: false,
  },
  {
    id: 10,
    month: "أكتوبر",
    day: "١٠",
    deliverDate: "2026/10/20",
    title: "إعراب القطعة النحوية بالصفحة ٥٢",
    description:
      "استخراج الأفعال والأسماء المعربة والمبنية وإعراب الكلمات المحددة بخط واضح.",
    subject: "مادة اللغة العربية",
    teacher: "أ/ هاني كمال",
    isDeliver: true,
  },
  {
    id: 11,
    month: "أكتوبر",
    day: "٠٨",
    deliverDate: "2026/10/18",
    title: "رسم لوحة عن الطبيعة الصامتة",
    description:
      "استخدام ألوان الرصاص أو الفحم للتعبير عن الظل والنور في لوحة الطبيعة الصامتة.",
    subject: "مادة التربية الفنية",
    teacher: "أ/ نادين خالد",
    isDeliver: false,
  },
  {
    id: 12,
    month: "أكتوبر",
    day: "٠٦",
    deliverDate: "2026/10/16",
    title: "Writing Paragraph about Summer Holiday",
    description:
      "Write a short essay (100-120 words) detailing your activities and places visited during summer.",
    subject: "مادة اللغة الإنجليزية",
    teacher: "أ/ رانيا يوسف",
    isDeliver: true,
  },
  {
    id: 13,
    month: "أكتوبر",
    day: "٠٤",
    deliverDate: "2026/10/14",
    title: "تلخيص درس ثورة ١٩١٩",
    description:
      "تلخيص أسباب الثورة وأهم أحداثها ونتائجها في نقاط محددة ومنظمة.",
    subject: "مادة الدراسات الاجتماعية",
    teacher: "أ/ مصطفى العراقي",
    isDeliver: true,
  },
  {
    id: 14,
    month: "أكتوبر",
    day: "٠٣",
    deliverDate: "2026/10/13",
    title: "مسائل الاحتمالات والإحصاء",
    description:
      "حل تمارين الدرس الأخير من وحدة الإحصاء الخاصة بتجربة إلقاء حجر النرد والعملات.",
    subject: "مادة الرياضيات",
    teacher: "أ/ محمود علي",
    isDeliver: false,
  },
  {
    id: 15,
    month: "أكتوبر",
    day: "٠١",
    deliverDate: "2026/10/11",
    title: "بحث قصير عن التفاعلات الكيميائية",
    description:
      "إعداد بحث من صفحتين يشرح أنواع التفاعلات الكيميائية وتطبيقاتها في الحياة اليومية.",
    subject: "مادة العلوم",
    teacher: "أ/ سارة أحمد",
    isDeliver: true,
  },
];

export interface SubjectGradeItem {
  id: number;
  subject: string;
  teacher: string;
  score: number;
  maxScore: number;
}

export const studentGradesFirstTerm: SubjectGradeItem[] = [
  {
    id: 1,
    subject: "اللغة العربية",
    teacher: "أ. هاني كمال",
    score: 48,
    maxScore: 50,
  },
  {
    id: 2,
    subject: "اللغة الإنجليزية",
    teacher: "أ. رانيا سمير",
    score: 42,
    maxScore: 50,
  },
  {
    id: 3,
    subject: "الرياضيات",
    teacher: "أ. محمود علي",
    score: 36,
    maxScore: 50,
  },
  {
    id: 4,
    subject: "العلوم",
    teacher: "أ. ساره أحمد",
    score: 27,
    maxScore: 50,
  },
  {
    id: 5,
    subject: "الدراسات الاجتماعية",
    teacher: "أ. ليلى منصور",
    score: 46,
    maxScore: 50,
  },
  {
    id: 6,
    subject: "التربية الدينية",
    teacher: "أ. عماد فتحي",
    score: 49,
    maxScore: 50,
  },
  {
    id: 7,
    subject: "الحاسب الآلي",
    teacher: "أ. نادية رشاد",
    score: 22,
    maxScore: 50,
  },
  {
    id: 8,
    subject: "التربية الفنية",
    teacher: "أ. مي جلال",
    score: 39,
    maxScore: 50,
  },
];

export const studentGradesSecondTerm: SubjectGradeItem[] = [
  {
    id: 1,
    subject: "اللغة العربية",
    teacher: "أ. هاني كمال",
    score: 74,
    maxScore: 80,
  },
  {
    id: 2,
    subject: "اللغة الإنجليزية",
    teacher: "أ. رانيا سمير",
    score: 52,
    maxScore: 60,
  },
  {
    id: 3,
    subject: "الرياضيات",
    teacher: "أ. محمود علي",
    score: 58,
    maxScore: 60,
  },
  {
    id: 4,
    subject: "العلوم",
    teacher: "أ. ساره أحمد",
    score: 31,
    maxScore: 40,
  },
  {
    id: 5,
    subject: "الدراسات الاجتماعية",
    teacher: "أ. ليلى منصور",
    score: 38,
    maxScore: 40,
  },
  {
    id: 6,
    subject: "التربية الدينية",
    teacher: "أ. عماد فتحي",
    score: 40,
    maxScore: 40,
  },
  {
    id: 7,
    subject: "الحاسب الآلي",
    teacher: "أ. نادية رشاد",
    score: 18,
    maxScore: 20,
  },
  {
    id: 8,
    subject: "التربية الفنية",
    teacher: "أ. مي جلال",
    score: 15,
    maxScore: 20,
  },
];

type GradeInput = {
  score?: number;
  maxScore?: number;
  grading?: string;
};

export const getGradeInfo = (options: GradeInput | string) => {
  const grading = typeof options === "string" ? options : options.grading;
  const score = typeof options === "object" ? options.score : undefined;
  const maxScore = typeof options === "object" ? (options.maxScore ?? 50) : 50;

  const percentage = score !== undefined ? (score / maxScore) * 100 : -1;
  if (percentage >= 85 || grading === "ممتاز") {
    return {
      label: "ممتاز",
      colorClass: "text-emerald-600 bg-emerald-50 border-emerald-200",
      bgColor: "bg-emerald-500",
      textColor: "text-emerald-500",
    };
  }
  if (percentage >= 75 || grading === "جيد جداً") {
    return {
      label: "جيد جداً",
      colorClass: "text-blue-600 bg-blue-50 border-blue-200",
      bgColor: "bg-blue-500",
      textColor: "text-blue-500",
    };
  }
  if (percentage >= 65 || grading === "جيد") {
    return {
      label: "جيد",
      colorClass: "text-amber-600 bg-amber-50 border-amber-200",
      bgColor: "bg-amber-500",
      textColor: "text-amber-500",
    };
  }
  if (percentage >= 50 || grading === "مقبول") {
    return {
      label: "مقبول",
      colorClass: "text-orange-600 bg-orange-50 border-orange-200",
      bgColor: "bg-orange-500",
      textColor: "text-orange-500",
    };
  }
  return {
    label: "راسب",
    colorClass: "text-rose-600 bg-rose-50 border-rose-200",
    bgColor: "bg-rose-500",
    textColor: "text-rose-500",
  };
};

export interface TeacherReviewItem {
  id: number;
  subject: string;
  date: string;
  teacher: string;
  rate: string;
  review: string;
  score: number;
  maxScore: number;
}

export const teacherReviews: TeacherReviewItem[] = [
  {
    id: 1,
    subject: "الرياضيات",
    date: "٢٠٢٤/١٠/١٢",
    teacher: "محمود علي",
    rate: "ممتاز",
    score: 49,
    maxScore: 50,
    review:
      "عمر طالب مجتهد جداً ويشارك بفعالية في الحصة. مستواه في الجبر خلال الشهر الحالي ملحوظ، ويُظهر شغفاً كبيراً بالتجارب العلمية. أنصحه بالاستمرار على هذا النهج.",
  },
  {
    id: 2,
    subject: "العلوم",
    date: "٢٠٢٤/١٠/٠٩",
    teacher: "سارة أحمد",
    rate: "جيد جداً",
    score: 42,
    maxScore: 50,
    review:
      "سلوك عمر داخل المعمل ممتاز، يلتزم بجميع قواعد الأمان ويجري التجارب باحترافية. يحتاج فقط للتركيز أكثر في كتابة التقارير حيث تكون أحياناً غير مكتملة.",
  },
  {
    id: 3,
    subject: "اللغة العربية",
    date: "٢٠٢٤/١٠/٠٦",
    teacher: "هاني كمال",
    rate: "ممتاز",
    score: 49,
    maxScore: 50,
    review:
      "يمتلك عمر حصيلة لغوية ممتازة وأسلوب تعبير راقِ في الكتابة. يشارك بشكل إيجابي في مناقشات القصص والنصوص، أتمنى له مزيداً من التميز.",
  },
  {
    id: 4,
    subject: "اللغة الإنجليزية",
    date: "٢٠٢٤/١٠/٠٣",
    teacher: "رانيا سمير",
    rate: "جيد جداً",
    score: 42,
    maxScore: 50,
    review:
      "Omar has a good command of English vocabulary and participates actively in class discussions. His writing skills are developing well. I encourage him to practice speaking more confidently.",
  },
  {
    id: 5,
    subject: "الدراسات الاجتماعية",
    date: "٢٠٢٤/٠٩/٢٨",
    teacher: "ليلى منصور",
    rate: "جيد",
    score: 36,
    maxScore: 50,
    review:
      "عمر طالب منتبه في الحصة ومستواه الدراسي جيد. أنصحه بمراجعة الخرائط الجغرافية بشكل منتظم وتدوين ملاحظات أكثر تفصيلاً خلال الشرح.",
  },
  {
    id: 6,
    subject: "التربية الدينية",
    date: "٢٠٢٤/٠٩/٢٢",
    teacher: "عماد فتحي",
    rate: "ممتاز",
    score: 49,
    maxScore: 50,
    review:
      "طالب متميز من الناحية الأخلاقية والدراسية، يحفظ بشكل ممتاز ويجيب على الأسئلة بدقة. يُعد قدوة لزملائه في الالتزام والمسؤولية.",
  },
];

export const getInitials = (name: string) => {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  const firstName = parts[0]?.[0] || "";
  const secondName = parts[1]?.[0] || "";

  return `${firstName}.${secondName}`;
};

export interface TeachersReviewsItem {
  id: number;
  subject: string;
  teacher: string;
  date: string;
  description: string;
  score: number;
  maxScore: number;
}

export const teachersReviews: TeachersReviewsItem[] = [
  {
    id: 1,
    subject: "الرياضيات",
    teacher: "محمود علي",
    date: "12/10/2024",
    description:
      "عمر طالب مجتهد جداً ويشارك بفعالية في الحصة. مستواه في الجبر خلال الشهر الحالي ملحوظ، وتظهر شغفاً كبيراً بالتجارب العلمية. أنصحه بالاستمرار على هذا النهج.",
    score: 45,
    maxScore: 50,
  },
  {
    id: 2,
    subject: "العلوم",
    teacher: "سارة أحمد",
    date: "09/10/2024",
    description:
      "سلوك عمر داخل المعمل ممتاز، يلتزم بجميع قواعد الأمان ويجري التجارب باحترافية. يحتاج فقط للتركيز أكثر في كتابة التقارير حيث تكون أحياناً غير مكتملة.",
    score: 40,
    maxScore: 50,
  },
  {
    id: 3,
    subject: "اللغة العربية",
    teacher: "هاني كمال",
    date: "06/10/2024",
    description:
      "يمتلك عمر حصيلة لغوية ممتازة وأسلوب تعبير راقٍ في الكتابة. يشارك بشكل إيجابي في مناقشات القصص والنصوص، أتمنى له مزيداً من التميز.",
    score: 48,
    maxScore: 50,
  },
  {
    id: 4,
    subject: "اللغة الإنجليزية",
    teacher: "رانيا سمير",
    date: "03/10/2024",
    description:
      "Omar has a good command of English vocabulary and participates actively in class discussions. His writing skills are developing well. I encourage him to practice speaking more confidently.",
    score: 42,
    maxScore: 50,
  },
  {
    id: 5,
    subject: "الدراسات الاجتماعية",
    teacher: "ليلى منصور",
    date: "28/09/2024",
    description:
      "عمر طالب منتبه في الحصة ومستواه الدراسي جيد. أنصحه بمراجعة الخرائط الجغرافية بشكل منتظم وتدوين ملاحظات أكثر تفصيلاً خلال الشرح.",
    score: 35,
    maxScore: 50,
  },
  {
    id: 6,
    subject: "التربية الدينية",
    teacher: "عماد فتحي",
    date: "22/09/2024",
    description:
      "طالب متميز من الناحية الأخلاقية والدراسية، يحفظ بشكل ممتاز ويجيب على الأسئلة بدقة. يُعد قدوة لزملائه في الالتزام والمسؤولية.",
    score: 49,
    maxScore: 50,
  },
];

// ################################################## //

interface TSDataState {
  token: string;
  systemRole: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userData: any;

  setToken: (newValue: string) => void;
  setSystemRole: (newValue: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setUserData: (newValue: any) => void;

  logout: () => void;
}

export const useTsData = create<TSDataState>()(
  persist(
    (set) => ({
      token: "",
      systemRole: "",
      userData: null,

      setToken: (newValue) => set({ token: newValue }),
      setSystemRole: (newValue) => set({ systemRole: newValue }),
      setUserData: (newValue) => set({ userData: newValue }),

      logout: () => set({ token: "", systemRole: "", userData: null }),
    }),
    {
      name: "ts-data",
    },
  ),
);

interface LoaderState {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  startLoadingNavigation: (
    asyncTask: () => Promise<unknown> | void,
    delay?: number,
    timeoutDuration?: number,
  ) => Promise<void>;
}

export const useLoader = create<LoaderState>()((set) => ({
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),

  startLoadingNavigation: async (
    asyncTask,
    delay = 1500,
    timeoutDuration = 10000,
  ) => {
    set({ isLoading: true });

    const minDelayPromise = new Promise((resolve) =>
      setTimeout(resolve, delay),
    );

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("TIMEOUT_ERROR")), timeoutDuration),
    );

    try {
      const taskWithTimeout = Promise.race([
        Promise.resolve().then(() => asyncTask()),
        timeoutPromise,
      ]);

      await taskWithTimeout;
      await minDelayPromise;
    } catch (error) {
      console.error("Navigation/Data fetching error:", error);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err = error as any;

      if (err?.message === "TIMEOUT_ERROR") {
        toast.error("عذراً، الخادم لا يستجيب حالياً. يرجى المحاولة لاحقاً", {
          duration: 4000,
          position: "top-center",
        });
      } else if (
        err?.response?.status === 400 ||
        err?.response?.status === 401
      ) {
        toast.error(
          "بيانات الدخول غير صحيحة، يرجى التأكد من البريد وكلمة المرور",
          {
            duration: 4000,
            position: "top-center",
          },
        );
      } else if (err?.response?.status === 404) {
        toast.error("رابط الخدمة غير موجود، يرجى التأكد من الـ Domain", {
          duration: 4000,
          position: "top-center",
        });
      } else {
        toast.error("حدث خطأ أثناء الاتصال بالخادم، يرجى إعادة المحاولة", {
          duration: 4000,
          position: "top-center",
        });
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));

interface modalState {
  showModal: boolean;
  setModal: (newValue: boolean) => void;
}

export const useAudienceModal = create<modalState>((set) => ({
  showModal: false,
  setModal: (newValue) => set({ showModal: newValue }),
}));

export const subjectColors: Record<string, { bg: string; text: string }> = {
  "اللغة العربية": { bg: "bg-emerald-50", text: "text-emerald-600" },
  الرياضيات: { bg: "bg-blue-50", text: "text-blue-600" },
  العلوم: { bg: "bg-amber-50", text: "text-amber-600" },
  "الدراسات الاجتماعية": { bg: "bg-rose-50", text: "text-rose-600" },
  "اللغة الإنجليزية": { bg: "bg-purple-50", text: "text-purple-600" },
  "التربية الدينية": { bg: "bg-teal-50", text: "text-teal-600" },
  "التربية الفنية": { bg: "bg-orange-50", text: "text-orange-600" },
  "التربية الرياضية": { bg: "bg-lime-50", text: "text-lime-600" },
  "الحاسب الآلي": { bg: "bg-sky-50", text: "text-sky-600" },
  "غير محدد": { bg: "bg-slate-50", text: "text-slate-400" },
  فسحه: { bg: "bg-slate-100", text: "text-slate-400" },
};

export const days = ["الاحد", "الاتنين", "الثلاثاء", "الاربعاء", "الخميس"];

interface HelpersState {
  toArabicDigits: (value: string | number) => string;
  wordsToArabicDigits: (value: string) => string;
  monthNumberToName: (month: string | number) => string;
  convertAll: (value: string | number) => string;
}

const wordsMap: Record<string, string> = {
  first: "١",
  second: "٢",
  third: "٣",
  fourth: "٤",
  fifth: "٥",
  sixth: "٦",
  seventh: "٧",
};

const monthsMap: Record<string, string> = {
  "1": "يناير",
  "01": "يناير",
  "2": "فبراير",
  "02": "فبراير",
  "3": "مارس",
  "03": "مارس",
  "4": "أبريل",
  "04": "أبريل",
  "5": "مايو",
  "05": "مايو",
  "6": "يونيو",
  "06": "يونيو",
  "7": "يوليو",
  "07": "يوليو",
  "8": "أغسطس",
  "08": "أغسطس",
  "9": "سبتمبر",
  "09": "سبتمبر",
  "10": "أكتوبر",
  "11": "نوفمبر",
  "12": "ديسمبر",
};

const digitsMap = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

export const useTextHelpers = create<HelpersState>(() => ({
  toArabicDigits: (value) => {
    const str = String(value).trim();

    let targetValue = str;

    if (str.includes("-") || str.includes("/")) {
      const parts = str.split(/[-/]/);
      if (parts.length >= 3) {
        targetValue = parts[2];
      }
    }

    if (!isNaN(Number(targetValue))) {
      targetValue = String(Number(targetValue));
    }

    return targetValue.replace(/[0-9]/g, (d) => digitsMap[Number(d)]);
  },

  wordsToArabicDigits: (value) => {
    return String(value).replace(
      /\b(first|second|third|fourth|fifth|sixth|seventh)\b/gi,
      (matched) => wordsMap[matched.toLowerCase()] || matched,
    );
  },

  monthNumberToName: (monthOrDate) => {
    const str = String(monthOrDate).trim();

    const isFullDate = /^\d{2,4}[-/]\d{1,2}[-/]\d{2,4}$/.test(str);

    if (isFullDate) {
      return str
        .replace(/-/g, "/")
        .replace(/[0-9]/g, (d) => digitsMap[Number(d)]);
    }

    let monthKey = str;
    if (str.includes("-")) {
      const parts = str.split("-");
      if (parts.length >= 2) {
        monthKey = parts[1];
      }
    } else if (str.includes("/")) {
      const parts = str.split("/");
      if (parts.length >= 2) {
        monthKey = parts[1];
      }
    }

    return monthsMap[monthKey] || monthsMap[str] || str;
  },

  convertAll: (value) => {
    const text = String(value).trim();

    if (monthsMap[text]) {
      return monthsMap[text];
    }

    const convertedWords = text.replace(
      /\b(first|second|third|fourth|fifth|sixth|seventh)\b/gi,
      (matched) => wordsMap[matched.toLowerCase()] || matched,
    );

    return convertedWords.replace(/[0-9]/g, (d) => digitsMap[Number(d)]);
  },
}));

interface PeriodItem {
  period: string;
  time: string;
  subject: string;
  rawPeriod: number;
}

export interface DaySchedule {
  day: string;
  periods: PeriodItem[];
}

interface scheduleState {
  schedule: DaySchedule[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSchedule: (rawSchedules: any[]) => void;
}

export const useSchedule = create<scheduleState>()((set) => ({
  schedule: [],

  setSchedule: (rawSchedules) => {
    if (!Array.isArray(rawSchedules)) {
      set({ schedule: [] });
      return;
    }
    const { wordsToArabicDigits, toArabicDigits } = useTextHelpers.getState();

    const grouped = rawSchedules.reduce(
      (acc: Record<string, PeriodItem[]>, item) => {
        const day = item?.day;
        if (!day) return acc;

        if (!acc[day]) {
          acc[day] = [];
        }

        acc[day].push({
          period: wordsToArabicDigits(item.period || ""),
          time: toArabicDigits(item.time?.slice(0, 5) || ""),
          subject: item.ts_subject?.name || "غير محدد",
          rawPeriod: Number(item.period) || 0,
        });

        return acc;
      },
      {},
    );

    const formattedSchedule: DaySchedule[] = Object.keys(grouped).map(
      (day) => ({
        day: day,
        periods: grouped[day].sort(
          (a, b) => (a.rawPeriod ?? 0) - (b.rawPeriod ?? 0),
        ),
      }),
    );

    set({ schedule: formattedSchedule });
  },
}));

export interface FormattedHomework {
  id: number;
  documentId: string;
  title: string;
  description: string;
  dueDate: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attachments: any;
  subject: string;
  teacher: string;
}

interface StudentHomeworkState {
  studentHomework: FormattedHomework[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setStudentHomework: (Assignments: any[]) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateHomeworkAttachment: (
    homeworkId: number | string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    newAttachments: any,
  ) => void;
}

export const useStudentHomework = create<StudentHomeworkState>((set) => ({
  studentHomework: [],

  setStudentHomework: (Assignments) => {
    const formattedData: FormattedHomework[] = (Assignments || []).map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (item: any) => ({
        id: item.id,
        documentId: item.documentId,
        title: item.title,
        description: item.description,
        dueDate: item.dueDate,
        attachments: item.ts_submissions,
        subject: item.ts_subject?.name,
        teacher: item.ts_teacher?.fullName.split(" ").slice(0, 2).join(" "),
      }),
    );

    set({ studentHomework: formattedData });
  },

  updateHomeworkAttachment: (homeworkId, newAttachments) => {
    set((state) => ({
      studentHomework: state.studentHomework.map((hw) =>
        hw.id === homeworkId ? { ...hw, attachments: newAttachments } : hw,
      ),
    }));
  },
}));

export interface FormattedGrades {
  id: number;
  documentId: string;
  subject: string;
  teacher: string;
  final_score: number;
  midterm_score: number;
  perform_score: number;
  total_score: number;
  term: string;
  final_total_score: number;
  midterm_total_score: number;
  perform_total_score: number;
  studentName: string;
}

interface StudentGradesState {
  studentGrades: FormattedGrades[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setStudentGrades: (Grades: any[]) => void;
}

export const useStudentGrades = create<StudentGradesState>((set) => ({
  studentGrades: [],

  setStudentGrades: (Grades) => {
    const formattedData: FormattedGrades[] = (Grades || []).map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (item: any) => ({
        id: item.id,
        documentId: item.documentId,
        term: item.term,
        total_score: item.total_score,
        subject: item.ts_subject?.name,
        teacher: item.ts_teachers?.[0]?.fullName
          ? item.ts_subject.ts_teachers[0].fullName
              .split(" ")
              .slice(0, 2)
              .join(" ")
          : "غير محدد",
        final_score: item.final_score,
        midterm_score: item.midterm_score,
        perform_score: item.perform_score,
        final_total_score: item.total_score == 50 ? 25 : 40,
        midterm_total_score: item.total_score == 50 ? 15 : 20,
        perform_total_score: 10,
        studentName: item.ts_student?.fullName,
      }),
    );

    set({ studentGrades: formattedData });
  },
}));

export interface FormattedReviews {
  id: number;
  documentId: string;
  subject: string;
  teacher: string;
  description: string;
  teacherGrading: string;
  createdDate: string;
}

interface StudentReviewsState {
  studentReviews: FormattedReviews[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setStudentReviews: (Reviews: any[]) => void;
}

export const useStudentReviews = create<StudentReviewsState>((set) => ({
  studentReviews: [],

  setStudentReviews: (Reviews) => {
    const formattedData: FormattedReviews[] = (Reviews || []).map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (item: any) => ({
        id: item.id,
        documentId: item.documentId,
        description: item.description,
        teacherGrading: item.teacher_grading,
        subject: item.ts_teacher?.ts_subject.name,
        teacher: item.ts_teacher?.fullName.split(" ").slice(0, 2).join(" "),
        createdDate: item.createdAt.split("T")[0].slice(0, 10),
      }),
    );

    set({ studentReviews: formattedData });
  },
}));

export interface FormattedTeacherClasses {
  id: number;
  documentId: string;
  name: string;
  stage: string;
  studentGroup: [];
  studentCount: number;
}

interface TeacherClassesState {
  TeacherClasses: FormattedTeacherClasses[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setTeacherClasses: (Classes: any[]) => void;
}

export const useTeacherClasses = create<TeacherClassesState>((set) => ({
  TeacherClasses: [],

  setTeacherClasses: (Classes) => {
    const formattedData: FormattedTeacherClasses[] = (Classes || []).map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (item: any) => ({
        id: item.id,
        documentId: item.documentId,
        name: item.name,
        stage: item.ts_stage?.name,
        studentCount: item.ts_students?.length,
        studentGroup: item.ts_students,
      }),
    );

    set({ TeacherClasses: formattedData });
  },
}));
