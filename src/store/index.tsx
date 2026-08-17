import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

export const domain = "https://pos.skyready.online/";

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

export const toArabicDigits = (value: string | number): string => {
  const map = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return String(value).replace(/[0-9]/g, (d) => map[Number(d)]);
};

export const days = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"];
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

export interface DaySchedule {
  day: string;
  slots: ScheduleSlot[];
}

export const schedule: DaySchedule[] = [
  {
    day: "الأحد",
    slots: [
      {
        period: "الحصة ١",
        className: "فصل ١/١",
        room: "قاعة ١٢",
      },
      {
        period: "الحصة ٢",
        className: "فصل ١/٢",
        room: "قاعة ١٤",
      },
      {
        period: "الحصة ٤",
        className: "فصل ٢/١",
        room: "قاعة ٢١",
      },
    ],
  },
  {
    day: "الإثنين",
    slots: [
      {
        period: "الحصة ١",
        className: "فصل ١/٣",
        room: "قاعة ١٦",
      },
      {
        period: "الحصة ٣",
        className: "فصل ١/١",
        room: "قاعة ١٢",
      },
      {
        period: "الحصة ٥",
        className: "فصل ١/٢",
        room: "قاعة ١٤",
      },
    ],
  },
  {
    day: "الثلاثاء",
    slots: [
      {
        period: "الحصة ٢",
        className: "فصل ٢/١",
        room: "قاعة ٢١",
      },
      {
        period: "الحصة ٤",
        className: "فصل ١/٣",
        room: "قاعة ١٦",
      },
    ],
  },
  {
    day: "الأربعاء",
    slots: [
      {
        period: "الحصة ١",
        className: "فصل ١/٢",
        room: "قاعة ١٤",
      },
      {
        period: "الحصة ٣",
        className: "فصل ١/١",
        room: "قاعة ١٢",
      },
      {
        period: "الحصة ٥",
        className: "فصل ٢/١",
        room: "قاعة ٢١",
      },
    ],
  },
  {
    day: "الخميس",
    slots: [
      {
        period: "الحصة ٢",
        className: "فصل ١/١",
        room: "قاعة ١٢",
      },
      {
        period: "الحصة ٤",
        className: "فصل ١/٣",
        room: "قاعة ١٦",
      },
    ],
  },
];

export const studentPeriodTimes = [
  { period: "الحصة ١", time: "٧:٣٠" },
  { period: "الحصة ٢", time: "٨:٣٠" },
  { period: "الحصة ٣", time: "٩:٣٠" },
  { period: "الحصة ٤", time: "١٠:٣٠" },
  { period: "الحصة ٥", time: "١١:٣٠" },
  { period: "الحصة ٦", time: "١٢:٣٠" },
  { period: "الحصة ٧", time: "٠١:٣٠" },
];

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
  score: number;
  maxScore: number;
}

export const studentGradesFirstTerm: SubjectGradeItem[] = [
  {
    id: 1,
    subject: "اللغة العربية",
    score: 48,
    maxScore: 50,
  },
  {
    id: 2,
    subject: "اللغة الإنجليزية",
    score: 42,
    maxScore: 50,
  },
  {
    id: 3,
    subject: "الرياضيات",
    score: 36,
    maxScore: 50,
  },
  {
    id: 4,
    subject: "العلوم",
    score: 27,
    maxScore: 50,
  },
  {
    id: 5,
    subject: "الدراسات الاجتماعية",
    score: 46,
    maxScore: 50,
  },
  {
    id: 6,
    subject: "التربية الدينية",
    score: 49,
    maxScore: 50,
  },
  {
    id: 7,
    subject: "الحاسب الآلي",
    score: 22,
    maxScore: 50,
  },
  {
    id: 8,
    subject: "التربية الفنية",
    score: 39,
    maxScore: 50,
  },
];

export const studentGradesSecondTerm: SubjectGradeItem[] = [
  {
    id: 1,
    subject: "اللغة العربية",
    score: 74,
    maxScore: 80,
  },
  {
    id: 2,
    subject: "اللغة الإنجليزية",
    score: 52,
    maxScore: 60,
  },
  {
    id: 3,
    subject: "الرياضيات",
    score: 58,
    maxScore: 60,
  },
  {
    id: 4,
    subject: "العلوم",
    score: 31,
    maxScore: 40,
  },
  {
    id: 5,
    subject: "الدراسات الاجتماعية",
    score: 38,
    maxScore: 40,
  },
  {
    id: 6,
    subject: "التربية الدينية",
    score: 40,
    maxScore: 40,
  },
  {
    id: 7,
    subject: "الحاسب الآلي",
    score: 18,
    maxScore: 20,
  },
  {
    id: 8,
    subject: "التربية الفنية",
    score: 15,
    maxScore: 20,
  },
];

export const getGradeInfo = (score: number, maxScore: number = 50) => {
  const percentage = (score / maxScore) * 100;

  if (percentage >= 85) {
    return {
      label: "ممتاز",
      colorClass: "text-emerald-600 bg-emerald-50 border-emerald-200",
    };
  }
  if (percentage >= 75) {
    return {
      label: "جيد جداً",
      colorClass: "text-blue-600 bg-blue-50 border-blue-200",
    };
  }
  if (percentage >= 65) {
    return {
      label: "جيد",
      colorClass: "text-amber-600 bg-amber-50 border-amber-200",
    };
  }
  if (percentage >= 50) {
    return {
      label: "مقبول",
      colorClass: "text-orange-600 bg-orange-50 border-orange-200",
    };
  }
  return {
    label: "راسب",
    colorClass: "text-rose-600 bg-rose-50 border-rose-200",
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
