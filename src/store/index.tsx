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
