"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5, // زوّد الرقم ده لو عاوز التمرير يكون أبطأ (مثلاً 1.8 أو 2.0)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // معادلة تنعيم الحركة
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
