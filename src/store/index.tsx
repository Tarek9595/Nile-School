import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

export const domain = "https://pos.skyready.onliwne/";

export const useTsData = create(
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

export const useLoader = create((set) => ({
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
      await Promise.race([
        Promise.resolve().then(() => asyncTask()),
        timeoutPromise,
      ]);
      await minDelayPromise;
    } catch (error) {
      if (error?.message === "TIMEOUT_ERROR") {
        toast.error("عذراً، الخادم لا يستجيب حالياً. يرجى المحاولة لاحقاً", {
          duration: 4000,
          position: "top-center",
        });
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));
