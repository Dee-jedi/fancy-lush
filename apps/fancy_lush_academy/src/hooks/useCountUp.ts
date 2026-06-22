"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring, useTransform, animate } from "framer-motion";

export function useCountUp(to: number, duration: number = 2) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  
  useEffect(() => {
    const controls = animate(count, to, { duration: duration, ease: "easeOut" });
    return controls.stop;
  }, [count, to, duration]);

  return rounded;
}
